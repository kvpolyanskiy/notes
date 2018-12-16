import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import {IconButton} from 'components/common';

import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const TagEditorContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TextFieldContainer = styled.div`
  width: 300px;
`;

export class TagEditor extends React.PureComponent {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    onApply: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  state = {
    value: '',
    editMode: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.value && !prevState.editMode) {
      return {
        value: nextProps.tag,
        editMode: false,
      }
    }

    return null;
  }

  render() {
    const {
      value,
      editMode,
    } = this.state;

    return (
      <TagEditorContainer>
        <TextFieldContainer>
          {editMode && (
            <Input
              value={value}
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
              placeholder="tag name"
              fullWidth
            />
          )}
          {!editMode && (
            <Typography>
              {value}
            </Typography>
          )}
        </TextFieldContainer>
        <IconButton
          onClick={this.handleOnEdit}
          tooltip="Edit"
          icon={EditIcon}
        />
        <IconButton
          onClick={this.handleOnApply}
          disabled={!value.trim()}
          tooltip="Apply"
          icon={DoneIcon}
        />
        <IconButton
          onClick={this.handleOnDelete}
          tooltip="Delete"
          icon={DeleteIcon}
        />
      </TagEditorContainer>
    );
  }

  handleOnEdit = () => {
    this.setState({editMode: true});
  }

  handleOnApply = () => {
    this.props.onApply(this.props.tag, this.state.value);
    this.setState({value: ''});
  }

  handleOnDelete = () => {
    this.props.onDelete(this.props.tag);
  }

  handleOnChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleOnBlur = () => {
    this.setState({
      editMode: false,
    });
  }
}
