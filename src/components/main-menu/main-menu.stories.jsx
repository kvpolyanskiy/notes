import React from 'react';
import {storiesOf} from '@storybook/react';

import {WithThemeDecorator} from 'storybook';

import {MainMenu} from './main-menu';
import {NOTES} from 'models';

const tags = ['first', 'second', 'third'];

storiesOf('Components/MainMenu', module)
  .addDecorator(WithThemeDecorator)
  .add('default', () => (
    <MainMenu
      tags={tags}
    />
  ))
  .add('with active tags', () => (
    <MainMenu
      tags={tags}
      activeTags={tags}
    />
  ))
  .add('with active menu', () => (
    <MainMenu
      tags={tags}
      activeMenu={Object.keys(NOTES)[1]}
    />
  ));
