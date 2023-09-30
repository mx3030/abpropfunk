import { useState, useEffect, useCallback, useContext } from 'react';
import { MoveOnButton, StepHeading, VerticalSpace } from '/src/style.jsx'
import Instructions from '/src/components/taskControl/instructions.jsx'
import Measurement from '/src/components/taskControl/measurement.jsx'
import FlowControl from '/src/components/flowControl/flowControl.jsx'

import { ProgressDataContext, TaskDataContext, SolDataContext, MiscDataContext, TableDataContext } from '/src/tasks/task2/task2.jsx'

export default function Step2() {     
    
    const { progressData, updateProgressData } = useContext(ProgressDataContext)
    const { taskData, setTaskData } = useContext(TaskDataContext)
    const { solData, updateSolData } = useContext(SolDataContext)
    const { miscData, updateMiscData } = useContext(MiscDataContext);
    const { tableData, updateTableData } = useContext(TableDataContext);
         
    return(    
        <> 
            <FlowControl
                step="step2"
                taskData={taskData}
                progressHandler={[progressData, updateProgressData]}
                solHandler={[solData, updateSolData]}
                tableData={tableData}
            />

            <StepHeading>{taskData.step2.heading.text}</StepHeading>
            <Instructions 
                instructions={taskData.step2.instructions}
                taskHandler={[taskData,setTaskData]} 
                progressData={progressData}
            />
            <VerticalSpace size="50px"/>
            <Measurement 
                taskDataTable={taskData.step2.table} 
                tableHandler={[tableData, updateTableData]} 
                progressData={progressData} 
                isPortrait={miscData.isPortrait}
            />
            <VerticalSpace size="50px" />
            {progressData[taskData.step2.next.visible] && !progressData.step2 && <MoveOnButton onClick={()=>updateProgressData(taskData.step2.next.click,true)}>Weiter</MoveOnButton>}
        </>
    )
}
