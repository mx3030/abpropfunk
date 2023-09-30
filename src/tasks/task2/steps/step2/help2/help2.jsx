import { HelpContainer, VerticalSpace } from '/src/style.jsx'
import { useState, useEffect, useContext } from 'react';
import { ProgressDataContext, TaskDataContext, SolDataContext, TableDataContext } from '/src/tasks/task2/task2.jsx'
import Instructions from '/src/components/taskControl/instructions.jsx'
import FlowControl from '/src/components/flowControl/flowControl.jsx'

export default function Help2A(){
    const { progressData, updateProgressData } = useContext(ProgressDataContext);
    const { taskData, setTaskData } = useContext(TaskDataContext)
    const { solData, updateSolData } = useContext(SolDataContext);
    const { tableData, updateTableData } = useContext(TableDataContext);
    
    return (
        <>
            <FlowControl
                step="help2A"
                taskData={taskData}
                progressHandler={[progressData, updateProgressData]}
                solHandler={[solData, updateSolData]}
                tableData={tableData}
            />    
            <VerticalSpace size="10px" />
            <HelpContainer>    
                <Instructions 
                    instructions={taskData.help2A.instructions} 
                    taskHandler={[taskData,setTaskData]} 
                    progressData={progressData}
                />
            </HelpContainer>
            <VerticalSpace />
        </>
    )
}
