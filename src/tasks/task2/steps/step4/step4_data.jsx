import { createCoordStart } from '/src/components/geogebra/ggbUtils.jsx'
import img1 from '/img/ggb_toolbar/Mode_join.svg'

export const step4_initSol = {
    step4A_init: [0],

}
export const step4_data = {
    heading: {
        text: "Schritt 4: Grafische Lösung",
    },
    instructions:[
        {
            component: 
                <div> Verwende das Geraden-Tool 
                    <img src={img1} style={{border:"solid gray 1px", marginLeft:"5px", marginRight:"5px"}} width="30" height="30" /> 
                    um die Anzahl an Papierseiten für einen deutlich höheren Stapel abzuschätzen zu können. Ziehe eine Linie durch den Ursprung, die möglichst nah an allen gemessenen Punkten liegt.
                </div>,
            inLine: true, // if true, check and help are inline with text (why it works in instructions.jsx i don't know)
            display:'true',
            check:'step4B',
            help:null,
            displayHelp: null,
            bottomSpace: "20px"
        },
        {
            text: "Beantworte die Fragen, in dem du die Werte an der Geraden abliest.",
            display: 'step4B',
            check: 'false',
            bottomSpace: "20px",
        },
    ],
    
    questions: [
        {
            id: 'step4C',
            input: ["Ein Stapel mit einer Höhe von einem Meter, enthält", true, "Seiten Papier."],
            display:"step4B",
            check: 'step4C',
            bottomSpace: "20px",
        },
        {
            id: 'step4D',
            input: ["10000 Seiten Papier erzeugen einen Stapel mit einer Höhe von",true,"Millimetern."],
            display:"step4C",
            check:'step4D',
            bottomSpace: "20px"
        },
        {
            id: 'step4E',
            input: ["Das sind",true,"Meter."],
            display:"step4D",
            check:'step4E',
            bottomSpace: "20px"
        },
        {
            id: 'step4F',
            text: "Bestimme das Gewicht von 10000 Seiten Papier? Falls du diese Aufgabe wieder grafisch lösen möchtest, wird ein neues Koordintatensystem bereitgestellt.",
            input:["10000 Seiten Papier wiegen ca.", true, "Kilogramm."],
            display:"step4E",
            check:'step4F',
        }
    ],
    
    ggb:{ // first applet
        customToolBar: "0|6|1|2",
    },

    ggb2:{ // second applet
        when: "step4E",
        coordStart: createCoordStart([{x:1,y:1},{x:10,y:10}]),
        axislabels: ['x','y'],
        sliderSettings: {left:{ min: 1, max: 5000, step: 1 }, bottom: { min: 1, max: 1000, step: 1}},
        customToolBar: "0|6|1|2",
    },

    checker: [
        {
            after: 'step3B',
            step: 'step4A',
            action: 'compareTablesLength',
            input: ['ggbData','lines'],
            sol: ['solData','step4_initSol','step4A_init'],
            args: ['='],
        },
        {
            after: 'step4A',
            step: 'step4B',
            action: 'compareLines',
            input: ['ggbData','lines',0],
            sol: ['solData','regression'], // use solution from updater 
            args: [true], 
        },
        {
            after: 'step4B',
            step: 'step4C',
            action: 'compareNumbers',
            input: ['inputData','step4C'],
            sol: ['solData','answerBox0'],
            args: [10],
        },
        {
            after: 'step4C',
            step: 'step4D',
            action: 'compareNumbers',
            input: ['inputData','step4D'],
            sol: ['solData','answerBox1'],
            args: [10],
        },
        {
            after: 'step4D',
            step: 'step4E',
            action: 'compareNumbers',
            input: ['inputData','step4E'],
            sol: ['solData','answerBox2'],
            args: [10/1000],
        },
        {
            after: 'step4E',
            step: 'step4F',
            action: 'compareNumbers',
            input: ['inputData','step4F'],
            sol: ['solData','answerBox3'],
            args: [10],
        },
    ],

    updater: [ 
        {
            when: 'step4B',
            action: 'createValuePair',
            input: ['solData','step4B','eq'], // use equation key of ggb line
            args: ['y=1000','x,y', 'x'], // args=[condition, variables, target]
            ggbRef: true,
            target: 'answerBox0',
        },
        {
            when: 'step4C',
            action: 'createValuePair',
            input: ['solData','step4B','eq'],
            args: ['x=10000','x,y','y'],
            ggbRef: true,
            target: 'answerBox1'
        },
        {
            when: 'step4D',
            action: 'calc', 
            input:['solData','step4D'],
            args: ['x/1000'],
            ggbRef: false, 
            target: 'answerBox2',
        },
        {
            when: 'step4E',
            action: 'createRegressionFromTable',
            input: ['solData','step2B_updater2'],
            args:[0],
            ggbRef: true,
            target: 'step4E_updater1',  // target in solData
            step: 'step4E_updater1',    // step in progressData
        },
        {
            when: 'step4E_updater1',
            action: 'createValuePair',
            input: ['solData','step4E_updater1'],
            args:['x=10000',['x,y'],'y'],
            ggbRef: true,
            target: 'step4E_updater2',
            step: 'step4E_updater2',
        },
        {
            when: 'step4E_updater2',
            action: 'calc', 
            input:['solData','step4E_updater2'],
            args: ['x/1000'],
            ggbRef: false, 
            target: 'answerBox3',
        }
    ],

   next:{
        visible: 'step4F',
        click: 'step4',
    },
}
