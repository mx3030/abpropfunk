import './style/ggbSlider.css'
import { useState } from 'react';
import Slider from 'rc-slider';

export default function GGBSlider({ width, height, orientation, sliderSettings, defaultValue, parentCallback}){
    const [currentValue, setCurrentValue] = useState(0);

    const verticalHandleStyle = {
        backgroundColor: "black",
        width: 30, 
        height: 30,
        marginLeft: -12,
        opacity: 1
    }

    const horizontalHandleStyle = {
        backgroundColor: "black",
        width: 30, 
        height: 30,
        marginTop: -12,
        opacity: 1
    }

    return (
        <>
            <div style={{width:width,height:height}}>
                <Slider 
                    onChange={parentCallback}
                    vertical={orientation=="vertical" ? true : false}
                    defaultValue={(defaultValue ? defaultValue : 1)}
                    min={sliderSettings.min}
                    max={sliderSettings.max}
                    step={sliderSettings.step}
                    trackStyle={{ backgroundColor: "black" }}
                    railStyle={{ backgroundColor: "gray" }}
                    handleStyle={orientation=="vertical" ? verticalHandleStyle : horizontalHandleStyle}>
                </Slider>
            </div>    
        </>
    )
}
