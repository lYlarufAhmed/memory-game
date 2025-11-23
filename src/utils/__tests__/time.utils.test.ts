

import { describe, it, expect, test } from "vitest";
import { formattedTime } from "../timing.utils";


test('Format time', () => {
    expect(formattedTime(65)).toBe('1m 5s')
})