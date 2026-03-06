#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import secrets
from typing import Optional

P = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
A = 0
B = 7
GX = 55066263022277343669578718895168534326250603453777594175500187360389116729240
GY = 32670510020758816978083085130507043184471273380659243275938904335757337482424
G = (GX, GY)

Point = Optional[tuple[int, int]]


def inverse(value: int, modulus: int) -> int:
    value %= modulus
    if value == 0:
        raise ZeroDivisionError("inverse of zero does not exist")
    return pow(value, -1, modulus)


def hash_message(message: str) -> int:
    digest = hashlib.sha256(message.encode("utf-8")).digest()
    return int.from_bytes(digest, "big")


def is_on_curve(point: Point) -> bool:
    if point is None:
        return True
    x, y = point
    return (y * y - (x * x * x + A * x + B)) % P == 0


def point_add(left: Point, right: Point) -> Point:
    if left is None:
        return right
    if right is None:
        return left

    x1, y1 = left
    x2, y2 = right

    if x1 == x2 and (y1 + y2) % P == 0:
        return None

    if left == right:
        slope = (3 * x1 * x1 + A) * inverse(2 * y1, P) % P
    else:
        slope = (y2 - y1) * inverse(x2 - x1, P) % P

    x3 = (slope * slope - x1 - x2) % P
    y3 = (slope * (x1 - x3) - y1) % P
    point = (x3, y3)
    if not is_on_curve(point):
        raise ValueError("point addition produced an invalid point")
    return point


def scalar_mult(scalar: int, point: Point) -> Point:
    if point is None:
        return None

    scalar %= N
    if scalar == 0:
        return None

    result = None
    addend = point

    while scalar:
        if scalar & 1:
            result = point_add(result, addend)
        addend = point_add(addend, addend)
        scalar >>= 1

    return result


def public_key(private_key: int) -> Point:
    if not 1 <= private_key < N:
        raise ValueError("private key out of range")
    return scalar_mult(private_key, G)


def sign(message: str, private_key: int, nonce: int | None = None) -> tuple[int, int]:
    if not 1 <= private_key < N:
        raise ValueError("private key out of range")

    z = hash_message(message)

    while True:
        k = nonce if nonce is not None else secrets.randbelow(N - 1) + 1
        if not 1 <= k < N:
            if nonce is not None:
                raise ValueError("nonce out of range")
            continue

        point = scalar_mult(k, G)
        if point is None:
            if nonce is not None:
                raise ValueError("invalid nonce")
            continue

        r = point[0] % N
        if r == 0:
            if nonce is not None:
                raise ValueError("nonce generated r = 0")
            continue

        s = (inverse(k, N) * (z + r * private_key)) % N
        if s == 0:
            if nonce is not None:
                raise ValueError("nonce generated s = 0")
            continue

        return (r, s)


def verify(message: str, signature: tuple[int, int], pubkey: Point) -> bool:
    if pubkey is None or not is_on_curve(pubkey):
        return False

    r, s = signature
    if not (1 <= r < N and 1 <= s < N):
        return False

    z = hash_message(message)
    w = inverse(s, N)
    u1 = (z * w) % N
    u2 = (r * w) % N
    point = point_add(scalar_mult(u1, G), scalar_mult(u2, pubkey))
    if point is None:
        return False

    return point[0] % N == r


def compressed_pubkey_hex(pubkey: Point) -> str:
    if pubkey is None:
        raise ValueError("missing public key")
    x, y = pubkey
    prefix = "02" if y % 2 == 0 else "03"
    return prefix + f"{x:064x}"
