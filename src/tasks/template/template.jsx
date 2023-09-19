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

import StepTemplate from '/src/tasks/template/steps/stepTemplate/stepTemplate.jsx'
// main config files
import { stepTemplate_data, stepTemplate_initSol } from '/src/tasks/template/steps/stepTemplate/stepTemplate_data.jsx'
// additional help files
import { helpTemplate_data, helpTemplate_initSol } from '/src/tasks/template/steps/stepTemplate/helpTemplate/helpTemplate_data.jsx'

export default function Template(){
    
    const [taskData, setTaskData] = useState({
        stepTemplate: stepTemplate_data,
        helpTemplate: helpTemplate_data,
    }) 
    
    //--------------------------------------------------------------------------------------
    const [solData, setSolData] = useLocalStorageState('solDataTemplate',{
        defaultValue: {
            stepTemplate_initSol,
            helpTemplate_initSol,
        }
    })
    
    const updateSolData = (data, value) => {
        setSolData((prevSolData) => ({
            ...prevSolData,
            [data]: value,
        }));
    }

    //--------------------------------------------------------------------------------------
    const [progressData, setProgressData] = useLocalStorageState('progressDataTemplate', {
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
    
    const [miscData, setMiscData] = useLocalStorageState('miscDataTemplate',{
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
    const [tableData, setTableData] = useLocalStorageState('tableDataTemplate',{
        defaultValue: []
    });
    
    const updateTableData = (newValue) => {
        setTableData(newValue);
    };
    
    //--------------------------------------------------------------------------------------
    const [ggbData, setGGBData] = useLocalStorageState('ggbDataTemplate',{
        defaultValue: {
            points: [],
            lines: []
        }
    });
   
    const updateGGBData = (newValue) => {
        setGGBData(newValue);
    };

    //--------------------------------------------------------------------------------------
    const [inputData, setInputData] = useLocalStorageState('inputDataTemplate',{
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
                    <WritingContainer> 
                        <StepTemplate />  
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



