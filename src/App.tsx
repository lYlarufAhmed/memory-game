import React, {ReactElement, useEffect, useState} from "react";


import Icon from "./icons";
import {
    Wrapper, DashBoard, GameWrapper, ResetBtn, IconContainer, IconCover,
} from "./StyledComopnents";


let ICONS: number[]

const getShuffledArr = () => {
    let arr: number[] = []
    for (let i = 1; i < 17; i++) {
        arr.push(i > 8 ? i - 8 : i)
    }
    arr.sort(() => Math.random() - Math.random())
    return arr
}
type Image = {
    index: number;
    imgIndex: number;
}
type State = {
    iconsIndexes: number[];
    moves: number;
    time: number;
    score: number;
    gameRunning: boolean;
    clickedImages: Image[];
    showIndexes: number[]
    lastClicked: number;
}
const formattedTime = (secs: number) => `${Math.floor(secs / 60)}m ${secs % 60}s`
const checkImages = (clickedImages: Image[], index: number, imgIndex: number) => clickedImages.filter((obj) => obj.index === index && obj.imgIndex === imgIndex).length === 1
ICONS = getShuffledArr()

const initialState: State = {
    iconsIndexes: ICONS,
    moves: 0,
    time: 0,
    score: 0,
    gameRunning: true,
    clickedImages: [],
    showIndexes: [],
    lastClicked: NaN
};


function App(): ReactElement {
    let [state, setState] = useState(initialState)
    const clickHandler = (index: number, imgIndex: number) => {
        setState(prev => {
            if (!checkImages(prev.clickedImages, index, imgIndex)) {
                if (prev.clickedImages.length > 1) {
                    prev.clickedImages = []
                    prev.lastClicked = NaN
                }
                prev.clickedImages.push({index, imgIndex})
                if (prev.clickedImages.length === 2) {
                    prev.moves += 1
                    let clickedImages = prev.clickedImages
                    if (clickedImages[0].imgIndex === clickedImages[1].imgIndex) {
                        prev.score += 1
                        prev.showIndexes.push(prev.clickedImages[0].imgIndex)
                        if (prev.showIndexes.length === 8) prev.gameRunning = false
                    }
                    prev.lastClicked = new Date().getTime()
                }
            }
            // return JSON.parse(JSON.stringify(prev))
            return {...prev}
        })
    }

    useEffect(() => {
        const timerHandler = setInterval(() => {
            if (state.showIndexes.length === 8 || !state.gameRunning) {
                clearInterval(timerHandler)
                setState(prev => {
                    prev.gameRunning = false
                    return {...prev}
                })
            } else setState(prev => {
                prev.time += 1
                let currTime = new Date().getTime()
                let clickDiff = prev.lastClicked > 0 ? currTime - prev.lastClicked : NaN
                console.log('click diff', clickDiff)
                if ((clickDiff > 2500) && (prev.clickedImages.length === 2)) {
                    prev.clickedImages = []
                    prev.lastClicked = NaN
                }
                return {...prev}
            })
        }, 1000)
        return () => clearInterval(timerHandler)
    }, [state.time, state.showIndexes.length, state.gameRunning])
    return (
        <Wrapper>
            <h4>Memory Game</h4>
            <DashBoard>
                <span>Time: {formattedTime(state.time)}</span>
                <span>{state.moves} moves</span>
                <span>Score: {state.score}</span>
                <ResetBtn onClick={() => setState({...initialState})}>Restart</ResetBtn>
            </DashBoard>
            {state.gameRunning ? <GameWrapper>
                    {ICONS.map((i: number, index: number) => <IconContainer
                        matched={state.showIndexes.includes(i)}
                        key={index}
                        onClick={() => clickHandler(index, i)}
                    ><Icon
                        svgNo={i}/><IconCover
                        show={checkImages(state.clickedImages, index, i) || state.showIndexes.includes(i)}/></IconContainer>)}
                </GameWrapper> :
                <b>Congratulations! You won in {state.moves} moves! You took {formattedTime(state.time)}!</b>}
        </Wrapper>
    );
}

export default App;
