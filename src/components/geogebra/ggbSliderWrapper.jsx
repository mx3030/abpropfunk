import { useState, useEffect } from 'react';
import GGBSlider from './ggbSlider.jsx'

export default function GGBSliderWrapper({ 
    children, 
    ggbRef,
    parentCallback,
    visible,
    coordStart,
    sliderStartPosition, 
    sliderSettings, 
}) {  
    const [leftSliderValue, setLeftSliderValue] = useState(1)
    const [bottomSliderValue, setBottomSliderValue] = useState(1)

    useEffect(()=>{
        try{ setLeftSliderValue(sliderStartPosition[0]) } catch (e) {}
        try{ setBottomSliderValue(sliderStartPosition[1]) } catch (e) {}
    },[sliderStartPosition])

    useEffect(()=>{
        ggbRef.current.setCoordSystem(coordStart.xMin,coordStart.xMax,coordStart.yMin,coordStart.yMax)
    },[coordStart])

    useEffect(()=>{     
        if(ggbRef.current!=null && coordStart!=null && leftSliderValue!=null && bottomSliderValue!=null){
            var xMin = coordStart.xMin * bottomSliderValue;
            var xMax = coordStart.xMax * bottomSliderValue;
            var yMin = coordStart.yMin * leftSliderValue;
            var yMax = coordStart.yMax * leftSliderValue;        
            ggbRef.current.setCoordSystem(xMin,xMax,yMin,yMax)
        }
    },[leftSliderValue, bottomSliderValue])

    useEffect(()=>{
        parentCallback([leftSliderValue,bottomSliderValue])
    },[visible]) 
    const leftSlider = (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <GGBSlider 
                orientation="vertical" 
                height="50%" 
                parentCallback={(value)=>{setLeftSliderValue(value)}}
                sliderSettings={sliderSettings.left}
                defaultValue={sliderStartPosition ? sliderStartPosition[0] : 1}
            >
            </GGBSlider>
        </div>
    )

    const bottomSlider = (
        <div style={{display:'flex',justifyContent:'center'}}>
            <GGBSlider 
                orientation="horizontal" 
                width="50%" 
                parentCallback={(value)=>{setBottomSliderValue(value)}} 
                sliderSettings={sliderSettings.bottom}
                defaultValue={sliderStartPosition ? sliderStartPosition[1] : 1}    
            >
            </GGBSlider>
        </div>
    )

    return (
        <>    
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                { visible && leftSlider }
                <div>
                    { children }
                    { visible && bottomSlider}
                </div>   
            </div> 
        </>
    )
}

