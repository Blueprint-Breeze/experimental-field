import React from "react";

const Draggable: React.FC = () => {
  return <div className="w-[300px] h-[300px] bg-white shadow-lg rounded-lg cursor-pointer"></div>;
};

const Droppable: React.FC = () => {
  return <div className="w-[300px] h-[300px] box-content p-2 border-dashed border-4 border-gray-400 rounded-lg"></div>;
};

const Page: React.FC = () => {
  return (
    <div className="p-36 flex h-full w-full items-center justify-between">
      <Draggable />
      <div className="text-[3.23rem] text-nowrap">---&gt;</div>
      <Droppable />
    </div>
  );
};

export default Page;
