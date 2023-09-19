// css
import { DraggableWordBox } from "./style.jsx";

export default function Draggable({ name, bgcolor, onDragStart }) {
  const _handleDragStart = e => {
    onDragStart(e, name);
  };

  return (
    <DraggableWordBox
      bgcolor={bgcolor}
      data-testid="answer"
      draggable="true"
      onDragStart={_handleDragStart}
    >
      {name}
    </DraggableWordBox>
  );
}

