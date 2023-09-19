import { useState, useEffect, useCallback } from 'react';
import { ggbConstructionStyle } from './style/style.jsx'

export default function GGBReloadWrapper( { children, ggbRef, reloadHandler, ggbHandler}){
    
    const [ggbData, setGGBData] = ggbHandler
    const [reloadState, setReloadState] = reloadHandler
    
    useEffect(()=>{ 
        
        if(reloadState==true && ggbRef.current!=null && ggbData!=null){
            for(const objectType in ggbData){
                const objects=ggbData[objectType]
                if(objectType=="points"){
                    for(const name in objects){
                        ggbRef.current.evalCommand(`${name}=(${objects[name].x},${objects[name].y})`)
                        if(objects[name].visible==false) ggbRef.current.setVisible(name,false)
                        else ggbStylePoints(objects[name])
                    }
                }            
                else if(objectType=="lines"){ 
                    for(const name in objects) ggbRef.current.evalCommand(`${name}=Line(${objects[name].points[0]},${objects[name].points[1]})`)
                }
            }
            setReloadState(false) 
        }  

    },[reloadState])

    const ggbStylePoints = useCallback(async(objectName)=>{
        await ggbRef.current.setColor(objectName,...ggbConstructionStyle.point.color)  // set point color
        await ggbRef.current.setPointSize(objectName,ggbConstructionStyle.point.size)  // set point size
    },[])

    return (<>{children}</>)
}

    
    
