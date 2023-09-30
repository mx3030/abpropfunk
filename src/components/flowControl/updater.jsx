import { useState, useEffect } from 'react';
import {
    moveData,
    createRegression,
    createRegressionFromTable,
    createValuePair,
    calc,
    trimTable,
}
from './updaterFunctions.jsx'

const updaterMapper = {
    "moveData"                  : moveData,
    "createRegression"          : createRegression,
    "createRegressionFromTable" : createRegressionFromTable,
    "createValuePair"           : createValuePair,
    "calc"                      : calc,
    "trimTable"                 : trimTable,
}

export default function Updater({ ggbRef, commands, progressHandler, solHandler }){
     
    const [solData, updateSolData] = solHandler
    const [progressData, updateProgressData] = progressHandler
    
    const dataMapper = {
        'solData': solData, // updater only needs solData at the moment
    }

    const dataFinder = (arrayPath)=>{
        try{
            var finalDest = dataMapper[arrayPath[0]]
            for (var i=1;i<arrayPath.length; i++) {
                if(typeof arrayPath[i] == 'number' && isObject(finalDest)) finalDest = finalDest[Object.keys(finalDest)[arrayPath[i]]] // if index is used to access some key (fist key) 
                else finalDest = finalDest[arrayPath[i]]
            }
            return finalDest
        } catch (e) {
            return null
        }
        
    }

    useEffect(()=>{     
        const runChecker = async(command)=>{
            var input = dataFinder(command.input)
            // function ( (ggbRef), data, args ) --> return sol
            if(command.ggbRef==true) var sol = await updaterMapper[command.action](ggbRef, input,...command.args)
            else var sol = updaterMapper[command.action](input,...command.args)
            if(sol!=null){
                updateSolData(command.target,sol) // sol != null important for reloading, because otherwise those values are problematic to be calculatet with ggbUtils functions (applet startup bug)
                if(command.step!=null) updateProgressData(command.step,true) // use additional progress step --> set to true
            } else {
                if(command.step!=null) updateProgressData(command.step,false) // use additional progress step --> set to false
            }
        }
        
        for(var i=0; i< commands.length; i++){
            var command = commands[i]
            if(progressData[command.when]){
                runChecker(command) // async needed because of ggbUtils functions
            }
        }

    },[progressData]) 
    
    return(<></>)
}


