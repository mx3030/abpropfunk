import { EPButton, ButtonGroup, VerticalSpace } from './style.jsx'
import { BiSolidSave, BiTrash, BiUndo, BiRedo } from 'react-icons/bi'
import { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import CanvasDraw from '/public/lib/react-canvas-draw/src/index.jsx'

export default function ExperimentPhoto({
    canvasWidth,
    canvasHeight,
    cameraWidth,
    cameraHeight, 
    isPortrait, 
    parentCallback, 
    savedImg, 
    savedCanvas,
    saveSignal
}){ 
    
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
 
    const [imgData, setImgData] = useState(savedImg ? JSON.parse(savedImg) : null);
    const [canvasData, setCanvasData] = useState(savedCanvas ? JSON.parse(savedCanvas) : null);
    const [mode,setMode]=useState(savedCanvas ? 'draw' : null) 

    useEffect(()=>{
        if(saveSignal==true) parentCallback(
            canvasData ? JSON.stringify(canvasRef.current.getSaveData()) : null, 
            imgData ? JSON.stringify(imgData) : null)
    },[saveSignal])
  
    const capture = useCallback(()=>{
        const img = webcamRef.current.getScreenshot();
        setImgData(img);
        setMode('draw')
    },[webcamRef]);

    const retake = useCallback(()=>{
        setImgData(null)
        setMode('camera')
    },[webcamRef])
 
    //--------------------------------------------------------------------------------------
    //---------------------------------------parts------------------------------------------
    //--------------------------------------------------------------------------------------
   
    const videoConstraints = {
        width: (isPortrait ? cameraHeight : cameraWidth),
        height: (isPortrait ? cameraWidth : cameraHeight),
        facingMode: { exact: "environment" }
    };

    const CustomWebcam = (
        <div style={{border:'solid black 2px', display:'flex',justifyContent:'center'}}>
            <Webcam 
                ref={webcamRef}
                audio={false}
                height={cameraHeight}
                width={cameraWidth}
                videoConstraints={videoConstraints} 
            />
        </div>    
    )

    const CustomCanvas = (
        <CanvasDraw 
            ref={canvasRef}
            onChange={null}
            imgSrc={imgData}
            saveData={canvasData}
            immediateLoading={true}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            lazyRadius={1}
            brushRadius={1}
            brushColor={"#000000"}
            hideGrid={false}
        />
    )

    const MainArea = (
        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
            {mode=='camera' && CustomWebcam}
            {mode=='draw' && CustomCanvas} 
        </div>
    )

    const ToolbarTop = (
        <ButtonGroup>
            <ButtonGroup>
                <EPButton onClick={retake}>Kamera starten	</EPButton>
                <EPButton onClick={capture}>Foto aufnehmen </EPButton>
            </ButtonGroup>
        </ButtonGroup>
    )
 
    const ToolbarBottomDraw = (
        <ButtonGroup>
            <EPButton style={{fontSize:'24px'}} onClick={()=>{ parentCallback(JSON.stringify(canvasRef.current.getSaveData()), JSON.stringify(imgData))}}> <BiSolidSave/> </EPButton>
            <EPButton style={{fontSize:'24px'}} onClick={()=>{ canvasRef.current.eraseAll() }}> <BiTrash/> </EPButton>
            <EPButton style={{fontSize:'24px'}} onClick={()=>{ canvasRef.current.undo() }}> <BiUndo/> </EPButton>
        </ButtonGroup>
    )
    
    return (
        <>    
            {ToolbarTop}
            {mode!=null && <VerticalSpace />}
            {MainArea}
            {mode!=null && <VerticalSpace />}
            {mode=='draw' && ToolbarBottomDraw}
        </>
    );
}


