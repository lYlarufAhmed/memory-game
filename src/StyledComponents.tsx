import styled from "styled-components";
import mainBgUri from "./images/bgPattern.png";
import bgImageUri from "./images/bg.jpeg";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100vh;
  width: 100vw;
  background: url("${mainBgUri}") no-repeat center/cover;
`

export const GameWrapper = styled.div`
  background: url("${bgImageUri}") no-repeat center/cover;
  width: 20rem;
  height: 20rem;
  border-radius: .4rem;
  box-shadow: 7px 10px 17px 0;
  display: flex;
  flex-wrap: wrap;
  gap: .2rem;
  padding: .5rem .7rem;
  align-content: center;
  align-items: center;
`
export const IconContainer = styled.button<{ $matched?: boolean }>`
  flex: 1 1 23%;
  // fill:red;
  height: 23%;
  padding: .2rem .1rem;
  background: ${props => props.$matched ? 'rgba(96,221,142,1)' : 'yellow'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: .4rem;
`
export const IconCover = styled.div<{ $show?: boolean }>`
  position: absolute;
  background: ${props => !props.$show && '#07302E'};
  height: 100%;
  border-radius: .4rem;
  width: 100%;
  top: 0;
  left: 0;
`

export const DashBoard = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`
export const ResetBtn = styled.button`
  background: rgba(24, 138, 141, 1);
  border: none;
  border-radius: .3rem;
  padding: .4rem .35rem;
  color: white;
`