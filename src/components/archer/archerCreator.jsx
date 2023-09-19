import {
    MainContainer
} from './style.jsx'
import { ArcherContainer, ArcherElement } from 'react-archer';
import { useMemo } from "react";
import { CustomArcher, InputArcher, TextArcher } from './archerElements.jsx'

export default function ArcherCreator({ layoutData, width, height }){
    const createArcherElement = (row,col,key)=>{
        const data = layoutData.main[row][col]
        const connectionData = layoutData.connections[row][col]
        const connections = []
        const sourceAnkers = []
        const targetAnkers = []
        const startMarkers = []
        const endMarkers = []
        if(connectionData!=null){
            for (var i=0; i < connectionData.length; i++){
                connections.push(`${connectionData[i][0]}${connectionData[i][1]}`)
                sourceAnkers.push(connectionData[i][2])
                targetAnkers.push(connectionData[i][3])
                startMarkers.push(connectionData[i][4])
                endMarkers.push(connectionData[i][5])
            }
        }
        if(typeof data=='string') {
            return (
                <TextArcher 
                    position={[row+1,col+1]} 
                    style={{ fontSize:'24px' }} 
                    id={`${row}${col}`}
                    key={`${row}${col}`}
                    to={connections}
                    sourceAnchor={sourceAnkers}
                    targetAnchor={targetAnkers}
                    startMarker={startMarkers}
                    endMarker={endMarkers}
                ><div dangerouslySetInnerHTML={{ __html: data }}></div>
                </TextArcher>
            )
        } else if( typeof data=='boolean' ){
            return (
                <InputArcher 
                    position={[row+1,col+1]} 
                    id={`${row}${col}`}
                    key={`${row}${col}`}
                    to={connections}
                    sourceAnchor={sourceAnkers}
                    targetAnchor={targetAnkers}
                    startMarker={startMarkers}
                    endMarker={endMarkers}
                />
            )
        } else if (typeof data=='number') {
            return(     
                <InputArcher 
                    position={[row+1,col+1]} 
                    id={`${row}${col}`}
                    key={`${row}${col}`}
                    to={connections}
                    sourceAnchor={sourceAnkers}
                    targetAnchor={targetAnkers}
                    startMarker={startMarkers}
                    endMarker={endMarkers}
                    data={data.toString()}
                    readonly={true}
                />
            )
        }
    }
    
    var LayoutElements = useMemo(()=>{
        const elements = []
        for(var i=0;i < layoutData.rows;i++){
            for(var j=0;j < layoutData.cols;j++){
                if(layoutData.main[i][j]!=null) elements.push(createArcherElement(i,j))
            }
        }
        return elements
    })
    
    return ( 
        <>
            <ArcherContainer>
                <MainContainer width={width} height={height} gridrows={layoutData.rows} gridcols={layoutData.cols}>
                    {LayoutElements}
                </MainContainer>
            </ArcherContainer>
        </>
    )    

}
