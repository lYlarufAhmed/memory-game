import { describe, it, expect, test } from "vitest";
import { shuffleArray } from "../array.utils";
test('create shuffled array', () => {
    const arr = shuffleArray()
    expect(arr).toBeTypeOf("object")
})