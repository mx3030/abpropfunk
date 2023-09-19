import Checker from './checker.jsx'
import Updater from './updater.jsx'

export default function FlowControl({ 
    step, 
    taskData,
    progressHandler,
    solHandler,
    tableData, 
    ggbData,
    ggbRef,
    inputData,
}){            
    
    const [progressData, updateProgressData] = progressHandler
    const [solData, updateSolData] = solHandler
 
    const handleUpdaterCallback = ((data)=>{
        for(const step in data){
            updateSolData(step, data.step )
        }
    })
    
    const MyChecker=(
        <Checker 
            commands = {taskData[step].checker}
            progressHandler = {progressHandler}
            solHandler = {solHandler}
            tableData = {tableData}
            ggbData={ggbData}
            inputData = {inputData}
        />
    )

    const MyUpdater = (
        <Updater
            commands = {taskData[step].updater}
            ggbRef={ggbRef}
            progressData = {progressData}
            solHandler = {solHandler}
            parentCallback = {handleUpdaterCallback}
        />

    )

    return(
        <>
            {MyChecker}
            {MyUpdater}
        </>
    )
}
