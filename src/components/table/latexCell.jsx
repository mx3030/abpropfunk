import './style/latexCell.css'
import { useState, useRef, useEffect } from 'react'
import {
    setRowData,
    rowData,
    columnData,
    columnIndex
} from 'react-datasheet-grid'

export default function LatexCell({setRowData,rowData,columnData,columnIndex}){
    const [value, setValue] = useState('')
    const mf = useRef()
   
    useEffect(() => {   
        mf.current.smartFence = true
        mf.current.mathVirtualKeyboardPolicy = "manual" // for virtual keyboard control
        if(typeof rowData!=='undefined'){
            mf.current.executeCommand("deleteAll")
            mf.current.insert(rowData) // insert pre-defined values (see table.jsx)
        }      
        mf.current.addEventListener("click",()=>{
            mf.current.focus() // fast access without double click
        })
        mf.current.addEventListener("focusin", () =>  { 
            mathVirtualKeyboard.hide(); // never use virtal keyboard
        })
        mf.current.addEventListener("focusout", () =>  mathVirtualKeyboard.hide())
        mf.current.addEventListener('input', (e) => {
            setValue(e.target.value)
            setRowData(e.target.value.replace(/,/g, '.')) // replace accidential commas with points
            //if (e.inputType === 'insertLineBreak') {
                //e.preventDefault();
            //}
        })
    }, [])

    return (
        <>    
            <math-field style={{height:"80%",alignItems:"center"}}ref={mf}></math-field>
        </>
    )
}


