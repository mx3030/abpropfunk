// css
import { TextBlock, WordBox, WordWrapper } from "./style.jsx"
// components
import Droppable from "./droppable.jsx"

export default function SentenceBox({
    marked,
    sentence,
    onDrop
}){
    const _handleDrop = (e,id)=>{
        onDrop(e,id)
    }

    const _renderSentence = ()=>{
        return sentence.map((word,i)=>{
            if(word.type==="word"){
                return (
                    <WordBox data-testid={"word"} key={i}>
                        {word.text}
                    </WordBox>
                )
            }
            
            var bgcolor
            if(marked){
                bgcolor = word.text === word.displayed ? "lightgreen" : "#F77"
            }

            return (
                <Droppable
                    bgcolor={bgcolor}
                    groupName={word.id}
                    key={i}
                    ndx={i}
                    onDrop={_handleDrop}
                >
                    {word.placed ? word.displayed : " "}
                </Droppable>
            )
        })
    }

    return (
        <>
            <TextBlock>
                <WordWrapper>
                    {_renderSentence()}
                </WordWrapper>
            </TextBlock>
        </>
    )
}


