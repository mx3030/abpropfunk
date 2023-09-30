import { MoveOnButton, VerticalSpace, StepHeading } from '/src/style.jsx'
import { useState, useEffect, useContext, createContext } from 'react';
import Instructions from '/src/components/taskControl/instructions.jsx'
import Questions from '/src/components/taskControl/questions.jsx'
import FlowControl from '/src/components/flowControl/flowControl.jsx'

import { ProgressDataContext, TaskDataContext, SolDataContext, TableDataContext, GGBDataContext, InputDataContext } from '/src/tasks/task2/task2.jsx'

export default function Step4({ggbRef}){

    const { progressData, updateProgressData } = useContext(ProgressDataContext)
    const { taskData, setTaskData } = useContext(TaskDataContext)
    const { solData, updateSolData } = useContext(SolDataContext)
    const { tableData, updateTableData } = useContext(TableDataContext);
    const { ggbData, updateGGBData } = useContext(GGBDataContext);
    const { inputData, updateInputData } = useContext(InputDataContext);
            
    useEffect(()=>{
        ggbRef.current.setCustomToolBar(taskData.step4.ggb.customToolBar)
    },[ggbRef])
     
    return (
        <>
             <FlowControl
                step="step4"
                taskData={taskData}
                ggbData={ggbData}
                ggbRef={ggbRef}
                inputData= {inputData}
                progressHandler={[progressData, updateProgressData]}
                solHandler={[solData, updateSolData]}
            />
 
            <StepHeading>{taskData.step4.heading.text}</StepHeading>
            <Instructions 
                instructions={taskData.step4.instructions} 
                taskHandler={[taskData,setTaskData]} 
                progressData={progressData}
            />
            <Questions
                taskHandler={[taskData,setTaskData]} 
                questionStep="step4" 
                progressData={progressData}
                inputData={inputData}
                parentCallback={(data)=>updateInputData(data)}
            />
        </>
    )
}
