// interfaces
export interface GameState {
    iconsIndexes: number[];
    moves: number;
    time: number;
    score: number;
    clickedCards: Card[];
    showIndexes: number[];
    lastClicked: number;
    status: GameStatus
}

export interface Card {
    index: number;
    imgIndex: number;
}

export interface DifficultyConfig {
    flipDelay: number;
    gridDim: [number, number]; // e.g. 4*4
}




export interface GameConfig {

    difficulty: Difficulty;
    theme: ThemeName;
}


// Types

export type GameStatus = "idle" | "playing" | "paused" | "completed";


export type ThemeName = 'default' | 'dark' | 'light'

export type DifficultyConfigMap = Record<Difficulty, DifficultyConfig>


// Enums

export enum Difficulty {

    Beginner = 'beginner',
    // Medium = 'medium',
    Intermediate = 'intermediate',
    Hard = 'hard'

}

