#!/usr/bin/env python3
from __future__ import annotations

import os
import secrets
import socketserver
from dataclasses import dataclass

from crypto import N, compressed_pubkey_hex, public_key, sign, verify

BANNER = r"""
  ____  _ _            _         _______                                 
 | __ )(_) |_ ___ ___ (_)_ __   |_   _| __ ___  __ _ ___ _   _ _ __ _   _
 |  _ \| | __/ __/ _ \| | '_ \    | || '__/ _ \/ _` / __| | | | '__| | | |
 | |_) | | || (_| (_) | | | | |   | || | |  __/ (_| \__ \ |_| | |  | |_| |
 |____/|_|\__\___\___/|_|_| |_|   |_||_|  \___|\__,_|___/\__,_|_|   \__, |
                                                                     |___/
""".strip("\n")


@dataclass(frozen=True)
class ChallengeState:
    flag: str
    instance_id: str
    reserve_sats: int
    admin_private_key: int
    admin_public_key: tuple[int, int]
    leak_message_1: str
    leak_signature_1: tuple[int, int]
    leak_message_2: str
    leak_signature_2: tuple[int, int]
    target_message: str

    @classmethod
    def build(cls) -> "ChallengeState":
        while True:
            flag = os.getenv("FLAG", "CTF{local_test_flag}")
            instance_id = secrets.token_hex(8)
            reserve_sats = 25_000_000_000 + secrets.randbelow(75_000_000_000)
            admin_private_key = secrets.randbelow(N - 1) + 1
            admin_public_key = public_key(admin_private_key)
            reused_nonce = secrets.randbelow(N - 1) + 1

            leak_message_1 = (
                f"BTC-ROLLUP|epoch={instance_id}|batch=alpha|feerate=17|note=hotfix"
            )
            leak_message_2 = (
                f"BTC-ROLLUP|epoch={instance_id}|batch=beta|feerate=23|note=rebalance"
            )

            leak_signature_1 = sign(leak_message_1, admin_private_key, reused_nonce)
            leak_signature_2 = sign(leak_message_2, admin_private_key, reused_nonce)

            if (
                leak_signature_1[0] == leak_signature_2[0]
                and leak_signature_1[1] != leak_signature_2[1]
            ):
                break

        target_message = f"WITHDRAW|player|{reserve_sats}|{instance_id}"

        return cls(
            flag=flag,
            instance_id=instance_id,
            reserve_sats=reserve_sats,
            admin_private_key=admin_private_key,
            admin_public_key=admin_public_key,
            leak_message_1=leak_message_1,
            leak_signature_1=leak_signature_1,
            leak_message_2=leak_message_2,
            leak_signature_2=leak_signature_2,
            target_message=target_message,
        )


STATE = ChallengeState.build()


def parse_hex_component(raw: str) -> int:
    value = raw.strip().lower()
    if value.startswith("0x"):
        value = value[2:]
    if not value:
        raise ValueError("empty signature component")
    return int(value, 16)


class Handler(socketserver.StreamRequestHandler):
    timeout_seconds = 180

    def write(self, text: str) -> None:
        try:
            self.wfile.write(text.encode("utf-8"))
            self.wfile.flush()
        except (BrokenPipeError, ConnectionResetError, OSError) as exc:
            raise ConnectionError("client disconnected") from exc

    def writeln(self, text: str = "") -> None:
        self.write(f"{text}\n")

    def prompt(self, text: str) -> str:
        self.write(text)
        data = self.rfile.readline(4096)
        if not data:
            raise ConnectionError("client disconnected")
        if len(data) >= 4096 and not data.endswith(b"\n"):
            raise ValueError("input too long")
        return data.decode("utf-8", errors="ignore").strip()

    def print_intro(self) -> None:
        self.writeln(BANNER)
        self.writeln("Broken Bitcoin hot-wallet challenge")
        self.writeln("")
        self.writeln(f"Instance ID  : {STATE.instance_id}")
        self.writeln(f"Reserve      : {STATE.reserve_sats} sats")
        self.writeln(f"Curve        : secp256k1")
        self.writeln(f"Admin pubkey : {compressed_pubkey_hex(STATE.admin_public_key)}")
        self.writeln("")
        self.writeln("The HSM leaked two ECDSA signatures from the same admin key:")
        self.writeln(f"message[1] = {STATE.leak_message_1}")
        self.writeln(f"r[1]       = 0x{STATE.leak_signature_1[0]:064x}")
        self.writeln(f"s[1]       = 0x{STATE.leak_signature_1[1]:064x}")
        self.writeln("")
        self.writeln(f"message[2] = {STATE.leak_message_2}")
        self.writeln(f"r[2]       = 0x{STATE.leak_signature_2[0]:064x}")
        self.writeln(f"s[2]       = 0x{STATE.leak_signature_2[1]:064x}")
        self.writeln("")
        self.writeln("Forge a valid admin signature for this exact authorization:")
        self.writeln(STATE.target_message)
        self.writeln("")
        self.writeln("Submit the signature as hexadecimal values.")
        self.writeln("")

    def handle(self) -> None:
        self.request.settimeout(self.timeout_seconds)
        try:
            self.print_intro()
            r_value = parse_hex_component(self.prompt("r> "))
            s_value = parse_hex_component(self.prompt("s> "))
            self.writeln("")

            if verify(STATE.target_message, (r_value, s_value), STATE.admin_public_key):
                self.writeln("Authorization accepted.")
                self.writeln(f"FLAG: {STATE.flag}")
            else:
                self.writeln("Invalid signature. Treasury locked.")
        except ConnectionError:
            return
        except TimeoutError:
            try:
                self.writeln("\nSession timed out.")
            except ConnectionError:
                return
        except Exception as exc:
            try:
                self.writeln(f"\nError: {exc}")
            except ConnectionError:
                return


class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


def main() -> None:
    port = int(os.getenv("PORT", "5002"))
    with ThreadingTCPServer(("0.0.0.0", port), Handler) as server:
        server.serve_forever()


if __name__ == "__main__":
    main()
