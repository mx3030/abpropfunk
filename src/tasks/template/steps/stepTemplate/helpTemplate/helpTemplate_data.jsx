export const helpTemplate_initSol={}

export const helpTemplate_data = {
    heading: {
        text: "Test",
    },

    instructions: [
        {
            text: "Temp", // instruction text
            display:'step', // display on which progress step? boolean as strings !
            check: 'step', // display check symbol on which progress step? boolean as strings !
            help: false, // use help react component
            displayHelp: false, // display help on which progess step?
            bottomSpace:"20px", // bottom space
            topSpace: "20px" // top space
        },
    ],
 
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

}


