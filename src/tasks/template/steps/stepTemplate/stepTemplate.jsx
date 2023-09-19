import { useState, useEffect, useCallback, useContext } from 'react';
import { 
    ProgressDataContext, 
    TaskDataContext, 
    SolDataContext, 
    MiscDataContext, 
    TableDataContext,
    GGBDataContext,
    InputDataContext 
} from '/src/tasks/template/template.jsx'

import { MoveOnButton, StepHeading, VerticalSpace } from '/src/style.jsx'
import Instructions from '/src/components/taskControl/instructions.jsx'
import FlowControl from '/src/components/flowControl/flowControl.jsx'

export default function StepTemplate() {     
    
    const { progressData, updateProgressData } = useContext(ProgressDataContext)
    const { taskData, setTaskData } = useContext(TaskDataContext)
    const { solData, updateSolData } = useContext(SolDataContext)
    const { miscData, updateMiscData } = useContext(MiscDataContext);
    const { tableData, updateTableData } = useContext(TableDataContext);
    const { ggbData, updateGGBData } = useContext(GGBDataContext);
    const { inputData, updateInputData } = useContext(InputDataContext);
         
    return( 
        <> 
            <StepHeading>{taskData.stepTemplate.heading.text}</StepHeading> 
            <Instructions 
                instructions={taskData.stepTemplate.instructions} 
                taskHandler={[taskData,setTaskData]} 
                progressData={progressData}
            />
        </>
    )
}

