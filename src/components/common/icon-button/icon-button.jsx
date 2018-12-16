import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip';
import MuiIconButton from '@material-ui/core/IconButton';

export class IconButton extends React.PureComponent {

  static propTypes = {
    icon: PropTypes.func.isRequired,
    size: PropTypes.oneOf([
      'default',
      'small',
      'large',
    ]),
    tooltip: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  }

  render() {
    const {
      icon: Icon,
      size,
      tooltip,
      disabled,
    } = this.props;

    return (
      <Tooltip
          title={tooltip || ''}
          disableHoverListener={!tooltip}
          disableFocusListener={!tooltip}
          disableTouchListener={!tooltip}
        >
          <div>
            <MuiIconButton
              disabled={disabled}
              onClick={this.handleOnClick}
            >
              <Icon fontSize={size} />
            </MuiIconButton>
          </div>
        </Tooltip>
    );
  }

  handleOnClick = (event) => {
    event.stopPropagation();
    this.props.onClick(event);
  }
}
