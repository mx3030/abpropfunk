import { useState, useEffect, useCallback } from 'react';
import { extractPointsFromCommandString, extractCoefficientsFromLine } from './ggbUtils.jsx'
import { ggbConstructionStyle } from './style/style.jsx'

export default function GGBDataWrapper( { 
    children, 
    ggbRef, 
    parentCallback, 
    changeEvent, 
    reload, ggbData // for reloading
}){
    
    const [objectsData, setObjectsData] = useState([])
    const [data, setData] = useState(reload ? ggbData :{points:{},lines:{}})
    useEffect(() => parentCallback(data) ,[data])

    const getObjectNames = async()=>setObjectsData(await ggbRef.current.getAllObjectNames()) 
    useEffect(()=>{ 
        getObjectNames() 
    },[changeEvent])
    

    const createGGBData= useCallback(async (objects,data)=>{
        var prevPoints = data.points // keep track of last points list
        var prevLines = data.lines
        var mode = await ggbRef.current.getMode()
        var points = {}
        var lines = {}
        for (var i=0; i< objects.length; i++) {
            var objectType = await ggbRef.current.getObjectType(objects[i])
            if(objectType=='point'){ // handle point objects
                await ggbRef.current.setColor(objects[i],...ggbConstructionStyle.point.color)  // set point color
                await ggbRef.current.setPointSize(objects[i],ggbConstructionStyle.point.size)  // set point size
                var pointX = await ggbRef.current.getXcoord(objects[i]) // get point x value
                var pointY = await ggbRef.current.getYcoord(objects[i]) // get point y value
                points[objects[i]] = {}
                points[objects[i]].x = pointX
                points[objects[i]].y = pointY 
                if(prevPoints.hasOwnProperty(objects[i])){
                    var prevVisibility = prevPoints[objects[i]].visible
                    points[objects[i]].visible = prevVisibility
                }
                else {
                    if(mode==1) points[objects[i]].visible = true
                    if(mode==2) {
                        await ggbRef.current.setVisible(objects[i],false)
                        points[objects[i]].visible = false
                    }
                }
            }

            if(objectType=='line'){
                try{ // catch promise error from extractCoefficientsFromLine function on reload
                    const pointsOnLine = extractPointsFromCommandString(await ggbRef.current.getCommandString(objects[i])) // get two points on line from command string 
                    var valueString = await ggbRef.current.getValueString(objects[i]) // get implicit equation of line
                    var [slope, yIntersection] = await extractCoefficientsFromLine(ggbRef,objects[i], valueString) // get m,c of line 
                    lines[objects[i]] = {}
                    lines[objects[i]].points=pointsOnLine 
                    lines[objects[i]].eq = valueString.replace(/^[a-zA-Z]:\s*/, ''); // regex to remove first part
                    lines[objects[i]].m = slope
                    lines[objects[i]].c = yIntersection
                } catch (e) {
                    lines[objects[i]] = prevLines[objects[i]] // use old ggbData if not working
                }    
            }
        } 
        setData({points: points, lines: lines}) 
    },[])
 
    useEffect(()=>{
        if(objectsData.length>0) createGGBData(objectsData,data) // only run if objectsData exists (important for reloading to work !!!)
    },[objectsData]) 

    return(<>{children}</>)
}


    

    
