import styled from "styled-components";

export const MainContainer = styled.div`
    width: ${props => (props.width ? `${props.width}` : "100%")};
    height: ${props => (props.height ? `${props.height}` : "100%")};
    background-color: white;
    border: solid white;
    display: grid;
    grid-template-columns: repeat(${props => (props.gridcols ? `${props.gridcols}` : "10")}, 1fr);
    grid-template-rows: repeat(${props => (props.gridrows ? `${props.gridrows}` : "10")}, minmax(30px, auto));
`


