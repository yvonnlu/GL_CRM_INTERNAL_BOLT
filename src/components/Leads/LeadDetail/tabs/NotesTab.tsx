import React, { useState } from 'react';
import { Plus, Edit3, Trash2, X, Check, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Lead, Note } from '../../../../utils/loadLeadsData';

interface NotesTabProps {
    lead: Lead;
}

const NotesTab: React.FC<NotesTabProps> = ({ lead }) => {
    const [notes, setNotes] = useState<Note[]>(lead.notes || []);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [newNoteContent, setNewNoteContent] = useState('');
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');

    const handleAddNote = () => {
        if (newNoteContent.trim() === '') return;

        const newNote: Note = {
            id: `note-${Date.now()}`,
            content: newNoteContent,
            createdAt: new Date().toISOString(),
        };

        setNotes([newNote, ...notes]);
        setNewNoteContent('');
        setIsAddingNote(false);
    };

    const handleEditNote = (id: string) => {
        const noteToEdit = notes.find(note => note.id === id);
        if (noteToEdit) {
            setEditingNoteId(id);
            setEditContent(noteToEdit.content);
        }
    };

    const handleSaveEdit = (id: string) => {
        if (editContent.trim() === '') return;

        setNotes(notes.map(note => (note.id === id ? { ...note, content: editContent } : note)));
        setEditingNoteId(null);
        setEditContent('');
    };

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const formatDate = (dateString: string) => {
        try {
            return format(parseISO(dateString), 'MMM d, yyyy h:mm a');
        } catch {
            return 'Unknown date';
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                {!isAddingNote && (
                    <button
                        onClick={() => setIsAddingNote(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Note
                    </button>
                )}
            </div>

            {/* Add Note Form */}
            {isAddingNote && (
                <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-blue-800">New Note</h4>
                        <button
                            onClick={() => {
                                setIsAddingNote(false);
                                setNewNoteContent('');
                            }}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <textarea
                        value={newNoteContent}
                        onChange={e => setNewNoteContent(e.target.value)}
                        placeholder="Enter your note here..."
                        className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        rows={4}
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={handleAddNote}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                            Add Note
                        </button>
                    </div>
                </div>
            )}

            {/* Notes List */}
            {notes.length === 0 ? (
                <p className="text-gray-500 italic">No notes yet. Add one to get started.</p>
            ) : (
                <div className="space-y-4">
                    {notes.map(note => (
                        <div
                            key={note.id}
                            className={`rounded-lg border p-4 ${
                                editingNoteId === note.id
                                    ? 'bg-yellow-50 border-yellow-300'
                                    : 'bg-yellow-50 border-yellow-200'
                            }`}
                        >
                            {editingNoteId === note.id ? (
                                <div>
                                    <textarea
                                        value={editContent}
                                        onChange={e => setEditContent(e.target.value)}
                                        className="w-full p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-3"
                                        rows={4}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setEditingNoteId(null)}
                                            className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md border border-gray-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleSaveEdit(note.id)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 flex items-center"
                                        >
                                            <Check className="w-4 h-4 mr-1" />
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm text-yellow-800 whitespace-pre-line">
                                            {note.content}
                                        </p>
                                        <div className="flex items-center mt-2 text-xs text-yellow-600">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            <span>{formatDate(note.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                        <button
                                            onClick={() => handleEditNote(note.id)}
                                            className="text-yellow-600 hover:text-yellow-800"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteNote(note.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotesTab;
