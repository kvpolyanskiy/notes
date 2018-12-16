import uuidv1 from 'uuid/v1';
import _intersection from 'lodash/intersection';

import {
  setWrapper,
  getWrapper,
} from '../base';

const basePath = 'notes';

const filterByTags = (notes, tags) => {
  if (!tags || tags.length === 0) {
    return notes;
  }

  return notes.filter(note => _intersection(tags, note.tags).length > 0);
};

export const notesAPICreator = ({
  setWrapper,
  getWrapper,
  filterByTags,
}) => ({
  getAllNotes() {
    return Object.values(getWrapper(basePath) || {})
  },

  updateAllNotes(notes) {
    setWrapper({
      basePath,
      value: notes.reduce((acc, note) => {
        acc[note.id] = note;
        return acc;
      }, {}),
    });
  },

  getNotes(tags) {
    const notes = Object.values(getWrapper(basePath) || {})
      .filter(note => !note.archived && !note.deleted);

    return filterByTags(notes, tags);
  },

  getArchivedNotes(tags) {
    const notes = Object.values(getWrapper(basePath) || {})
      .filter(note => note.archived && !note.deleted);

    return filterByTags(notes, tags);
  },

  getDeletedNotes(tags) {
    const notes = Object.values(getWrapper(basePath) || {})
      .filter(note => note.deleted);

    return filterByTags(notes, tags);
  },

  getNodeById(noteId) {
    return getWrapper(basePath, noteId);
  },

  addNote(note) {
    const id = uuidv1();
    setWrapper({
      basePath,
      path: id,
      value: {
        ...note,
        id,
      },
    });
  },

  updateNote(noteId, note) {
    setWrapper({
      basePath,
      path: noteId,
      value: note,
    });
  },

  archiveNote(noteId) {
    const note = this.getNodeById(noteId);

    this.updateNote(noteId, {
      ...note,
      archived: true,
      deleted: false,
    });
  },

  deleteNote(noteId) {
    const note = this.getNodeById(noteId);

    this.updateNote(noteId, {
      ...note,
      deleted: true,
      archived: false,
    });
  },

  recoveryNote(noteId) {
    const note = this.getNodeById(noteId);

    this.updateNote(noteId, {
      ...note,
      deleted: false,
      archived: false,
    });
  }
});

export default notesAPICreator({
  setWrapper,
  getWrapper,
  filterByTags,
});
