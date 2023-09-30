import { MainContainer, WritingContainer, VerticalSpace } from '/src/style.jsx'
import { useState, useEffect, createContext } from 'react';
import useLocalStorageState from 'use-local-storage-state'
import { useMediaQuery } from 'react-responsive'

//--------------------------------------------------------------------------------------
export const ProgressDataContext = createContext()  // progress data for local storage
export const TaskDataContext = createContext()      // specific data for task
export const SolDataContext = createContext()       // solution data for local storage
export const MiscDataContext = createContext()      // misc data for local storage
export const TableDataContext = createContext()     // table data for local storage
export const GGBDataContext = createContext()       // ggb applet data for local storage
export const InputDataContext = createContext()     // input fields data for local storage
//--------------------------------------------------------------------------------------

import Step0 from '/src/tasks/task1/steps/step0/step0.jsx'
import Step1 from '/src/tasks/task1/steps/step1/step1.jsx'
import Step2 from '/src/tasks/task1/steps/step2/step2.jsx'
import Step3 from '/src/tasks/task1/steps/step3/step3.jsx'
// main config files
import { step0_data, step0_initSol } from '/src/tasks/task1/steps/step0/step0_data.jsx'
import { step1_data, step1_initSol } from '/src/tasks/task1/steps/step1/step1_data.jsx'
import { step2_data, step2_initSol } from '/src/tasks/task1/steps/step2/step2_data.jsx'
import { step3_data, step3_initSol } from '/src/tasks/task1/steps/step3/step3_data.jsx'
import { step4_data, step4_initSol } from '/src/tasks/task1/steps/step4/step4_data.jsx'
// additional help files
import { help2A_data, help2A_initSol } from '/src/tasks/task1/steps/step2/help2/help2_data.jsx'

export default function Task1(){
    
    const [taskData, setTaskData] = useState({
        step0: step0_data,
        step1: step1_data,
        step2: step2_data,
        step3: step3_data,
        step4: step4_data,
        help2A: help2A_data,
    }) 
    
    //--------------------------------------------------------------------------------------
    const [solData, setSolData] = useLocalStorageState('solDataTask1',{
        defaultValue: {
            step0_initSol,
            step1_initSol,
            step2_initSol,
            step3_initSol,
            step4_initSol,
            help2A_initSol,
        }
    })
    
    const updateSolData = (data, value) => {
        setSolData((prevSolData) => ({
            ...prevSolData,
            [data]: value,
        }));
    }

    //--------------------------------------------------------------------------------------
    const [progressData, setProgressData] = useLocalStorageState('progressDataTask1', {
        defaultValue: {
            'true' : true, // sometimes necessary
            'false': false, 
        }
    })

    const updateProgressData = (step, value) => {
        setProgressData((prevProgressData) => ({
            ...prevProgressData,
            [step]: value,
        }));
    };
    
    
    //-------------------------------------------------------------------------------------- 
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' }) // --> iPad 
    
    const [miscData, setMiscData] = useLocalStorageState('miscDataTask1',{
        defaultValue: {
            isPortrait: false,
            mainWidth: (isPortrait ? 750 : 1000),   
        }
    })

    const updateMiscData = (data, value) => {
        setMiscData((prevMiscData) => ({
            ...prevMiscData,
            [data]: value,
        }));
    }

    useEffect(()=>{
        updateMiscData('isPortrait',isPortrait)
    },[isPortrait])
    
    //--------------------------------------------------------------------------------------
    const [tableData, setTableData] = useLocalStorageState('tableDataTask1',{
        defaultValue: []
    });
    
    const updateTableData = (newValue) => {
        setTableData(newValue);
    };
    
    //--------------------------------------------------------------------------------------
    const [ggbData, setGGBData] = useLocalStorageState('ggbDataTask1',{
        defaultValue: {
            points: [],
            lines: []
        }
    });
   
    const updateGGBData = (newValue) => {
        setGGBData(newValue);
    };

    //--------------------------------------------------------------------------------------
    const [inputData, setInputData] = useLocalStorageState('inputDataTask1',{
        defaultValue: {}
    });
   
    const updateInputData = (newValue) => {
        setInputData(newValue);
    };

    
    //--------------------------------------------------------------------------------------
    return (
        <>    
            <ProgressDataContext.Provider value={{ progressData, updateProgressData }}>    
            <TaskDataContext.Provider value={{taskData, setTaskData}}>
            <SolDataContext.Provider value={{solData, updateSolData}}>
            <MiscDataContext.Provider value={{miscData, updateMiscData}}>
            <TableDataContext.Provider value={{ tableData, updateTableData }}>
            <GGBDataContext.Provider value={{ ggbData, updateGGBData }}>
            <InputDataContext.Provider value={{ inputData, updateInputData }}>
                <MainContainer mainwidth={miscData.mainWidth}>
                    <WritingContainer id="writingContainer"> 
                        <Step0 />  
                        <VerticalSpace/>
                        {progressData.step0 && <Step1 />} 
                        <VerticalSpace/>
                        {progressData.step1 && <Step2 />} 
                        <VerticalSpace/>
                        {progressData.step2 && <Step3> 
                            {/* Step4 */}
                        </Step3>} 
                        <VerticalSpace size="500px"/>
                    </WritingContainer>  
                </MainContainer>  
            </InputDataContext.Provider>
            </GGBDataContext.Provider>
            </TableDataContext.Provider>
            </MiscDataContext.Provider>
            </SolDataContext.Provider>
            </TaskDataContext.Provider>
            </ProgressDataContext.Provider>
        </>
    )
}



