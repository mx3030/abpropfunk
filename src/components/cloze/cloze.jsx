import { ClozeContainer } from "./style.jsx"
import { useState, useRef, useEffect, useCallback, useContext, createContext, useMemo } from 'react';
import { getSentence, getAnswers } from './textConverter.jsx'
import SentenceBox from './sentenceBox.jsx'
import AnswerBox from './answerBox.jsx'

export default function Cloze({ text, parentCallback }){
    const [state, setState] = useState({
        showResults: false,
        answers: getAnswers(text),
        sentence: getSentence(text),
    })
    const { showResults, sentence } = state;

    const onDrop = (e,dropId)=>{
        const text = e.dataTransfer.getData("text/plain");
        const sentence = state.sentence.map(word=>{
            if (word.id === dropId){
                return { ...word, placed: true, displayed: text }
            }
            return word;
        });
        setState({ ...state, sentence });
    };

    const getResult = () => {
        return state.sentence.reduce((acc, cur) => {
            if (cur.type === "answer") {
                //let s = `word [${cur.text}] `;
                var s
                if (!cur.placed) {
                    //s += "has not been placed";
                    s = false
                } else {
                    //s += cur.text === cur.displayed ? "correct!" : "has not been placed correctly";
                    if (cur.text===cur.displayed) s=true
                    else s=false
                }                
                return acc.concat(s);
            }
            return acc;
        }, []);
    };

    useEffect(()=>{
        var result = getResult()
        const allTrue = result.every(value => value === true);
        if(allTrue==true){
            setState({ ...state, showResults: true })
            parentCallback(true)
        }
        else {
            setState({ ...state, showResults: false });
            parentCallback(false)
        }
    },[sentence])

    return (
        <>
            <ClozeContainer>
                <SentenceBox
                    marked={showResults}
                    onDrop={onDrop}
                    sentence={state.sentence}
                ></SentenceBox>
                {!showResults && <AnswerBox answers={state.answers}></AnswerBox>}
            </ClozeContainer>
        </>
    )
}
