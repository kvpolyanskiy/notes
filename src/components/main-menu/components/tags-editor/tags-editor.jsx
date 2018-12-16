import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import {
  TagCreator,
  TagEditor,
} from './components';

export class TagsEditor extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.string),
    changeTag: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
    createTag: PropTypes.func.isRequired,
    closeTagsEditor: PropTypes.func.isRequired,
  };

  render() {
    const {
      isOpen,
      tags,
      closeTagsEditor,
      createTag,
      changeTag,
      deleteTag,
    } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={closeTagsEditor}
      >
      <DialogContent>
        <TagCreator onCreate={createTag} />
        {tags.map(tag => (
          <TagEditor
            key={tag}
            tag={tag}
            onApply={changeTag}
            onDelete={deleteTag}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeTagsEditor}>
          {"Close"}
        </Button>
      </DialogActions>
      </Dialog>
    );
  }
}
