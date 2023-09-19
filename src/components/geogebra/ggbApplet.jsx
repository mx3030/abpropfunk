import { AppletContainer } from './style/style.jsx'
import { useState, forwardRef, useEffect } from 'react';

function GGBApplet({
    commands, 
    ...props},
    ref){
    
    useEffect(()=>{
        if (commands!=null){
            commands.forEach(command => {
                ref.current.evalCommand(command);
            });
        } 
    },[commands]);

    useEffect(()=>{ // workaround because evalCommmandCAS not working on first call
        const init = async()=>{
            await ref.current.evalCommandCAS("x(x=0)")
        }
        init()
    },[ref])
        
    return (
        <>    
            <AppletContainer width={props.width} height={props.width}>
                <geogebra-applet ref={ref} {...props}></geogebra-applet>
            </AppletContainer>
        </>
    )
}

export default forwardRef(GGBApplet)
