import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import {NoteTags} from 'components/common';
import NoteEditorFooter from './components/note-editor-footer';

import {NoteModel} from 'models';

const NoteEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  min-height: 60px;
  padding: 8px;
`;

const TitleEditor = styled(Input).attrs({
  classes: {input: 'input'}
})`
  .input {
    font-size: 22px;
  }
`;

export class NoteEditor extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    note: PropTypes.instanceOf(NoteModel),
    closeEditor: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
    updateNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    archiveNote: PropTypes.func.isRequired,
    recoveryNote: PropTypes.func.isRequired,
    filterByTag: PropTypes.func.isRequired,
  }

  state = {
    title: '',
    description: '',
    tags: [],
    inEditMode: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {note} = nextProps;

    const {inEditMode} = prevState;

    if (note && !inEditMode) {
      const {
        title,
        description,
        tags,
      } = note;

      return {
        title,
        description,
        tags,
        inEditMode: true
      };
    }

    if (!note && inEditMode) {
      return {
        inEditMode: false,
      };
    }

    return null;
  }

  render() {
    const {
      note,
      closeEditor,
      editNote,
      deleteNote,
      archiveNote,
      recoveryNote,
    } = this.props;

    const {
      title,
      description,
      tags,
      inEditMode,
    } = this.state;

    if (!note) {
      return null;
    }

    const {
      id,
      archived,
      deleted,
    } = note;

    return (
      <Dialog
        open={inEditMode}
        onClose={closeEditor}
      >
        <NoteEditorContainer>
          <TitleEditor
            placeholder="Enter title"
            disableUnderline
            fullWidth
            value={title}
            onChange={this.changeTitle}
          />
          <Input
            placeholder="Enter description"
            value={description}
            disableUnderline
            fullWidth
            multiline
            rows={2}
            rowsMax={10}
            onChange={this.changeDescription}
          />
          <NoteTags
            tags={tags}
            onDelete={this.deleteTag}
            onClick={this.handleFilterByTag}
          />
          <NoteEditorFooter
            noteId={id}
            noteTags={tags}
            archived={archived}
            deleted={deleted}
            onEditNote={editNote}
            onDeleteNote={deleteNote}
            onArchiveNote={archiveNote}
            onRecoveryNote={recoveryNote}
            onCancel={closeEditor}
            onSave={this.handleOnSaveNote}
            onToggleNoteTag={this.handleToggleNoteTag}
          />
        </NoteEditorContainer>
      </Dialog>
    )
  }

  changeTitle = (event) => {
    this.setState({title: event.target.value});
  }

  changeDescription = (event) => {
    this.setState({description: event.target.value});
  }

  deleteTag = (tagToDelete) => {
    this.setState(({tags}) => tags.filter(tag => tag !== tagToDelete));
  }

  handleOnSaveNote = () => {
    const {
      note,
      updateNote,
    } = this.props;

    const {
      title,
      description,
      tags,
    } = this.state;

    updateNote({
      ...note,
      title,
      description,
      tags,
    });
  }

  handleToggleNoteTag = (noteId, tag) => {
    const {tags} = this.state;

    if (tags.includes(tag)) {
      this.setState(() => ({
        tags: tags.filter(item => item !== tag),
      }));
      return;
    }

    this.setState(() => ({
      tags: [...tags, tag],
    }));
  }

  handleFilterByTag = (tag) => {
    this.props.closeEditor();
    this.props.filterByTag(tag);
  }
}
