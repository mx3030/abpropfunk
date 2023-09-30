import { MoveOnButton, StepHeading, VerticalSpace,} from '/src/style.jsx'
import { useState, useContext, useCallback } from 'react';
import ExperimentPhoto from '/src/components/experimentPhoto/experimentPhoto.jsx';
import Instructions from '/src/components/taskControl/instructions.jsx'

import { ProgressDataContext, TaskDataContext, SolDataContext, MiscDataContext } from '/src/tasks/task2/task2.jsx'

export default function Step1(){
    
    const { progressData, updateProgressData } = useContext(ProgressDataContext)
    const { taskData, setTaskData } = useContext(TaskDataContext)
    const { solData, updateSolData } = useContext(SolDataContext)
    const { miscData, updateMiscData } = useContext(MiscDataContext);
    
    const handleEPCallback = useCallback((canvasData, imgData)=>{
        updateMiscData('canvasData',canvasData);
        updateMiscData('imgData',imgData);
    },[])
     
    const [ saveSignal, setSaveSignal ] =  useState(false)
     
    return(    
        <>
            <StepHeading>{taskData.step1.heading.text}</StepHeading>
            <Instructions 
                instructions={taskData.step1.instructions}
                taskHandler={[taskData,setTaskData]} 
                progressData={progressData}
            />
            <VerticalSpace />
            <ExperimentPhoto 
                canvasWidth={miscData.mainWidth-10} 
                canvasHeight={500} 
                cameraWidth={300} 
                cameraHeight={500}
                isPortrait={miscData.isPortrait}
                parentCallback={handleEPCallback} 
                savedCanvas={miscData.canvasData} 
                savedImg = {miscData.imgData}
                saveSignal={saveSignal}
            />
            <VerticalSpace />
            {progressData[taskData.step1.next.visible] && !progressData.step1 && <MoveOnButton onClick={()=>{updateProgressData(taskData.step1.next.click,true), setSaveSignal(true)}}>Weiter</MoveOnButton>}
        </>
    )
}

