import styled from "styled-components";

const colorMapper = {
    "blue": [0, 102, 204],
    "black": [0,0,0],
}

export const AppletContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    border: solid black;
    width: ${props => (props.width ? (Number(props.width)+10)+'px' : null)};
    height: ${props => (props.height ? (Number(props.height)+10)+'px' : null)};
    align-items: center;
`

export const GGBButton = styled.button`
    border: solid black 1px;
    border-radius: 0;
    background-color: white;
    color: black;
`

export const ggbConstructionStyle={
    point: {
        color: colorMapper['black'],
        size: 5,
    }
}


