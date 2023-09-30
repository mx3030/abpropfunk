import MyStopwatch from '/src/components/timer/stopwatch.jsx'
import Help2A from '/src/tasks/task1/steps/step2/help2/help2.jsx'

export const help2A_initSol = {
    help2AA_init : [{},{}],
    help2AB_init : [
        { 'col0':{val: 0,   diff: 0} },
        { 'col0':{val: 0.5, diff: 0} }, 
    ],
    help2AC_init : [
        { 'col0':{val: 0,   diff: 0} },
        { 'col0':{val: 0.5, diff: 0} },
        { 'col0':{val: 1,   diff: 0} }, 
    ],
}

export const help2A_data = {  
    instructions: [
        {
            text: "Drücke am unteren Ende der Tabelle auf das + Symbol, um eine neue Zeile hinzuzufügen.",
            display: "true",
            check: "help2AA",
        },
        {
            text:"Trage den nächsten Zeitschritt in die Tabelle ein.",
            display: "help2AA",
            check: "help2AB",
        },
        {
            text: "Wiederhole die Schritte, bis du bei 5 Minuten angekommen bist. Wie viele Sekunden sind 5 Minuten?",
            display: "help2AB",
            check: "help2AC",
        },
    ],

    checker: [
            {
                step: 'help2AA',
                action: 'compareTablesLength',
                input: ['tableData'],
                sol: ['solData','help2A_initSol','help2AA_init'],
                args: ['>='],
            },
            {
                step: 'help2AB',
                action: 'compareTables',
                input: ['tableData'],
                sol: ['solData','help2A_initSol','help2AB_init'],
                args: [true]
            },
            {
                step: 'help2AC',
                action: 'compareTables',
                input: ['tableData'],
                sol: ['solData','help2A_initSol','help2AC_init'],
                args: [true]
            },
    ],

    updater : [

    ],
}


