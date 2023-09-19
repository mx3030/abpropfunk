import { useState, useEffect } from 'react';
import { 
    isArray,
    isObject,
    compareNumbers, 
    compareTables, 
    comparePointLists, 
    compareLines, 
    compareTablesLength,
} 
from './checkerFunctions.jsx'

const functionMapper = {
    'compareNumbers' : compareNumbers,
    'compareTables' : compareTables, 
    'comparePointLists': comparePointLists,
    'compareLines' : compareLines,
    'compareTablesLength': compareTablesLength,
}

export default function Checker({ commands, ggbData, tableData, inputData, solHandler, progressHandler }){ 
    const [progressData, updateProgressData] = progressHandler
    const [solData, updateSolData] = solHandler
    
    const dataMapper = {
        'tableData': tableData,
        'ggbData': ggbData,
        'inputData': inputData,
        'solData': solData,
        'progressData': progressData,
    }

    const dataFinder = (arrayPath)=>{
        try{
            var finalDest = dataMapper[arrayPath[0]]
            for (var i=1;i<arrayPath.length; i++){
                if(typeof arrayPath[i] == 'number' && isObject(finalDest)) finalDest = finalDest[Object.keys(finalDest)[arrayPath[i]]] // if index is used to access some key (fist key) 
                else finalDest = finalDest[arrayPath[i]]
            }
            return finalDest
        } catch (e) {
            return null
        }    
    }

    useEffect(()=>{  
        for(var i=0; i < commands.length; i++){
            var command = commands[i]
            if(progressData[command.after]==false){
                updateProgressData(command.step,false)
            } else {
                var ans = dataFinder(command.input)
                var sol = dataFinder(command.sol)
                // function(answer, solution, ...args) --> return {step: {res: boolean, sol: <user solution>}}
                var data = functionMapper[command.action](ans,sol, ...command.args)
                updateProgressData(command.step, data.res)
                if(data.sol!=null) updateSolData(command.step,data.sol)
            }
        }
    },[tableData, ggbData, inputData, progressData, solData]) // watch everything to be safe

    return(<></>)   
}





