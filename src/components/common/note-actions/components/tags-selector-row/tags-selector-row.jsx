import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export class TagsSelectorRow extends React.PureComponent {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    toggleTag: PropTypes.func.isRequired,
  };

  render() {
    const {
      tag,
      selected,
    } = this.props;

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={selected}
            onChange={this.handleOnChange}
          />
        }
        label={tag}
      />
    )
  }

  handleOnChange = (event) => {
    event.stopPropagation();
    this.props.toggleTag(this.props.tag);
  }
}
