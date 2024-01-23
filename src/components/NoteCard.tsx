import React from "react";

const NoteCard = ({ note: { title, content } }: { note: any }) => {
  return (
    <div className="container border rounded p-4 bg-slate-700 hover:bg-slate-500 cursor-pointer">
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default NoteCard;
