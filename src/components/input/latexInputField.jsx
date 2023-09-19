import './latexInputField.css'
import { useState, useRef, useEffect } from 'react'

export default function LatexInputField({ parentCallback, style, data, readonly }){
    const [value, setValue] = useState(data)
    const mf = useRef()
    
    // initialization
    useEffect(() => {

        mf.current.smartFence = true
        mf.current.mathVirtualKeyboardPolicy = "manual";
        mf.current.addEventListener("focusin", () =>  {
            mathVirtualKeyboard.hide(); // never use virtual keyboard
        })
        mf.current.addEventListener("focusout", () =>  mathVirtualKeyboard.hide())

        parentCallback(data)
        mf.current.addEventListener('input', (e) => {
            var userInput = e.target.value
            setValue(userInput)
            if (e.inputType === 'insertLineBreak') {
                e.preventDefault();
                if(parentCallback!=null) parentCallback(userInput) // send data back to parent
            }
        }) 
    }, []) 

    return (
        <>    
            {(readonly ? <math-field ref={mf} style={style} readonly>{value}</math-field> : <math-field ref={mf} style={style}>{value}</math-field>) }
        </>
    )
}


