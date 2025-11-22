import { Difficulty, DifficultyConfigMap } from "../types/game.types";

export const DIFFICULTY_CONFIG: DifficultyConfigMap = {
    [Difficulty.Beginner]: { gridDim: [4, 4], flipDelay: 2500 },
    // [Difficulty.Medium]: { gridDim: [6, 4], flipDelay: 2000, pairs: 2 },
    [Difficulty.Intermediate]: { gridDim: [6, 6], flipDelay: 2500 },
    [Difficulty.Hard]: { gridDim: [8, 8], flipDelay: 2000 },
}