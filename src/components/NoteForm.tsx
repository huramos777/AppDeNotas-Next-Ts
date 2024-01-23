"use client";
import { useState } from "react";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/api/notes", {
          method: "POST",
          body: JSON.stringify({ title, content }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
      }}
      className="w-full max-w-sm mx-auto my-4 p-4"
    >
      <input
        type="text"
        placeholder="Title"
        name="title"
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
      />
      <textarea
        name="content"
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
      ></textarea>
      <button
        type="submit"
        className=" px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
