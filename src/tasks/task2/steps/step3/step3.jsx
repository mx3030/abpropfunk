import { MoveOnButton, StandardButton, VerticalSpace, StepHeading } from '/src/style.jsx'
import { useState, useRef, useEffect, useCallback, useContext, useMemo } from 'react';
import GGBFusion from '/src/components/geogebra/ggbFusion.jsx'
import Cloze from '/src/components/cloze/cloze.jsx' 
import Instructions from '/src/components/taskControl/instructions.jsx'
import FlowControl from '/src/components/flowControl/flowControl.jsx'

import Step4 from '/src/tasks/task2/steps/step4/step4.jsx'

import { ProgressDataContext, TaskDataContext, SolDataContext, MiscDataContext, TableDataContext, GGBDataContext } from '/src/tasks/task2/task2.jsx'

export default function Step3() {
    
    const { progressData, updateProgressData } = useContext(ProgressDataContext)
    const { taskData, setTaskData } = useContext(TaskDataContext)
    const { solData, updateSolData } = useContext(SolDataContext)
    const { miscData, updateMiscData } = useContext(MiscDataContext);
    const { tableData, updateTableData } = useContext(TableDataContext);
    const { ggbData, updateGGBData } = useContext(GGBDataContext);
            
    const ggbRef=useRef(null) // pass to GGBFusion AND FlowControl !!! 
    const ggbRef2=useRef(null)
      
    return(    
        <>
            <FlowControl
                step="step3"
                taskData={taskData}
                ggbData={ggbData}
                ggbRef={ggbRef}
                progressHandler={[progressData, updateProgressData]}
                solHandler={[solData, updateSolData]}
                tableData={tableData}
            />
    
            <StepHeading>{taskData.step3.heading.text}</StepHeading> 
            <Instructions 
                instructions={taskData.step3.instructions} 
                taskHandler={[taskData,setTaskData]} 
                progressData={progressData}
            />
            { progressData[taskData.step3.cloze.display] && !progressData[taskData.step3.cloze.remove] && <Cloze text={taskData.step3.cloze.text} parentCallback={(result)=>updateProgressData(taskData.step3.cloze.updateProgress,result)}></Cloze> } 
            { progressData[taskData.step3.next.visible] && <VerticalSpace/> }
            { progressData[taskData.step3.next.visible] && !progressData.step3 && <MoveOnButton onClick={()=>updateProgressData(taskData.step3.next.click,true)}>Weiter</MoveOnButton>}
            { progressData[taskData.step3.next.click] && <Step4 ggbRef={ggbRef}/> }
            
            <GGBFusion
                id="applet"
                ggbRef={ggbRef}
                ggbHandler={[ggbData,updateGGBData]}
                miscHandler={[miscData, updateMiscData]}
                reload={true} // handle reload of applet
                width={600} 
                height={600}
                customToolBar={taskData.step3.ggb.customToolBar}
                axislabels={progressData[taskData.step3.cloze.updateProgress] ? taskData.step3.cloze.action : taskData.step3.ggb.axislabels}
                coordStart={taskData.step3.ggb.coordStart}
                sliderDisplay={true}
                sliderStartPosition={miscData.sliderValues}
                sliderSettings={taskData.step3.ggb.sliderSettings}
            />

            { progressData[taskData.step4.ggb2.when] && ( 
                <div>
                    <VerticalSpace size="100px"/>
                    <GGBFusion
                        id="applet2"
                        ggbRef={ggbRef2}
                        ggbHandler={[null,null]}
                        miscHandler={[null,null]}
                        reload={null} // handle reload of applet
                        width={600} 
                        height={600}
                        customToolBar={taskData.step4.ggb2.customToolBar}
                        axislabels={['x','y']}
                        coordStart={taskData.step4.ggb2.coordStart}
                        sliderDisplay={true}
                        sliderStartPosition={miscData.sliderValues}
                        sliderSettings={taskData.step4.ggb2.sliderSettings}
                    />
                </div>
            )}

            { progressData[taskData.step4.next.visible] && <VerticalSpace size="100px"/> }
            { progressData[taskData.step4.next.visible] && <StepHeading style={{border:"solid black 5px",padding:"20px"}}>Geschafft! Auf zum nächsten Experiment.</StepHeading> } {/* Step5 Button (under ggb)*/}
    
        </>
    )
}
