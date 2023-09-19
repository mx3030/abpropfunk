import './style/table.css'
import { MyDeleteRowButton, MyAddRowButton } from './style/style.jsx'
import { useState, useEffect, useContext, useMemo } from 'react';
import LatexCell from './latexCell.jsx'
import {
    DataSheetGrid,
    keyColumn,
    textColumn,
    addRows,
    deleteRow
} from 'react-datasheet-grid'

export default function Table({ width="100%", colNumber, header, startValues, parentCallback, savedData }) {
    
    const [ data, setData ] = useState(savedData.length!=0 ? savedData : startValues) // if saved data changes state won't change 
        
    useEffect(()=>{
        parentCallback(data)
    },[data]) 
    
    const genColumns = useMemo(()=>{
        const latexCol = () => ({
            component: LatexCell,
            cellClassName:({rowIndex,columnId})=>{
                return columnId.toString()+rowIndex.toString()
            }
        })    
        const columns = []
        for (var i=0;i< colNumber;i++){
            const colName = `col${i}`
            columns.push({ ...keyColumn(colName,latexCol()), title: header[i] })
        }
        columns.push({ 
            component: 
            ({ deleteRow }) => (<MyDeleteRowButton onClick={deleteRow}>&#x2715;</MyDeleteRowButton>),
            maxWidth:'40',
            minWidth:'40',
        })
        return columns
    },[])
 
    return (
        <>   
            <div style={{width:width, margin:'0 auto'}}>
                <DataSheetGrid
                    value={data}
                    onChange={setData}
                    columns={genColumns}
                    rowHeight={50}
                    height={800}
                    addRowsComponent={({addRows})=>{return (<MyAddRowButton onClick={()=>addRows(1)}>+</MyAddRowButton>)}}
                    gutterColumn={true}>
                </DataSheetGrid>
            </div>       
        </>
    )
}
