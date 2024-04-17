import React, { Reducer, useReducer } from "react";
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import clsx from "clsx";

const Draggable: React.FC = () => {
  const [, drag] = useDrag(() => ({
    type: "draggable",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className="w-[300px] h-[300px] bg-white shadow-lg rounded-lg cursor-pointer"
      ref={(node) => {
        drag(node);
      }}
    ></div>
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
  const { id, element, onDrop = () => {} } = props;
  const isDropped = element.seatId === id;
  const [, drop] = useDrop(() => ({
    accept: "draggable",
    drop: onDrop,
  }));

  return (
    <div
      className={clsx(
        `w-[300px]`,
        `h-[300px]`,
        `box-content`,
        `p-2`,
        `border-dashed`,
        `border-4`,
        isDropped && `border-gray-400`,
        `rounded-lg`
      )}
      ref={(node) => {
        drop(node);
      }}
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
    <DndProvider backend={HTML5Backend}>
      <div className="p-36 flex h-full w-full items-center justify-between">
        <Droppable id="left" element={state} onDrop={() => dispatch({ type: "to-left" })} />
        <div className="text-[3.23rem] text-nowrap">
          {state.seatId === "right" && "<"}---{state.seatId === "left" && ">"}
        </div>
        <Droppable id="right" element={state} onDrop={() => dispatch({ type: "to-right" })} />
      </div>
    </DndProvider>
  );
};

export default Page;
