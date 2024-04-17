import React, { useState } from "react";
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Cross2Icon } from "@radix-ui/react-icons";

interface DraggableProps {
  disableDrag?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

const Draggable: React.FC<DraggableProps> = (props) => {
  const { disableDrag = false, clearable = false, onClear = () => {} } = props;
  const [, drag] = useDrag(() => ({
    type: "draggable",
  }));
  return (
    <div
      className="w-[300px] h-[300px] bg-white shadow-lg rounded-lg cursor-pointer"
      ref={(node) => {
        if (!disableDrag) {
          drag(node);
        }
      }}
    >
      {clearable && (
        <div className="w-full h-full flex items-center justify-center text-[80px]">
          <Cross2Icon onClick={() => onClear()} width={"1em"} height={"1em"} />
        </div>
      )}
    </div>
  );
};

const Droppable: React.FC = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [, drop] = useDrop(() => ({
    accept: "draggable",
    drop: () => setIsDropped(true),
  }));

  return (
    <div
      className="w-[300px] h-[300px] box-content p-2 border-dashed border-4 border-gray-400 rounded-lg"
      ref={(node) => {
        drop(node);
      }}
    >
      {isDropped ? <Draggable disableDrag clearable onClear={() => setIsDropped(false)} /> : null}
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-36 flex h-full w-full items-center justify-between">
        <Draggable />
        <div className="text-[3.23rem] text-nowrap">---&gt;</div>
        <Droppable />
      </div>
    </DndProvider>
  );
};

export default Page;
