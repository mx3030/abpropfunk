import styled from "styled-components";

const propExists = (prop) => prop !== undefined && prop !== null;

export const EVButton = styled.button`
    border: solid black 1px;
    border-radius: 0;
    background-color: #f2f2f2;
    color: black;
    padding: 10px;
`
export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: ${props => (props.width ? `${props.width}` : "100%")};
    gap: ${props => (props.gap ? `${props.gap}` : "20px")};
`

export const VerticalSpace = styled.div`
    height: ${props => (props.size ? `${props.size}` : "20px")}; 
`;

