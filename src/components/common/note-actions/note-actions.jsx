import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import LabelIcon from '@material-ui/icons/Label';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton} from 'components/common';
import {TagsSelector} from './components';


const NoteActionsContainer = styled.div`
  display: flex;
`;
export class NoteActions extends React.PureComponent {
  static propTypes = {
    noteId: PropTypes.string.isRequired,
    noteTags: PropTypes.arrayOf(PropTypes.string),
    archived: PropTypes.bool,
    deleted: PropTypes.bool,
    editNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    archiveNote: PropTypes.func.isRequired,
    recoveryNote: PropTypes.func.isRequired,
    toggleTag: PropTypes.func,
  };

  state = {
    anchorEl: null,
  };

  render() {
    const {
      archived,
      deleted,
      noteTags,
    } = this.props;

    return (
      <NoteActionsContainer>
         <IconButton
          icon={EditIcon}
          size="small"
          tooltip="Edit"
          onClick={this.handleEditNote}
        />
        <IconButton
          icon={LabelIcon}
          size="small"
          tooltip="Add tag"
          onClick={this.handleAddNoteTag}
        />
        {!archived && (
          <IconButton
            icon={ArchiveIcon}
            size="small"
            tooltip="Archive note"
            onClick={this.handleArchiveNote}
          />
        )}
        {archived && (
          <IconButton
            icon={UnarchiveIcon}
            size="small"
            tooltip="Unarchive note"
            onClick={this.handleRecoveryNote}
          />
        )}
        {!deleted && (
          <IconButton
            icon={DeleteIcon}
            size="small"
            tooltip="Delete note"
            onClick={this.handleDeleteNote}
          />
        )}
        {deleted && (
          <IconButton
            icon={UndoIcon}
            size="small"
            tooltip="Recovery note"
            onClick={this.handleRecoveryNote}
          />
        )}
        <TagsSelector
          selectedTags={noteTags}
          anchorEl={this.state.anchorEl}
          toggleTag={this.handleToggleTag}
          closeTagsSelector={this.handleCloseTagsSelector}
        />
      </NoteActionsContainer>
    );
  }

  handleArchiveNote = () => {
    this.props.archiveNote(this.props.noteId);
  }

  handleDeleteNote = () => {
    this.props.deleteNote(this.props.noteId);
  }

  handleRecoveryNote = () => {
    this.props.recoveryNote(this.props.noteId);
  }

  handleAddNoteTag = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  handleCloseTagsSelector = () => {
    this.setState({anchorEl: null});
  };

  handleToggleTag = (tag) => {
    this.props.toggleTag(this.props.noteId, tag);
  }

  handleEditNote = () => {
    this.props.editNote(this.props.noteId);
  }
}
