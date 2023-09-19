import { useState, useEffect, useCallback } from 'react';
import { extractPointsFromCommandString, extractCoefficientsFromLine } from './ggbUtils.jsx'

export default function GGBListenerWrapper({ children, ggbRef, parentCallback, useAddListener, useRemoveListener }) { 
    const [undoButton, setUndoButton] = useState(null) // state for adding click event
    const [redoButton, setRedoButton] = useState(null) // state for adding click event   
    
    useEffect(()=>{
        if(ggbRef.current!=null){
            if(useAddListener==true) ggbRef.current.registerAddListener(ggbAddHandler)
            else if(useAddListener==false) ggbRef.current.unregisterAddListener(ggbAddHandler)
            if(useRemoveListener==true) ggbRef.current.registerRemoveListener(ggbRemoveHandler)
            else if(useRemoveListener==false) ggbRef.current.unregisterRemoveListener(ggbRemoveHandler) 
        }
    },[ggbRef,useAddListener,useRemoveListener])

    const ggbAddHandler = async(name)=>{
        setUndoButton(ggbRef.current.querySelector('.undoButton')); // enable undo callback after first add
        setRedoButton(ggbRef.current.querySelector('.redoButton')); // enable redo callback after first add
        parentCallback(name) // trigger addEvent state
    }

    const ggbRemoveHandler = async(name)=> parentCallback("remove")

    useEffect(()=>{ // define undo/redo button parent callback on click event
        if(undoButton!=null) undoButton.onclick = async()=> parentCallback("undo")
        if(redoButton!=null) redoButton.onclick = async()=> parentCallback("redo")  
    },[undoButton,redoButton])
      
    return(<>{children}</>)
}


