import { HelpButton, OK, VerticalSpace } from '/src/style.jsx'

export default function Instructions({taskHandler, instructions, progressData}){
    const [taskData, setTaskData] = taskHandler;
    
    const toggleInstructionVisibility = (instructions, instructionIndex, isVisible) => {
        const updatedTaskData = { ...taskData };
        instructions[instructionIndex].displayHelp = isVisible;
        setTaskData(updatedTaskData);
    };
    const Instructions = instructions.map((instruction, i) => (
        <div key={i}>
            { progressData[instruction.display] &&
            <div> 
                {instruction.topSpace && <VerticalSpace size={instruction.topSpace}/>}
                <div>
                    {instruction.text}
                    {instruction.inLine ? instruction.component.props.children : instruction.component } {/* i don't understand what the fuck is happening here, but for some reason it works */}
                    {instruction.help  && (<HelpButton onClick={() => toggleInstructionVisibility(instructions, i, !instruction.displayHelp)}>&#x3F;</HelpButton>)}
                    {progressData[instruction.check] && <OK style={{marginLeft:"5px"}}>&#x2713;</OK>} 
                </div> 
                {instruction.displayHelp && (instruction.help ? instruction.help : null)}
                {instruction.bottomSpace && <VerticalSpace size={instruction.bottomSpace}/>}
            </div>
            }    
        </div>
    ));
    
    return <>{Instructions}</>;
};

