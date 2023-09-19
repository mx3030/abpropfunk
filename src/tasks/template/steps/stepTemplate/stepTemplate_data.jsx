import { createCoordStart } from '/src/components/geogebra/ggbUtils.jsx'
import { SolvedCloze } from '/src/style.jsx'

const clozeText = "Das ist ein  <Test>."

export const stepTemplate_initSol={}

export const stepTemplate_data = {
    heading: {
        text: "Test",
    },

    instructions: [
        {
            text: "Temp", // instruction text
            display:'true', // display on which progress step? boolean as strings !
            check: 'true', // display check symbol on which progress step? boolean as strings !
            help: false, // use help react component
            displayHelp: false, // display help on which progess step?
            bottomSpace:"20px", // bottom space
            topSpace: "20px" // top space
        },
    ],

    cloze: {
        text: clozeText,
        display: 'false',
        remove : 'step', // remove on progress state
        action: ['x','y'], // arguments for action on solve
        updateProgress: 'step' // update progress on solve
    },

    ggb: {
        coordStart: createCoordStart([{x:1,y:1},{x:10,y:10}]),
        axislabels: ['x','y'],
        sliderSettings: {left:{ min: 1, max: 1000, step: 1 }, bottom: { min: 1, max: 1000, step: 1}},
        customToolBar: "0|6|1",
    }, 

    checker: [
        {
            after: 'true', // after which state checker is activated
            step: 'step', // this step gets checked and solution gets updated
            action: 'checker function', // which checker function to use
            input: ['ggbData','points'], // which deps to use as input
            sol: ['solData','step'], // use solution from step2B for checking
            args: [0,0], // use additional arguments specifc for checker function
            //TODO: stop: 'step' // after which step checker is deactivated/ignored?
        },
    ],

    updater: [
        {
            when: 'step', // which step has to be set to true for the updater to run
            action: 'updater function', // which updater function is used
            input: ['solData','step'], // which step from solData is used for update
            args: [0], // use additional arguments for updater function
            ggbRef: false, // is ggbRef needed for updater function?
            target: 'new solData entry', // what is the new target entry?
        },
    ],

    next:{
        visible: 'step', // on which step to show next step button
        click: 'step', // which progress state to check if button clicked 
    },
}


