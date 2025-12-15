import { useEffect, useState } from "react";
import { GameState, GameStatus } from "../types/game.types";
import { shuffleArray } from "../utils/array.utils";

const initialState: GameState = {
    iconsIndexes: shuffleArray(),
    moves: 0, // for each pair of card flip move is increased by 1
    time: 0,
    score: 0,
    flippedCardIds: [], // pair of images that are flipped at a time
    matchedCardIds: [], // matched cards so far
    lastClicked: NaN,
    status: "idle",
};

export const useGame = () => {
    const [state, setState] = useState(initialState)
    const toggleGameRunning = () =>
        setState((prev: GameState) =>
            prev.status === "completed"
                ? { ...initialState, status: "playing", iconsIndexes: shuffleArray() }
                : {
                    ...prev,
                    status: prev.status === "playing" ? "paused" : "playing",
                }
        );
    const clickHandler = (index: number, imgIndex: number) => {
        setState((prev) => {
            if (prev.status !== "playing") return { ...prev };
            let clickedImages =
                prev.flippedCardIds.length > 1
                    ? [{ index, imgIndex }]
                    : [...prev.flippedCardIds, { index, imgIndex }]; // when there is a pair reset clicked cards

            let lastClicked = prev.flippedCardIds.length > 1 ? NaN : prev.lastClicked;
            let status: GameStatus = prev.status;
            let moves = prev.moves;
            let score = prev.score;
            let showIndexes = prev.matchedCardIds;

            if (clickedImages.length === 2) {
                moves += 1;
                if (clickedImages[0].imgIndex === clickedImages[1].imgIndex) {
                    score += 1;
                    showIndexes = [...prev.matchedCardIds, clickedImages[0].imgIndex];
                    if (showIndexes.length === 8) {
                        status = "completed";
                    }
                }
                lastClicked = new Date().getTime();
            }

            return {
                ...prev,
                flippedCardIds: clickedImages,
                lastClicked, // to flip the images after a certain time
                moves,
                score,
                matchedCardIds: showIndexes,
                status,
            };
        });
    };
    const handlRestart = () => setState({ ...initialState, iconsIndexes: shuffleArray(), status: 'playing' })
    useEffect(() => {
        const timerHandler = setInterval(() => {
            if (state.matchedCardIds.length === 8 || state.status === "completed") {
                clearInterval(timerHandler);
                setState((prev) => ({
                    ...prev,
                    status: "completed",
                }));
            } else
                setState((prev) => {
                    let currTime = new Date().getTime();
                    let clickDiff =
                        prev.lastClicked > 0 ? currTime - prev.lastClicked : NaN;
                    //   console.log("click diff", clickDiff);

                    let clickedImages = prev.flippedCardIds;
                    let lastClicked = prev.lastClicked;

                    // after 2.5 sec flip the open images automatically.
                    if (clickDiff > 2500 && prev.flippedCardIds.length === 2) {
                        clickedImages = [];
                        lastClicked = NaN;
                    }

                    return {
                        ...prev,
                        time: prev.status === "playing" ? prev.time + 1 : prev.time,
                        flippedCardIds: clickedImages,
                        lastClicked,
                    };
                });
        }, 1000);
        return () => clearInterval(timerHandler);
    }, [
        state.time,
        state.matchedCardIds.length,
        state.status,
    ]);


    return {
        //state
        // ...state
        time: state.time,
        cards: state.iconsIndexes,
        matchedCards: state.matchedCardIds,
        flippedCards: state.flippedCardIds,
        moves: state.moves,
        score: state.score,
        gameStatus: state.status,





        // actions
        handleCardClick: clickHandler,
        toggleGameRunning,
        handlRestart

    }

}