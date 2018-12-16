import _uniq from 'lodash/uniq';

import {
  setWrapper,
  getWrapper,
} from '../base';

import NotesAPI from '../notes/notes';

const basePath = 'tags';

const tagsAPICreator = ({
  setWrapper,
  getWrapper,
  NotesAPI,
}) => ({
  getTags() {
    return getWrapper(basePath) || [];
  },

  createTag(tag) {
    const tags = this.getTags();
    setWrapper({
      basePath,
      value: _uniq([...tags, tag]),
    });
  },

  deleteTag(tagToRemove) {
    const tags = this.getTags();

    setWrapper({
      basePath,
      value: tags.filter(tag => tag !== tagToRemove),
    });

    const notes = NotesAPI
      .getAllNotes()
      .map(note => ({
        ...note,
        tags: note.tags.filter(tag => tag !== tagToRemove),
      }));

    NotesAPI.updateAllNotes(notes);
  },

  changeTag(oldTag, newTag) {
    const tags = this.getTags();

    const tagIndex = tags.indexOf(oldTag);

    if (tagIndex < 0) {
      return;
    }

    setWrapper({
      basePath,
      value: [
        ...tags.slice(0, tagIndex),
        newTag,
        ...tags.slice(tagIndex + 1)
      ],
    });

    const notes = NotesAPI
      .getAllNotes()
      .map(note => ({
        ...note,
        tags: note.tags.map(tag => tag === oldTag ? newTag : tag),
      }));

    NotesAPI.updateAllNotes(notes);
  }
});

export default tagsAPICreator({
  setWrapper,
  getWrapper,
  NotesAPI,
});
