import {
    EVButton,
    ButtonGroup,
    VerticalSpace
} from './style.jsx'
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import ReactPlayer from 'react-player';
import { useMediaQuery } from 'react-responsive'

export default function ExperimentVideo({ cameraWidth, cameraHeight }){
    const webcamRef = useRef(null);
    
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' }) // if orientation changes videoConstraints go crazy
    const videoWidth=(isPortrait ? cameraHeight : cameraWidth)
    const videoHeight=(isPortrait ? cameraWidth : cameraHeight)

    const [display, setDisplay] = useState(null) // switch between webcam and video player (true: webcam, false: videoPlayer)
    
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    
    const [videoURL, setVideoURL] = useState(null)
    const videoPlayerRef = useRef(null)
    
    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/mp4"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = useCallback(({ data }) => {
        if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
        }
    },[setRecordedChunks]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    //const handleDownload = useCallback(() => {
        //if (recordedChunks.length) {
            //const blob = new Blob(recordedChunks, {
                //type: "video/mp4"
            //});
            //const url = URL.createObjectURL(blob);
            //const a = document.createElement("a");
            //document.body.appendChild(a);
            //a.style = "display: none";
            //a.href = url;
            //a.download = "react-webcam-stream-capture.mp4";
            //a.click();
            //window.URL.revokeObjectURL(url);
            //setRecordedChunks([]);
        //}
    //}, [recordedChunks]);

    const createURLObject = useCallback(()=>{
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/mp4"
            });
            setVideoURL(URL.createObjectURL(blob));       
            setRecordedChunks([])
        }
    },[recordedChunks])

    const setDisplayVideoPlayer = ()=>{
        setDisplay('videoPlayer')
        if(recordedChunks.length>0) createURLObject()
    }
    
    //--------------------------------------------------------------------------------------
    //---------------------------------------parts------------------------------------------
    //--------------------------------------------------------------------------------------
    
    const videoConstraints = {
        width: videoWidth,
        height: videoHeight,
        facingMode: { exact: "environment" }
    };

    const CustomWebcam = (
        <>        
            <div style={{border:'solid black 2px', display:'flex',justifyContent:'center'}}>
                <Webcam 
                    ref={webcamRef}
                    audio={false} 
                    height={cameraHeight}
                    width={cameraWidth}
                    videoConstraints={videoConstraints}    
                />
            </div>    
        </>
    )

    const CustomVideoPlayer = (
        <>
            <div style={{ border:'solid black 2px', display:'flex',justifyContent:'center', height:`${cameraHeight}px` }}>
                <ReactPlayer
                    ref={videoPlayerRef}
                    url={videoURL}
                    playing={true}
                    controls={true}
                    height={cameraHeight}
                    width={cameraWidth}
                />
            </div>
        </>
    )
    
    const ToolbarTop = (
        <>
            <ButtonGroup>
                <EVButton onClick={()=>setDisplay('webcam')}>Aufnahme</EVButton>
                <EVButton onClick={setDisplayVideoPlayer}>Anschauen</EVButton>
            </ButtonGroup>
        </>
    )

    const ToolbarBottomWebcam = (
        <>
            <ButtonGroup>
                { capturing ? (<EVButton onClick={handleStopCaptureClick}>Aufnahme stoppen</EVButton>) : (<EVButton onClick={handleStartCaptureClick}>Aufnahme starten</EVButton>) }
            </ButtonGroup>
        </>
    )

    const ToolbarBottomVideoPlayer = (
        <>
        </>
    )
 

    const MainArea = (
        <>
            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                { display=='webcam' && CustomWebcam }
                { display=='videoPlayer' && CustomVideoPlayer } 
            </div>
        </>
    )

    return (
        <>
            { ToolbarTop }    
            <VerticalSpace />
            { MainArea }
            <VerticalSpace />
            { display=="webcam" && ToolbarBottomWebcam } 
            { display=="videoPlayer" && ToolbarBottomVideoPlayer } 
        </>
    );
}
