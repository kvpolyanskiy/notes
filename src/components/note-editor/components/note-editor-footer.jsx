import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import {NoteActions} from 'components/common';

const NoteEditorFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NoteEditorFooter = ({
  noteId,
  noteTags,
  archived,
  deleted,
  onDeleteNote,
  onArchiveNote,
  onRecoveryNote,
  onCancel,
  onSave,
  onToggleNoteTag,
  onEditNote,
}) => {
  return (
    <NoteEditorFooterContainer>
      <NoteActions
        noteId={noteId}
        noteTags={noteTags}
        archived={archived}
        deleted={deleted}
        deleteNote={onDeleteNote}
        archiveNote={onArchiveNote}
        recoveryNote={onRecoveryNote}
        toggleTag={onToggleNoteTag}
        editNote={onEditNote}
      />
      <div>
        <Button onClick={onCancel}>
          {"CANCEL"}
        </Button>
        <Button onClick={onSave}>
          {"SAVE"}
        </Button>
      </div>
    </NoteEditorFooterContainer>
  )
}

NoteEditorFooter.propTypes = {
  noteId: PropTypes.string.isRequired,
  noteTags: PropTypes.arrayOf(PropTypes.string),
  archived: PropTypes.bool,
  deleted: PropTypes.bool,
  onDeleteNote: PropTypes.func.isRequired,
  onArchiveNote: PropTypes.func.isRequired,
  onRecoveryNote: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onEditNote: PropTypes.func.isRequired,
}

export default NoteEditorFooter;
