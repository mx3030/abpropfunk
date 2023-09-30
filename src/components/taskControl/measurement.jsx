import { useCallback } from 'react';
import { VerticalSpace, MeasurementBlock } from '/src/style.jsx'
import Table from '/src/components/table/table.jsx'
import MyStopwatch from '/src/components/timer/stopwatch.jsx'

export default function Measurement({taskDataTable, progressData, tableHandler, isPortrait}){
    const [tableData, updateTableData] = tableHandler
    
    const handleTableCallback = useCallback((tableData)=>{
        updateTableData(tableData)
    })

    return (
        <MeasurementBlock> 
            <Table 
                width={(isPortrait ? "70%" : "60%")} 
                colNumber={taskDataTable.col} 
                header={taskDataTable.header} 
                startValues={taskDataTable.startValues}
                parentCallback={handleTableCallback}
                savedData={tableData}
            />
            <VerticalSpace query='xs' size="50px"/>
            <VerticalSpace query='lg' size="0px"/>
            { (taskDataTable && (progressData ? progressData[taskDataTable.showTimer] : true) && (progressData ? !progressData[taskDataTable.hideTimer] : true) ) && <MyStopwatch/> }
        </MeasurementBlock>
    )    
}
