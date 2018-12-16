import React from 'react';
import PropTypes from 'prop-types';

import NoteTag from './components/note-tag';

export const NoteTags = ({
  tags,
  onDelete,
  onClick,
}) => (
  <div>
    {tags.map(tag => (
      <NoteTag
        key={tag}
        tag={tag}
        onDelete={onDelete}
        onClick={onClick}
      />
    ))}
  </div>
);


NoteTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
