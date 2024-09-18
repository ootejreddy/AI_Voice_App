import VoiceRecorder from "../components/VoiceRecorder";
import NotesList from "../components/NotesList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8">
      <h1 className="text-4xl font-bold mb-8">Voice Notes App</h1>
      <VoiceRecorder />
      <NotesList />
    </main>
  );
}
