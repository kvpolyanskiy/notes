import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
  NoteTags,
  NoteActions,
} from 'components/common';

import {NoteModel} from 'models';

const NoteFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NoteContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 240px;
  min-height: 60px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  margin: 16px;
  padding: 8px;
  transition: ${({theme}) => theme.mui.transitions.create(['box-shadow'], {
    easing: theme.mui.transitions.easing.sharp,
    duration: theme.mui.transitions.duration.standart
  })};

  &:hover {
    box-shadow: ${({theme}) => theme.mui.shadows[8]};
  }

  & > *:not(:last-child) {
    margin-bottom: 8px;
  }

  ${NoteFooter} {
    opacity: 0;
    transition: ${({theme}) => theme.mui.transitions.create(['opacity'], {
    easing: theme.mui.transitions.easing.sharp,
    duration: theme.mui.transitions.duration.standart
  })};
  }

  &:hover {
    ${NoteFooter} {
      opacity: 1;
    }
  }
`;

export class Note extends React.PureComponent {
  static propTypes = {
    note: PropTypes.instanceOf(NoteModel),
    editNote: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
    filterByTag: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    archiveNote: PropTypes.func.isRequired,
    recoveryNote: PropTypes.func.isRequired,
    toggleNoteTag: PropTypes.func.isRequired,
  };

  render() {
    const {
      note: {
        id,
        title,
        description,
        tags,
        archived,
        deleted,
      },
      filterByTag,
      editNote,
      deleteNote,
      archiveNote,
      recoveryNote,
      toggleNoteTag,
    } = this.props;

    return (
      <NoteContainer
        elevation={0}
        square
        onClick={this.handleClickOnNote}
      >
        <Typography variant="h6">
          {title}
        </Typography>
        <Typography>
          {description}
        </Typography>
        <NoteTags
          tags={tags}
          onDelete={this.handleDeleteNoteTag}
          onClick={filterByTag}
        />
        <NoteFooter>
          <NoteActions
             noteId={id}
             noteTags={tags}
             archived={archived}
             deleted={deleted}
             editNote={editNote}
             deleteNote={deleteNote}
             archiveNote={archiveNote}
             recoveryNote={recoveryNote}
             toggleTag={toggleNoteTag}
          />
        </NoteFooter>
      </NoteContainer>
    );
  }

  handleDeleteNoteTag = (tag) => {
    this.props.deleteTag(this.props.note.id, tag);
  }
};
