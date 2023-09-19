import styled from "styled-components";

export const ClozeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid black 1px;
  padding: 10px 20px 10px 20px
`;

//--------------------------------------------------------------------------------------
//----------------------------------text-section----------------------------------------
//--------------------------------------------------------------------------------------

export const TextBlock = styled.div`
  margin: 1em auto;
`;

export const WordBox = styled.div`
  background-color: "white";
  margin: 1px;
  padding: 0.2em 0.1em;
  cursor: pointer;
  min-width: 1em;
`;

export const DroppableWordBox = styled.div` 
  margin: 2px;
  padding: 0.1em 0.2em;
  cursor: pointer;
  min-width: 2em;
  background-color: ${props => props['bgcolor'] || "rgb(242, 242, 242)"};
  border: solid rgb(191, 191, 191) 1px
`;

export const WordWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap:wrap;
`;

//--------------------------------------------------------------------------------------
//--------------------------------answer-section----------------------------------------
//--------------------------------------------------------------------------------------

export const AnswerBlock = styled.div`
  margin: 1em auto;
  border: solid black 1px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  padding:20px;
  background-color:rgb(242, 242, 242)
`;

export const AnswerWordWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap:wrap;
`;

export const DraggableWordBox = styled.div`
  background-color: white;
  margin: 5px;
  padding: 0.1em 0.2em;
  cursor: pointer;
  min-width: 1em;
  border: solid black 1px
`;
