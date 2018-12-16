import React from 'react';
import {WithTheme} from 'components/common';

export const WithThemeDecorator = storyFn => (
  <WithTheme>
    {storyFn()}
  </WithTheme>
);
