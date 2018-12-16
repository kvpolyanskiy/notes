import {configure} from '@storybook/react';

const projectStories = require.context('../src', true, /\.stories\.jsx$/);

function loadStories() {
  projectStories
    .keys()
    .forEach((filename) => {
      projectStories(filename);
    });
}

configure(loadStories, module);
