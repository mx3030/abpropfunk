import { HelpButton, OK, VerticalSpace } from '/src/style.jsx'
import LatexInputField from '/src/components/input/latexInputField.jsx'
import { useState, useEffect } from 'react';

export default function Questions({taskHandler, questionStep, progressData, inputData, parentCallback}){
    const [taskData, setTaskData] = taskHandler;
    
    const toggleInstructionVisibility = (step, questionIndex, isVisible) => {
        const updatedTaskData = { ...taskData };
        updatedTaskData[step].questions[questionIndex].displayHelp = isVisible;
        setTaskData(updatedTaskData);
    };
    
    const [callbackData, setCallbackData] = useState({})
    const updateCallbackData = (id, value) => {
        setCallbackData((prevCallbackData) => ({
            ...prevCallbackData,
            [id]: value,
        }));
    };
    
    const Questions = taskData[questionStep].questions.map((question, i) => (
        <div key={i}>
            { progressData[question.display] &&
            <div>
                {question.topSpace && <VerticalSpace size={question.topSpace}/>}
                <div>
                    <div style={{display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap'}}>
                        {question.text}
                        {question.input.map((part, i) => {
                            return part==true ? <LatexInputField 
                                key={i} 
                                style={{width:"100px", border:"solid rgb(200, 200, 200)"}} 
                                data={inputData[question.id]} 
                                parentCallback={(data)=>{updateCallbackData(question.id,data)}} 
                            /> : <span key={i}>{part}</span>;
                        })}
                    {progressData[question.check] && <OK>&#x2713;</OK>} 
                    {question.help  && (<HelpButton onClick={() => toggleInstructionVisibility(questionStep, i, !question.displayHelp)}>&#x3F;</HelpButton>)}
                    </div>
                </div>
                {question.displayHelp && (question.help ? question.help : null)}  
                {question.bottomSpace && <VerticalSpace size={question.bottomSpace}/>}
            </div>
            }    
        </div>
    ));

    useEffect(()=>{
        parentCallback(callbackData)
    },[callbackData])

    return <>{Questions}</>;
};

