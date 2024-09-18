"use client";

import { useState, useEffect } from "react";
import { getDocuments } from "../lib/firebase/firebaseUtils";
import { format } from "date-fns";
import { useNotes } from "../lib/contexts/NotesContext";
import useSWR from "swr";

interface Note {
  id: string;
  text: string;
  timestamp: string;
}

export default function NotesList() {
  const { updateTrigger } = useNotes();

  const fetchNotes = async () => {
    const fetchedNotes = (await getDocuments("notes")) as Note[];
    return fetchedNotes.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const { data: notes, error } = useSWR(["notes", updateTrigger], fetchNotes);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      <ul className="space-y-4">
        {notes?.map((note) => (
          <li key={note.id} className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-800">{note.text}</p>
            <p className="text-sm text-gray-500 mt-2">
              {(() => {
                try {
                  const date = new Date(note.timestamp);
                  if (isNaN(date.getTime())) {
                    throw new Error("Invalid date");
                  }
                  return format(date, "MMMM d, yyyy h:mm a");
                } catch (error) {
                  console.error("Error formatting date:", note.timestamp);
                  return "Invalid Date";
                }
              })()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
