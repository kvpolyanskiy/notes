import React from 'react';
import {storiesOf} from '@storybook/react';

import {WithTheme} from 'components/common';
import {Note} from './note';

import {NoteModel} from 'models';

const note = new NoteModel({
  title: 'Note title',
  description: 'Do dolore elit laboris deserunt ipsum nostrud tempor et anim.',
  tags: ["tag1", "long tag", "tag3"],
});

storiesOf('Components/Note', module)
  .add('default', () => (
    <WithTheme>
      <Note
        note={note}
      />
    </WithTheme>
  ));
