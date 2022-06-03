type Props = {
  item: string;
  onComplete: () => void;
  onDelete: () => void;
};

export default function ToDoItem(props: Props) {
  return (
    <div>
      <p>
        <span className="removeButton" onClick={props.onDelete}>
          Remove
        </span>
        <span className="button" onClick={props.onComplete}>
          Done
        </span>
        <span className="toDoItem">{props.item}</span>
      </p>
    </div>
  );
}
