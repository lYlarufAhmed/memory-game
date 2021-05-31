import React, {useEffect, useState} from "react";
import styled from 'styled-components'

import Icon from "./icons";

const bgImageUri = window.location.origin + '/images/bg.jpeg'
const mainBgUri = window.location.origin + '/images/bgPattern.png'


const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 1rem;
height: 100vh;
width: 100vw;
background: url("${mainBgUri}") no-repeat center/cover;
`

const GameWrapper = styled.div`
  background: url("${bgImageUri}") no-repeat center/cover;
  width: 20rem;
  height: 20rem;
  border-radius: .4rem;
  box-shadow: 7px 10px 17px 0px ;
  display: flex;
  flex-wrap: wrap;
  gap:.2rem;
  padding: .5rem .7rem;
  align-content: center;
  align-items: center;
`
const IconContainer = styled.div`
flex: 1 1 23%;
// fill:red;
height: 23%;
padding: .2rem .1rem;
background: ${props => props.matched ? 'rgba(96,221,142,1)' : 'yellow'};
display: flex;
align-items: center;
justify-content: center;
position: relative;
  border-radius: .4rem;
`
const IconCover = styled.div`
position: absolute;
background: ${props => !props.show && '#07302E'};
height: 100%;
border-radius: .4rem;
width: 100%;
top:0;
left: 0;
`

const DashBoard = styled.div`
display: flex;
align-items: center;
gap:3rem;
`
const ResetBtn = styled.button`
background: rgba(24,138,141,1);
border: none;
border-radius: .3rem;
padding: .4rem .35rem;
color: white;
`
// const Title = styled.h4`
//
// `

let ICONS = []
for (let i = 1; i < 17; i++) {
    ICONS.push(i > 8 ? i - 8 : i)
}
const shuffleArr = (arr) => arr.sort(() => Math.random() - Math.random())
const formattedTime = (secs) => `${Math.floor(secs / 60)}m ${secs % 60}s`
const checkImages = (clickedImages, index, imgIndex) => clickedImages.filter((obj) => obj.index === index && obj.imgIndex === imgIndex).length === 1
ICONS = shuffleArr(ICONS)
const initialState = {
    'iconsIndexes': ICONS,
    'moves': 0,
    'time': 0,
    'score': 0,
    'gameRunning': true,
    'clickedImages': [],
    'showIndexes': [],
    'lastClicked': NaN
}

function App() {
    let [state, setState] = useState(initialState)
    const clickHandler = (index, imgIndex) => {
        setState(prev => {
            // let indexes = prev.clickedIndex.slice()
            // indexes.push(index)
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

                    // let clickedImages = prev.clickedImages
                    // if (clickedImages[0].imgIndex === clickedImages[1].imgIndex) {
                    //     // prev.score += 1
                    //     prev.showIndexes.push(prev.clickedImages[0].imgIndex)
                    // }
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
                <ResetBtn onClick={() => setState(prev => {
                    prev.clickedImages = []
                    prev.showIndexes = []
                    prev.time = 0
                    prev.score = 0
                    prev.score = 0
                    prev.lastClicked = NaN
                    prev.gameRunning = true
                    return {...prev}
                })}>Restart</ResetBtn>
            </DashBoard>
            {state.gameRunning ? <GameWrapper>
                    {ICONS.map((i, index) => <IconContainer
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
