import styled from "styled-components";

export const MyDeleteRowButton = styled.button`
    width: 100%;
    height: 100%; 
    padding: 0px;
    background-color: rgb(242, 242, 242);
    border: 0px;
    color: black;
    font-size: 20px
`

export const MyAddRowButton = styled.button`
    width: 100%;
    border: solid black 1px;
    font-size: 20px; 
    color: black; 
    background: rgb(242, 242, 242);
    border-top: 0;
    height:${props => (props.height ? `${props.height}`: "40px")}
`

