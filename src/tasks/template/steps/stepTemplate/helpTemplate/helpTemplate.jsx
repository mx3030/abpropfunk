import { HelpContainer, VerticalSpace } from '/src/style.jsx'
import { useState, useEffect, useContext } from 'react';
import { ProgressDataContext, TaskDataContext, SolDataContext, TableDataContext } from '/src/tasks/template/template.jsx'
import Instructions from '/src/components/taskControl/instructions.jsx'
import FlowControl from '/src/components/flowControl/flowControl.jsx'

export default function Help2A(){
    const { progressData, updateProgressData } = useContext(ProgressDataContext);
    const { taskData, setTaskData } = useContext(TaskDataContext)
    const { solData, updateSolData } = useContext(SolDataContext);
    const { tableData, updateTableData } = useContext(TableDataContext);
    
    return (
        <>
            
        </>
    )
}
