// css
import { AnswerBlock, AnswerWordWrapper } from "./style.jsx"
// component
import Draggable from './draggable.jsx'

export default function AnswerBox({ answers }){
    const onDragStart = (e, id) => {
        if (e.dataTransfer) {
            e.dataTransfer.setData("text/plain", id);
        }
    };

    return (
        <AnswerBlock>
            <div style={{ textAlign:'center', marginBottom:"20px" }}>
                Bewege die Antworten in die richtigen Lücken.
            </div>
            <AnswerWordWrapper>
                {answers.map(a => (
                    <Draggable
                        bgcolor="rgba(255,255,255,0)"
                        key={a}
                        name={a}
                        onDragStart={onDragStart}
                    />
                ))}
            </AnswerWordWrapper>
        </AnswerBlock>
    )
}
