import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {Note} from 'components/note';
import {NoteEditor} from 'components/note-editor';
import NotesListServiceContainer from './note-list-service-container';

import {NoteModel} from 'models';

const NotesListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const AddNoteButton = styled(Fab)`
  && {
    position: absolute;
    bottom: 24px;
    right: 24px;
  }
`;

const NotesListComponent = ({
  notes,
  editingNote,
  updateNote,
  deleteNote,
  archiveNote,
  recoveryNote,
  addNote,
  deleteNoteTag,
  filterByTag,
  startNoteEditing,
  finishNoteEditing,
  toggleNoteTag,
}) => {
  return (
    <NotesListContainer>
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          deleteTag={deleteNoteTag}
          filterByTag={filterByTag}
          editNote={startNoteEditing}
          deleteNote={deleteNote}
          archiveNote={archiveNote}
          recoveryNote={recoveryNote}
          toggleNoteTag={toggleNoteTag}
        />
      ))}
      <AddNoteButton
        color="secondary"
        size="large"
        onClick={addNote}
      >
        <AddIcon />
      </AddNoteButton>
      <NoteEditor
        note={editingNote}
        closeEditor={finishNoteEditing}
        editNote={startNoteEditing}
        updateNote={updateNote}
        deleteNote={deleteNote}
        archiveNote={archiveNote}
        recoveryNote={recoveryNote}
        filterByTag={filterByTag}
      />
    </NotesListContainer>
  );
}

NotesListComponent.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  })),
  editingNote: PropTypes.instanceOf(NoteModel),
  updateNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  finishNoteEditing: PropTypes.func.isRequired,
  startNoteEditing: PropTypes.func.isRequired,
  toggleNoteTag: PropTypes.func.isRequired,
};

export const NotesList = NotesListServiceContainer(NotesListComponent);
