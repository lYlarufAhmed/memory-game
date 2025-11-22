export interface GameState {
    iconsIndexes: number[];
    moves: number;
    time: number;
    score: number;
    clickedImages: Card[];
    showIndexes: number[];
    lastClicked: number;
    status: GameStatus
}

export interface Card {
    index: number;
    imgIndex: number;
}


export type GameStatus = "idle" | "playing" | "paused" | "completed";


export interface Difficulty {

}


export interface GameConfig {

}