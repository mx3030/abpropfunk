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
                    um das Volumen nach einer Stunde abzuschätzen. Ziehe eine Linie durch den Ursprung, die möglichst nah an allen gemessenen Punkten liegt.
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
            input: ["In einem Tag tropfen aus dem Wasserhahn", true, "Milliliter."],
            display:"step4B",
            check: 'step4C',
            bottomSpace: "20px",
        },
        {
            id: 'step4D',
            input: ["In einem Tag tropfen aus dem Wasserhahn",true,"Liter"],
            display:"step4C",
            check:'step4D',
            bottomSpace: "20px"
        },
        {
            id: 'step4E',
            text: "Wie lange dauert es ungefähr, bis 1 Liter aus dem Wasserhahn tropft?",
            input:["Nach", true, "Minuten ist ein Liter Wasser verschwendet worden."],
            display:"step4D",
            check:'step4E',
        }
    ],
    ggb:{
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
            args: [10/1000],
        },
        {
            after: 'step4D',
            step: 'step4E',
            action: 'compareNumbers',
            input: ['inputData','step4E'],
            sol: ['solData','answerBox2'],
            args: [10],
        },
    ],

    updater: [ 
        {
            when: 'step4B',
            action: 'createValuePair',
            input: ['solData','step4B','eq'], // use equation key of ggb line
            args: ['x=1000','x,y', 'y'], // args=[condition, variables, target]
            ggbRef: true,
            target: 'answerBox0',
        },
        {
            when: 'step4C',
            action: 'calc', 
            input:['solData','step4C'],
            args: ['x/1000'],
            ggbRef: false, 
            target: 'answerBox1',
        },
        {
            when: 'step4D',
            action: 'createValuePair',
            input: ['solData','step4B','eq'],
            args:['y=1000',['x,y'],'x'],
            ggbRef: true,
            target: 'answerBox2',
        },
    ],

   next:{
        visible: 'step4E',
        click: 'step4',
    },
}
