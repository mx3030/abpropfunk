import styled from "styled-components";

export const TimerButton = styled.button`
    border: solid black 1px;
    border-right: ${props => (props.endpart ? null : "0")};
    border-radius: 0;
    background-color: rgb(242, 242, 242);
    color: black;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 20px;
    margin: 0
`
export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export const VerticalSpace = styled.div` 
    height: ${props => (props.size ? `${props.size}` : "20px")};
`
