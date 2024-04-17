import React, { HTMLAttributes, Reducer, useReducer } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

const Box = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Box(props, ref) {
  const { className, children, ...otherProps } = props;

  return (
    <div ref={ref} className={clsx("w-[300px]", "h-[300px]", "bg-white", "rounded-lg", className)} {...otherProps}>
      {children}
    </div>
  );
});

const Draggable: React.FC = () => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: "draggable",
  });

  return (
    <Box
      className={clsx("transition-opacity", isDragging ? "shadow-lg" : "shadow-2xl")}
      style={{
        transform: CSS.Transform.toString(transform),
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    />
  );
};

interface DroppableProps {
  id: string;
  onDrop?: () => void;
  element: {
    seatId: string;
  };
}

const Droppable: React.FC<DroppableProps> = (props) => {
  const { id, element } = props;
  const isDropped = element.seatId === id;
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      className={clsx(
        "w-[300px]",
        "h-[300px]",
        "box-content",
        "p-2",
        "border-dashed",
        "border-4",
        !isDropped && "border-gray-400",
        "rounded-lg"
      )}
      ref={setNodeRef}
    >
      {id === element.seatId ? <Draggable /> : null}
    </div>
  );
};

const Page: React.FC = () => {
  const [state, dispatch] = useReducer<Reducer<{ seatId: string }, { type: string }>>(
    (state, action) => {
      switch (action.type) {
        case "to-left":
          return { seatId: "left" };
        case "to-right":
          return { seatId: "right" };
        default:
          return state;
      }
    },
    { seatId: "left" }
  );

  return (
    <DndContext
      onDragEnd={(event) => {
        event.over?.id && dispatch({ type: `to-${event.over.id}` });
      }}
    >
      <div className="p-36 flex h-full w-full items-center justify-between">
        <Droppable id="left" element={state} onDrop={() => dispatch({ type: "to-left" })} />
        <div className="text-[3.23rem] text-nowrap">
          {state.seatId === "right" && "<"}---{state.seatId === "left" && ">"}
        </div>
        <Droppable id="right" element={state} onDrop={() => dispatch({ type: "to-right" })} />
      </div>
    </DndContext>
  );
};

export default Page;
