import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import Chip from '@material-ui/core/Chip';

const StyledChip = styled(Chip).attrs({
  classes: {
    root: 'root',
    deleteIcon: 'deleteIcon'
  }
})`
  &.root {
    height: 24px;
    margin: 2px;
  }

  .deleteIcon {
    width: 18px;
    height: 18px;
  }
`;

export default class NoteTag extends React.PureComponent {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  render() {
    const {tag} = this.props;

    return (
      <StyledChip
        label={tag}
        onDelete={this.handleOnDelete}
        onClick={this.handleOnClick}
      />
    );
  }

  handleOnDelete = () => {
    this.props.onDelete(this.props.tag);
  }

  handleOnClick = () => {
    this.props.onClick(this.props.tag);
  }
}
