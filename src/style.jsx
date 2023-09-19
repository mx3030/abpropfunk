import styled from "styled-components";
import { Link } from 'react-router-dom'

const propExists = (prop) => prop !== undefined && prop !== null;

// MEDIA QUERIES
const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}

export const device = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  "2xl": `(min-width: ${breakpoints["2xl"]})`,
}


// UNIVERSAL
const vertDefaultSize = "20px"
export const VerticalSpace = styled.div` 
    height: ${props => (props.size ? `${props.size}` : vertDefaultSize)};
    ${(props) => propExists(props.query) && `
        @media ${device.xs} { height: ${(props) => (props.query === 'xs' ? (props.size ? `${props.size}` : vertDefaultSize) : null)}; }
        @media ${device.sm} { height: ${(props) => (props.query === 'sm' ? (props.size ? `${props.size}` : vertDefaultSize) : null)}; }
        @media ${device.md} { height: ${(props) => (props.query === 'md' ? (props.size ? `${props.size}` : vertDefaultSize) : null)}; }
        @media ${device.lg} { height: ${(props) => (props.query === 'lg' ? (props.size ? `${props.size}` : vertDefaultSize) : null)}; }
        @media ${device.xl} { height: ${(props) => (props.query === 'xl' ? (props.size ? `${props.size}` : vertDefaultSize) : null)}; }
    `}
`

export const MainContainer = styled.div`
    max-width: ${props => (props.mainWidth ? `${props.mainwidth}"px"` : "1000px")} ;
    min-height: 1000px;
    margin: 0 auto;
    border: solid black;
    background: #FFFFFF 
`

export const WritingContainer = styled.div`
    text-align:left;
    margin: 50px;
    font-size: 20px;
`

export const MoveOnButton = styled.button`
    background: rgb(242, 242, 242);
    font-size: 24px;
    font-weight:bold;
    border: solid black 1px;
    border-radius: 0;
    width: 100%;
    padding: 5px;
    color: black
`
export const StandardButton = styled.button`
    border: solid black 1px;
    border-radius: 0;
    background-color: #f2f2f2;
    color: black;
    font-size: 20px
`
export const StepHeading = styled.h2`
    text-align: center;
    background: rgb(242, 242, 242);
    padding-top: 5px;
    padding-bottom: 5px;
`

// help
export const HelpContainer = styled.div`
    border: solid gray 1px;
    border-top: 0;
    width: 75%;
    font-size: 16px;
    width:90%;
    padding: 20px;
`

export const OK = styled.span`
    marginLeft: 5px;
    color: green 
`
export const HelpButton = styled.span`
    margin-left: 5px;
    border: solid gray 1px;
    padding-left: 5px;
    padding-right: 5px;
    color: gray;
    font-size: 20px
`

// cards
export function Card({ to, mainHeader, secondaryHeader }){
    return (
        <>
            <Link to={to} style={{ textDecoration: 'none' }}>
                <StyledCard>
                    <h1>{mainHeader}</h1>
                    <h2>{secondaryHeader}</h2>
                </StyledCard>
            </Link>
        </>
    )
}

const StyledCard = styled.div`
    background-color:white;
    color:black;
    padding: 5px;
    border: solid black 2px;
`

// Material
export const MaterialPhoto = styled.img`
    border: solid black;
    height: 150px;
    
    @media ${device.lg} {
        height: 200px;
    } 
`
// Measurement
export const MeasurementBlock = styled.div`
    display: flex;
    width: '100%';
    flex-direction: column; 
    justify-content: space-evenly;

    @media ${device.lg} {
        flex-direction: row;
        justify-content: space-evenly;
    }
`

// Cloze Solved
export const SolvedCloze = styled.div`
    border: solid black 1px;
    padding: 20px 20px 20px 20px;
    line-height: 30px;
    word-spacing: 3px;
`

