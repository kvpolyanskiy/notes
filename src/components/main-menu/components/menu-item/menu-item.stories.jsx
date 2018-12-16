import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import { action } from '@storybook/addon-actions';

import {WithThemeDecorator} from 'storybook';

import NotesIcon from '@material-ui/icons/Notes';

import {MenuItem} from './menu-item';

const selectActiveNotesType = action('selectActiveNotesType');
const toggleTag = action('toggleTag');
const changeTags= action('toggleTag');

storiesOf('Components/MainMenu/Components/MenuItem', module)
  .addDecorator(host({
    width: '280px',
    align: 'left'
  }))
  .addDecorator(WithThemeDecorator)
  .add('default', () => (
    <MenuItem
      title="Notes"
      icon={NotesIcon}
      selectActiveNotesType={selectActiveNotesType}
      toggleTag={toggleTag}
      changeTags={changeTags}
    />
  ))
  .add('active', () => (
    <MenuItem
      title="Notes"
      icon={NotesIcon}
      active
      selectActiveNotesType={selectActiveNotesType}
      toggleTag={toggleTag}
      changeTags={changeTags}
    />
  ));
