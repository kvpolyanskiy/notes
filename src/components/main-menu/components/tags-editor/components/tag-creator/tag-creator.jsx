import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from '@material-ui/core/Input';
import {IconButton} from 'components/common';

import DoneIcon from '@material-ui/icons/Done';

import {TextFieldContainer} from '../tag-editor';

const TagCreatorContainer = styled.div`
  display: flex;
  align-items: center;
`;

export class TagCreator extends React.PureComponent {
  static propTypes = {
    onCreate: PropTypes.func.isRequired,
  }

  state = {
    value: '',
  };

  render() {
    const {value} = this.state;

    return (
      <TagCreatorContainer>
        <TextFieldContainer>
          <Input
            value={value}
            onChange={this.handleOnChange}
            placeholder="new tag name"
            fullWidth
          />
        </TextFieldContainer>
        <IconButton
          onClick={this.handleOnCreate}
          disabled={!value.trim()}
          tooltip="Create tag"
          icon={DoneIcon}
        />
      </TagCreatorContainer>
    );
  }

  handleOnCreate = () => {
    this.props.onCreate(this.state.value);
    this.setState({value: ''});
  }

  handleOnChange = (event) => {
    this.setState({value: event.target.value});
  }
}
