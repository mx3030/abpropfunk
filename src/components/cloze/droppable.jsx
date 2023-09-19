// css
import { DroppableWordBox } from "./style.jsx"
// extern
import { useState } from 'react'; 

export default function Droppable({
    groupName,
    bgcolor,
    ndx,
    onDrop,
    children
}){
    const [state, setState] = useState({
        bgcolor:bgcolor
    })

    const _handleDrop = (e)=>{
        onDrop(e,groupName);
        e.preventDefault()
        setState({bgcolor:"white"});
    }

    const _handleDragOver = (e)=>{
        e.preventDefault();
        setState({bgcolor:"yellow"});
    }

    const _handleDragLeave = (e)=>{
        e.preventDefault();
        setState({bgcolor:"white"});
    }

    return (
        <>
            <DroppableWordBox
                bgcolor={bgcolor ? bgcolor : state.bgcolor}
                data-testid={`droppable${ndx}`}
                onDragLeave={_handleDragLeave}
                onDragOver={_handleDragOver}
                onDrop={_handleDrop}
            >
                {children}
            </DroppableWordBox>
        </>
    )
}
