import './App.css'
import { Card, VerticalSpace } from './style.jsx'
import { useState, useRef, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import DebugComponent from '/src/components/debugComponent.jsx'
import Template from './tasks/template/template.jsx'
import Task1 from './tasks/task1/task1.jsx'


const Cards = ({gap='20px'})=>{
    
    const debugMode = true

    return (    
        <>         
            { debugMode && <><Card
                to="/debug"
                mainHeader="debug component"
            />
            <VerticalSpace size={gap}/></> }
                <Card 
                to="/template" 
                mainHeader="Template" 
                secondaryHeader="Template" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station1" 
                mainHeader="Station 1" 
                secondaryHeader="Der tropfende Wasserhahn" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station2" 
                mainHeader="Station 2" 
                secondaryHeader="Hilf dem Raben" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station3" 
                mainHeader="Station 3" 
                secondaryHeader="Lösen den Mordfall" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station4" 
                mainHeader="Station 3" 
                secondaryHeader="Büroarbeit" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station5" 
                mainHeader="Station 5" 
                secondaryHeader="Fußball, Handball oder Basketball?" 
            />
            <VerticalSpace size={gap}/>
            <Card 
                to="/station6" 
                mainHeader="Station 6" 
                secondaryHeader="Bauteilprüfung" 
            />
        </>
    )
}

export default function App() {
    return (
        <>    
            <Router basename="/abpropfunk">
                <Routes>
                    <Route path="/debug" element={<DebugComponent />} />
                    <Route path="/" element={<Cards/>} />
                    <Route path="/template" element={<Template />} />
                    <Route path="/station1" element={<Task1 />} />
                </Routes>
            </Router>
        </>
    ) 
}
