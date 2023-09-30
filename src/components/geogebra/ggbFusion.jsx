import { useState, useEffect, useCallback } from 'react';
import GGBApplet from './ggbApplet.jsx'                     // handle web-component
import GGBListenerWrapper from './ggbListenerWrapper.jsx'   // handle listeners
import GGBDataWrapper from './ggbDataWrapper.jsx'           // handle data
import GGBReloadWrapper from './ggbReloadWrapper.jsx'       // handle reload
import GGBSliderWrapper from './ggbSliderWrapper.jsx'       // handle slider

export default function GGBFusion({
    id, 
    ggbRef,
    ggbHandler,
    miscHandler,
    reload,
    width, 
    height,
    customToolBar,
    axislabels,
    coordStart,
    sliderDisplay,
    sliderStartPosition,
    sliderSettings,
}){ 
     
    const [reloadState, setReloadState] = useState(reload) // handle reload timing 
    const [signal, setSignal] = useState(null) // change event signal
    const handleListenerCallback = useCallback((event)=> setSignal(event) ,[])
    const [ggbData, updateGGBData] = ggbHandler // make ggb context accesible 
    const handleDataCallback = useCallback((data)=> {
       if(reloadState==false) updateGGBData(data) 
    },[reloadState])
    const [miscData, updateMiscData] = miscHandler // make misc context accesible
    const handleSliderCallback = useCallback((data)=>{
        //console.log("left slider value:", data[0]),
        //console.log("bottom slider value:", data[1]),
    })
    
    //TODO: better handling of different use cases

    const BaseWrapper= (
        <GGBApplet 
            ref={ggbRef} // ref forward
            id={id}
            showToolBar={true}
            customToolBar={customToolBar}
            showToolBarHelp={false}
            perspective="G" 
            width={width} 
            height={height} 
            showMenuBar="false" 
            showResetIcon="false" 
            enableUndoRedo="true"
            enableShiftDragZoom="true"
            borderColor="#FFFFFF"
            xaxislabel={axislabels ? axislabels[0] : x}
            yaxislabel={axislabels ? axislabels[1] : y}
            enableRightClick={false}
            commands={null}
        />
    ) 

    const ListenerWrapper = (
        <GGBListenerWrapper 
            ggbRef={ggbRef} 
            parentCallback={handleListenerCallback}  
            useAddListener={true} 
            useRemoveListener={true} 
        > { BaseWrapper } 
        </GGBListenerWrapper>
    )

    const DataWrapper = (
        <GGBDataWrapper
            ggbRef={ggbRef}
            parentCallback={handleDataCallback}
            reload={reload}
            ggbData={ggbData}
            changeEvent={signal} 
        > { ListenerWrapper }
        </GGBDataWrapper> 
    )

    const ReloadWrapper = (
        <GGBReloadWrapper
            ggbRef={ggbRef}
            reloadHandler={[reloadState, setReloadState]}
            ggbHandler={ggbHandler}
        > { DataWrapper }
        </GGBReloadWrapper>
    )
    
    const SliderWrapper = (
        <GGBSliderWrapper 
            ggbRef={ggbRef}
            parentCallback={handleSliderCallback}
            visible={sliderDisplay}                     // control visiblity by sliderDisplay state 
            coordStart={coordStart}
            sliderStartPosition={sliderStartPosition}   // pass saved slider values
            sliderSettings={sliderSettings}             // pass slider settings (step, max, min, ...)
        >
            {ggbData!=null && <div style={{margin:'50px'}}>{ReloadWrapper}</div>}   {/* ggbData is used */}
            {ggbData==null && <div style={{margin:'50px'}}>{BaseWrapper}</div>}     {/* ggbData not used */}
        </GGBSliderWrapper>
    )

    return (<>{SliderWrapper}</>)
}
