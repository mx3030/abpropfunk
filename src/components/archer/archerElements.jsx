import { useCallback } from "react";
import { ArcherElement } from 'react-archer';
import LatexInputField from '/src/components/input/latexInputField.jsx'

export function CustomArcher({ children, position, id, to=[], targetAnchor=[], sourceAnchor=[], endMarker=[], startMarker=[] }){  
    const relations = useCallback(()=>{
        const connections = []
        if(to.length!=0){
            for(var i=0; i<to.length; i++){
                connections.push({
                    targetId: to[i],
                    targetAnchor: targetAnchor[i],
                    sourceAnchor: sourceAnchor[i],
                    style: { 
                        strokeColor: 'black', 
                        strokeWidth: 2,
                        startMarker: startMarker[i],
                        endMarker: endMarker[i]
                    },
                })
            }
        }
        return connections
    })

    return (
        <>
            <div style={{ gridArea:`${position[0]}/${position[1]}`,alignSelf:'center'}}>
                <ArcherElement id={id} relations={relations()}>
                    {children}
                </ArcherElement>
            </div>    
        </>
    )
}

export function InputArcher({data,readonly, ...props}){
    return (
        <>
            <CustomArcher {...props}> 
                <div><LatexInputField style={{border:'solid black 1px'}} data={data} readonly={readonly} /></div>
            </CustomArcher>
        </>
    )
}

export function TextArcher({children, ...props}){
    return (
        <>
            <CustomArcher {...props}> 
                <div style={{ textAlign:'center' }}>{children}</div>
            </CustomArcher>
        </>
    )
}
