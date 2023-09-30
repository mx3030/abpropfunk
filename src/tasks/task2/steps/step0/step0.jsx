import { MoveOnButton, VerticalSpace } from '/src/style.jsx'
import { useState, useContext } from 'react';
import Instructions from '/src/components/taskControl/instructions.jsx'
import Materials from '/src/components/taskControl/materials.jsx'

import { ProgressDataContext, TaskDataContext } from '/src/tasks/task2/task2.jsx'

export default function Step0(){
    
    const { progressData, updateProgressData } = useContext(ProgressDataContext)
    const { taskData, setTaskData } = useContext(TaskDataContext)
     
    return(
        <>    
            <h1 style={{ textAlign: 'center', textDecoration:'underline' }}>{taskData.step0.heading.text}</h1> 
            <VerticalSpace/>    
            <Instructions 
                instructions={taskData.step0.instructions}
                taskHandler={[taskData,setTaskData]} 
                progressData={progressData}
            />
            <VerticalSpace />
            <Materials materials={taskData.step0.materials} />
            <VerticalSpace />
            {progressData[taskData.step0.next.visible] && !progressData.step0 && <MoveOnButton onClick={()=>updateProgressData(taskData.step0.next.click,true)}>Weiter</MoveOnButton>}
        </>
    )
}
