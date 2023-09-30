import Help2A from '/src/tasks/task1/steps/step2/help2/help2.jsx'

export const step2_initSol = {
    step2A_init: [
        { 'col0':{val: 0,   diff: 0} },
        { 'col0':{val: 20,  diff: 0} },
        { 'col0':{val: 40,  diff: 0} },
        { 'col0':{val: 60,  diff: 0} },
        { 'col0':{val: 80,  diff: 0} },
        { 'col0':{val: 100, diff: 0} },
    ],
    step2B_init : [
        { 'col0':{val: 0,   diff: 0}    , 'col1':{val: 0, diff: 0}      ,'col2':{val: 0,  diff: 0}  },
        { 'col0':{val: 20,  diff: 0}    , 'col1':{val: 2, diff: 0.5}    ,'col2':{val: 100,diff: 10} },
        { 'col0':{val: 40,  diff: 0}    , 'col1':{val: 4, diff: 0.5}    ,'col2':{val: 200,diff: 20} },
        { 'col0':{val: 60,  diff: 0}    , 'col1':{val: 6, diff: 0.5}    ,'col2':{val: 300,diff: 30} },
        { 'col0':{val: 80,  diff: 0}    , 'col1':{val: 8, diff: 0.5}    ,'col2':{val: 400,diff: 40} },
        { 'col0':{val: 100, diff: 0}    , 'col1':{val: 10,diff: 0.5}    ,'col2':{val: 500,diff: 50} },
    ], // my own measurement at home 
}


export const step2_data = {
    heading: {text: "Schritt 2: Messung durchführen"},
    
    instructions: [
        { 
            text: "Für den Versuch werden 100 Seiten Papier benötigt. In 20-er Schritten wird der Papierstapel erhöht und in jedem Schritt wird Höhe und Gewicht notiert.",
            display: 'true', 
            check: 'false',
            help: false,
            displayHelp: false,
        },
        { 
            text: "Bevor du startest: Fülle die Spalte mit der Anzahl an Papierseiten aus.", // instruction text
            display: 'true', // after which progress instruction is displayed
            check: 'step2A', // after which progress to check symbol shows up
            help: false, // which component shows up on help button click
            displayHelp: false, // visiblity of help component
        },
        { 
            text: "Bestimme jetzt durch Messungen die Höhe und das entsprechende Gewicht. Führe die Messungen sorgfältig durch, auch wenn du meinst die Fortsetzung bereits zu kennen. ",
            display:'step2A',
            check: 'step2B',
            help: false,
            displayHelp: false,
        }, 
    ],

    table : {
        col: 3,
        header: ['Anzahl','Höhe in [mm]','Gewicht in [g]'],
        startValues: [{'col0':'0','col1':'0','col2':'0'}],
        showTimer: 'false', // after which progress timer shows up
        hideTimer: 'true', // after which progress timer hide
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
            action: 'trimTable',
            input: ['solData','step2B'],
            args: [['col0','col1']],
            ggbRef: false,
            target: 'step2B_updater1',
            step: 'step2B_updater1', // use additional progress step
        },
        {
            when: 'step2B_updater1',
            action: 'trimTable',
            input: ['solData','step2B'],
            args: [['col0','col2']],
            ggbRef: false,
            target: 'step2B_updater2',
            step: 'step2B_updater2', // use additional progress step
        },
        {
            when: 'step2B_updater2',
            action: 'trimTable',
            input: ['solData','step2B'],
            args: [['col1','col2']],
            ggbRef: false,
            target: 'step2B_updater3',
        },

    ],

    next:{
        visible: 'step2B',
        click: 'step2',
    },
    
}


