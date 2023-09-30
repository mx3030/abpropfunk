import img1 from '/img/task2/papier.jpg'
import img2 from '/img/task2/waage.jpg'
import img3 from '/img/task2/lineal.jpg'

export const step0_initSol = {}
export const step0_data = {
    heading: {text: "Station 2 - Strategisches Zählen" },
    materials: [
        {name: 'Papierstapel',  src: img1 },
        {name: 'Waage',    src: img2 },
        {name: 'Lineal',    src: img3 },
    ],
    instructions: [
        { 
            text: "In dieser Aufgabe wollen wir eine Methode kennenlernen um schnell eine große Anzahl von gleichen Objekten abschätzen zu können. Folgende Materialien werden benötigt:",
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
