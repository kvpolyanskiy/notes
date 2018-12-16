import React from 'react';
import PropTypes from 'prop-types';

import api from 'api';
import {
  NOTES,
  NOTES_INFO,
  NoteModel,
} from 'models';

const {notes: NotesAPI} = api;

export default function NoteListServiceContainer(NoteList) {
  return class extends React.Component {
    static propTypes = {
      tags: PropTypes.arrayOf(PropTypes.string),
      activeTags: PropTypes.arrayOf(PropTypes.string),
      activeNotesType: PropTypes.oneOf(NOTES),
      updateActiveTags: PropTypes.func.isRequired,
    };

    state = {
      notes: [],
      editingNote: null,
    };

    componentDidMount() {
      this.fetchNotes();
    }

    componentDidUpdate(prevProps) {
      const {
        activeTags: prevActiveTags,
        activeNotesType: prevActiveNotesType,
      } = prevProps;

      const {
        activeTags,
        activeNotesType,
      } = this.props;

      if (prevActiveTags !== activeTags || prevActiveNotesType !== activeNotesType) {
        this.fetchNotes();
      }
    }

    render() {
      const {
        notes,
        editingNote,
      } = this.state;

      return (
        <NoteList
          {...this.props}
          notes={notes}
          editingNote={editingNote}
          updateNote={this.updateNote}
          deleteNote={this.deleteNote}
          archiveNote={this.archiveNote}
          recoveryNote={this.recoveryNote}
          addNote={this.addNote}
          deleteNoteTag={this.deleteNoteTag}
          toggleNoteTag={this.toggleNoteTag}
          startNoteEditing={this.startNoteEditing}
          finishNoteEditing={this.finishNoteEditing}
          filterByTag={this.filterByTag}
        />
      );
    }

    fetchNotes() {
      const {
        activeNotesType,
        activeTags,
      } = this.props;
      const notesInfo = NOTES_INFO[activeNotesType];
      const notes = notesInfo
      .fetch(activeTags)
      .map(note => new NoteModel(note));

      this.setState({notes});
    }

    updateNote = (note) => {
      if (note.id) {
        NotesAPI.updateNote(note.id, note);
      } else {
        NotesAPI.addNote(note);
      }

      this.fetchNotes();
      this.finishNoteEditing();
    }

    deleteNote = (noteId) => {
      NotesAPI.deleteNote(noteId);
      this.fetchNotes();
      this.finishNoteEditing();
    }

    archiveNote = (noteId) => {
      NotesAPI.archiveNote(noteId);
      this.fetchNotes();
      this.finishNoteEditing();
    }

    recoveryNote = (noteId) => {
      NotesAPI.recoveryNote(noteId);
      this.fetchNotes();
      this.finishNoteEditing();
    }

    addNote = () => {
      this.setState({
        editingNote: new NoteModel(),
      });
    }

    finishNoteEditing = () => {
      this.setState({editingNote: null});
    }

    startNoteEditing = (noteId) => {
      const note = NotesAPI.getNodeById(noteId);
      this.setState({
        editingNote: new NoteModel(note),
      });
    }

    deleteNoteTag = (noteId, tagToDelete) => {
      const note = NotesAPI.getNodeById(noteId);
      const tags = note.tags.filter(tag => tag !== tagToDelete);

      this.updateNote({
        ...note,
        tags,
      });
    }

    toggleNoteTag = (noteId, tag) => {
      const note = NotesAPI.getNodeById(noteId);

      if (note.tags.includes(tag)) {
        this.updateNote({
          ...note,
          tags: note.tags.filter(item => item !== tag),
        });

        return;
      }

      this.updateNote({
        ...note,
        tags: [...note.tags, tag],
      });
    }

    filterByTag = (tag) => {
      const {updateActiveTags} = this.props;

      updateActiveTags([tag]);
    }
  }
}
