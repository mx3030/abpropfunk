export const step1_initSol = {}
export const step1_data = {
    heading: {text: "Schritt 1: Versuchsaufbau"},
    instructions: [
        { 
            text: "In regelmäßigen Schritten, wird das Gewicht von einer bekannten Anzahl Papier mit der Waage gemessen. In jedem Schritt wird zusätzlich die Höhe des Papierstapels gemessen. Die Ergebnisse werden anschließend in eine Tabelle eingetragen.",
            display: 'true',
            check: 'false',
            help: false,
            displayHelp: false,
            bottomSpace: "20px",
        },
        { 
            text: "Baut euren Versuch auf und macht ein Foto, in dem man die Idee des Ablaufs erkennen kann. Falls notwendig, können Beschriftungen anschließend eigefügt werden.",
            display: 'true',
            check: 'false',
            help: false,
            displayHelp: false,
        } 
    ],
    checker: [

    ],
    updater: [

    ],
    next:{
        visible: 'step0',
        click: 'step1'
    }
}
