export const step1_initSol = {}
export const step1_data = {
    heading: {text: "Schritt 1: Versuchsaufbau"},
    instructions: [
        { 
            text: "Stelle den Wasserhahn so ein, dass er tropft. Halte den leeren Messzylinder unter den tropfenden Wasserhahn. In diesem Moment, wird ein Timer (wird im nächsten Schritt bereitgestellt) gestartet. Es wird dann alle 30 Sekunden der Milliliterstand im Messzylinder gemessen und eine Tabelle ausgefüllt.",
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
