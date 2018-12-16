import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

const MenuGroupContainer = styled.div`
  margin: 8px 0;
`;

const Title = styled(Typography)`
  && {
    margin-left: 20px;
  }
`;

export const MenuGroup = ({title, children}) => {
  return (
    <MenuGroupContainer>
      {title && (
        <Title variant="subtitle1">
          {title}
        </Title>
      )}
      {children}
    </MenuGroupContainer>
  )
};

MenuGroup.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}
