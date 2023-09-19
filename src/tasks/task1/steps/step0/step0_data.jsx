import img1 from '/img/task1/messzylinder.jpg'
import img2 from '/img/task1/wasserhahn.jpg'

export const step0_initSol = {}
export const step0_data = {
    heading: {text: "Station 1 - Der tropfende Wasserhahn" },
    materials: [
        {name: 'Messzylinder',  src: img1 },
        {name: 'Wasserhahn',    src: img2 },
    ],
    instructions: [
        { 
            text: "In dieser Aufgabe wollen wir berechnen, wie viel Wasser verschwendet wird, wenn ein Wasserhahn einen Tag lang tropft. Du benötigst dafür folgende Materialien:",
            display: 'true',
            check: 'false',
            help: false,
            displayHelp: false,
        },
    ],
    checker: [

    ],
    updater: [

    ],
    next: {
        visible: true, // which progress state has to be true
        click: 'step0' // which progress state is set to true after click
    }
}
