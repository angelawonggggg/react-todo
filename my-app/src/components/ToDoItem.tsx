import React, { useState } from "react";

type Props = {
  item: string;
  onComplete: () => void;
  onDelete: () => void;
};

export default function ToDoItem(props: Props) {
  const [count, setCount] = useState(1);
  function increment() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>
        <span className="removeButton" onClick={props.onDelete}>Remove</span>
        <span className="button" onClick={props.onComplete}>Done</span>
        <span className="toDoItem" onClick={increment}>
          {props.item}
        </span>
        ({count})
      </p>
    </div>
  );
}
