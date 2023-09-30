import Help2A from '/src/tasks/task1/steps/step2/help2/help2.jsx'

export const step2_initSol = {
    step2A_init: [
        { 'col0':{val: 0,   diff: 0} },
        { 'col0':{val: 0.5, diff: 0} },
        { 'col0':{val: 1,   diff: 0} },
        { 'col0':{val: 1.5, diff: 0} },
        { 'col0':{val: 2,   diff: 0} },
        { 'col0':{val: 2.5, diff: 0} },
        { 'col0':{val: 3,   diff: 0} },
        { 'col0':{val: 3.5, diff: 0} },
        { 'col0':{val: 4,   diff: 0} },
        { 'col0':{val: 4.5, diff: 0} },
        { 'col0':{val: 5,   diff: 0} },
    ],
    step2B_init : [
        { 'col0':{val: 0,   diff: 0}    , 'col1':{val: 0,   diff: 0.25} },
        { 'col0':{val: 0.5, diff: 0}    , 'col1':{val: 0.75,diff: 0.25} },
        { 'col0':{val: 1,   diff: 0}    , 'col1':{val: 1.5, diff: 0.25} },
        { 'col0':{val: 1.5, diff: 0}    , 'col1':{val: 2.25,diff: 0.25} },
        { 'col0':{val: 2,   diff: 0}    , 'col1':{val: 3,   diff: 0.25} },
        { 'col0':{val: 2.5, diff: 0}    , 'col1':{val: 3.75,diff: 0.25} },
        { 'col0':{val: 3,   diff: 0}    , 'col1':{val: 4.5, diff: 0.25} },
        { 'col0':{val: 3.5, diff: 0}    , 'col1':{val: 5.25,diff: 0.25} },
        { 'col0':{val: 4,   diff: 0}    , 'col1':{val: 6,   diff: 0.25} },
        { 'col0':{val: 4.5, diff: 0}    , 'col1':{val: 6.75,diff: 0.25} },
        { 'col0':{val: 5,   diff: 0}    , 'col1':{val: 7.5, diff: 0.25} },
    ], // my own measurement at home 
}


export const step2_data = {
    heading: {text: "Schritt 2: Messung durchführen"},
    
    instructions: [
        { 
            text: "Der Versuch dauert 5 Minuten. Alle 30 Sekunden wird die Milliliteranzeige gemessen.",
            display: 'true', 
            check: 'false',
            help: false,
            displayHelp: false,
        },
        { 
            text: "Bevor du startest: Trage alle Zeitschritte in die Tabelle ein.", // instruction text
            display: 'true', // after which progress instruction is displayed
            check: 'step2A', // after which progress to check symbol shows up
            help: <Help2A />, // which component shows up on help button click
            displayHelp: false, // visiblity of help component
        },
        { 
            text: "Starte den Timer und halte den Messzylinder unter den tropfenden Hahn. Trage die gemessenen Werte in die Tabelle ein.",
            display:'step2A',
            check: 'step2B',
            help: false,
            displayHelp: false,
        }, 
    ],

    table : {
        col: 2,
        header: ['Zeit in [min]','Volumen in [ml]'],
        startValues: [{'col0':'0','col1':'0'}],
        showTimer: 'step2A', // after which progress timer shows up
        hideTimer: 'step2B', // after which progress timer hide
    },

    checker: [
        {
            after: 'step1',
            step: 'step2A', // this step gets checked and solution in this step gets updated
            action : 'compareTables',
            input : ['tableData'], 
            sol : ['solData','step2_initSol','step2A_init'], // this is the expected solution
            args: [true], // no args used
        },
        {
            after: 'step2A',
            step: 'step2B',
            action: 'compareTables',
            input: ['tableData'],
            sol: ['solData','step2_initSol','step2B_init'],
            args: [true],
        },
    ],

    updater: [
        {
            when: 'step2B',
            action: 'moveData',
            input: ['solData','step2B'],
            args: [],
            ggbRef: false,
            target: 'step3B_updater',
        },
    ],

    next:{
        visible: 'step2B',
        click: 'step2',
    },
    
}


