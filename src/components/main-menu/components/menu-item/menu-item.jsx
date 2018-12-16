import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 0 20px;
  margin-bottom: 4px;
  height: 40px;
  border-radius: 0 25px 25px 0;
  background-color: ${({theme, active}) => active ? theme.app.colors.activeMenu : 'transparent'};

  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }
`;

const Title = styled(Typography)`
  padding-left: 32px;
`;

export class MenuItem extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const {
      title,
      icon: Icon,
      active,
    } = this.props;

    return (
      <MenuItemContainer
        active={active}
        onClick={this.handleOnClick}
      >
        <Icon color="action" />
        <Title variant="subtitle1">
          {title}
        </Title>
      </MenuItemContainer>
    );
  }

  handleOnClick = () => {
    const {
      id,
      onClick,
    } = this.props;

    onClick(id);
  }
}
