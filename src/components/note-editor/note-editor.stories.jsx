import React from 'react';
import {storiesOf} from '@storybook/react';

import {NoteEditor} from './note-editor';
import {NoteModel} from 'models';

const note = new NoteModel({
  title: 'Note title',
  description: 'Do dolore elit laboris deserunt ipsum nostrud tempor et anim.',
  tags: ["tag1", "long tag", "tag3"],
});

storiesOf('Components/NoteEditor', module)
  .add('default', () => (
    <NoteEditor
      note={note}
    />
  ));
