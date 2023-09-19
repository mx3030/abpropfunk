import { createCoordStart } from '/src/components/geogebra/ggbUtils.jsx'
import { SolvedCloze } from '/src/style.jsx'

export const step3_initSol={}

const clozeText = "Ein <Koordinatensystem> wird verwendet, um eine Zuordnung zwischen zwei verschiedenen Dingen grafisch darzustellen. Ganz allgemein wird dabei einem <x-Wert> von der einen Sache, ein y-Wert von der anderen Sache <zugeordnet> . Man drückt das durch einen <Punkt> im Koordinatensystem aus. Bei unserem Versuch, ist die <Zeit> der x-Wert und das <Wasservolumen> der y-Wert. Die <Beschriftung> der Achsen wird deshalb geändert."
const solvedClozeText = clozeText.replace(/<([^>]+)>/g, `<span 
    style="margin: 2px;
    padding: 0.1em 0.2em;
    background-color:rgb(242, 242, 242)"; 
    border: solid rgb(191, 191, 191) 1px"
>$1</span>`);

export const step3_data = {
    heading: {
        text: "Schritt 3: Grafische Darstellung",
    },

    instructions: [
        {
            text: "In diesem Aufgabenteil, sollen die Messwerte aus Schritt 2 grafisch in dem Koordinatensystem dargestellt werden. Fülle zunächst den folgenden Lückentext aus.",
            display:'true',
            check: 'step3A',
            help: false, 
            displayHelp: false,
            bottomSpace:"20px",
        },
        {
            component: <SolvedCloze dangerouslySetInnerHTML={{ __html: solvedClozeText }}/>,              
            display: 'step3A',
            check: 'false',
            help: false, 
            displayHelp: false,
            bottomSpace: "20px"
        },
        {
            text: "Trage deine Messwerte aus der Tabelle als Punkte in das Koordinatensystem ein. Verwende falls notwendig die Regler um die Achsen des Koordinatensystems anzupassen.",
            display: 'step3A',
            check: 'step3B',
            help: false,
            displayHelp: false, 
        }
    ],

    cloze: {
        text: clozeText,
        display: 'true',
        remove : 'step3A', // remove on progress state
        action: ['Zeit in [min]','Volumen in [ml]'], // action on solve
        updateProgress: 'step3A' // update progress on solve
    },

    ggb: {
        coordStart: createCoordStart([{x:1,y:1},{x:10,y:10}]),
        axislabels: ['x','y'],
        sliderSettings: {left:{ min: 1, max: 1000, step: 1 }, bottom: { min: 1, max: 1000, step: 1}},
        customToolBar: "0|6|1",
    }, 

    checker: [
        {
            after: 'true',
            step: 'step3B', // this step gets checked and solution gets updated
            action: 'comparePointLists', // which checker function to use
            input: ['ggbData','points'], // which deps to use as input
            sol: ['solData','step2B'], // use solution from step2B for checking
            args: [0,0], // use additional arguments specifc for checker function
        },
    ],

    updater: [
        {
            when: 'step3B', // which step has to be set to true for the updater to run
            action: 'createRegression', // which updater function is used
            input: ['solData','step3B'], // which step from solData is used for update
            args: [5], // no arguments 
            ggbRef: true, // ggbRef is needed 
            target: 'regression', // solData step4A is the update target
        },
    ],

    next:{
        visible: 'step3B',
        click: 'step3',
    },
}


