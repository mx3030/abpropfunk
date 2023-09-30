import './App.css'
import { Card, VerticalSpace } from './style.jsx'
import { useState, useRef, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import DebugComponent from '/src/components/debugComponent.jsx'
import Template from './tasks/template/template.jsx'
import Task1 from './tasks/task1/task1.jsx'
import Task2 from './tasks/task2/task2.jsx'


const Cards = ({gap='20px'})=>{
    
    const debugMode = false

    return (    
        <>         
            { debugMode && <><Card
                to="/debug"
                mainHeader="debug component"
            />
            <VerticalSpace size={gap}/></> }
            
            { debugMode && <><Card 
                to="/template" 
                mainHeader="Template" 
                secondaryHeader="Template" 
            />
            <VerticalSpace size={gap}/></> }

            <Card 
                to="/station1" 
                mainHeader="Station 1" 
                secondaryHeader="Der tropfende Wasserhahn" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station2" 
                mainHeader="Station 2" 
                secondaryHeader="Strategisches Zählen" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station3" 
                mainHeader="Station 3" 
                secondaryHeader="Kabelsalat" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station4" 
                mainHeader="Station 3" 
                secondaryHeader="Löse den Mordfall" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station5" 
                mainHeader="Station 5" 
                secondaryHeader="Getränke kühlen" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station6" 
                mainHeader="Station 6" 
                secondaryHeader="Gewindestange" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station7" 
                mainHeader="Station 7" 
                secondaryHeader="Hebelkraft" 
            />
        </>
    )
}

export default function App() {
    return (
        <>    
            <Router basename="/abpropfunk">
                <Routes>
                    <Route path="/" element={<Cards/>} />
                    <Route path="/debug" element={<DebugComponent />} />
                    <Route path="/template" element={<Template />} />
                    <Route path="/station1" element={<Task1 />} />
                    <Route path="/station2" element={<Task2 />} />
                </Routes>
            </Router>
        </>
    ) 
}
