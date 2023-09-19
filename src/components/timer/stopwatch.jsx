import { 
    TimerButton,
    ButtonGroup,
    VerticalSpace
} from './style.jsx'
import { useStopwatch } from 'react-timer-hook';

export default function MyStopwatch({ width=null }){
    const {
        seconds,
        minutes,
        hours,
        days,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    return (
        <div style={{ width:width, margin:'0 auto'}}>
            <div style={{textAlign:'center', display:'flex', flexDirection:'column'}}>
                <ButtonGroup>
                    <TimerButton onClick={reset}>Start</TimerButton>
                    <TimerButton onClick={pause}>Pause</TimerButton>
                    <TimerButton onClick={start} endpart="yes">Weiter</TimerButton>
                </ButtonGroup>
                <VerticalSpace/>
                <Timer seconds={seconds} minutes={minutes}/>
            </div>
        </div> 
    );
}

function Digit({ value }) {
    const leftDigit = value >= 10 ? value.toString()[0] : '0';
    const rightDigit = value >= 10 ? value.toString()[1] : value.toString();
    return (
        <div>
            {leftDigit}{rightDigit}
        </div>
    );
}

function Timer({ seconds, minutes }) {
    return (
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',fontSize:'72px'}}>
            <Digit value={minutes}/>:<Digit value={seconds}/>
        </div> 
    );
}
