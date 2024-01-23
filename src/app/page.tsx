import NoteCard from "@/components/NoteCard";
import NoteForm from "@/components/NoteForm";

const loadNotes = async () => {
  const res = await fetch("http://localhost:3000/api/notes");
  const notes = await res.json();

  return notes;
};

const HomePage = async () => {
  const notes = await loadNotes();

  return (
    <div className="container mx-auto p-4">
      <NoteForm />
      {notes.map((note: any) => (
        <div key={note.id}>
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
