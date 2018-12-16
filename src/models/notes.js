import NotesIcon from '@material-ui/icons/Notes';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';

import api from 'api';

export const ACTIVE_NOTES = 'ACTIVE_NOTES';
export const ARCHIVED_NOTES = 'ARCHIVED_NOTES';
export const DELETED_NOTES = 'DELETED_NOTES';

export const NOTES = [
  ACTIVE_NOTES,
  ARCHIVED_NOTES,
  DELETED_NOTES,
];

const {notes: NotesAPI} = api;

export const NOTES_INFO = {
  [ACTIVE_NOTES]: {
    menuTitle: 'Notes',
    icon:  NotesIcon,
    fetch: NotesAPI.getNotes
  },
  [ARCHIVED_NOTES]: {
    menuTitle: 'Archive',
    icon: ArchiveIcon,
    fetch: NotesAPI.getArchivedNotes
  },
  [DELETED_NOTES]: {
    menuTitle: 'Recycle bin',
    icon: DeleteIcon,
    fetch: NotesAPI.getDeletedNotes
  }
};

export class NoteModel {
  constructor(props) {
    Object.assign(this, {
      id: '',
      title: '',
      description: '',
      tags: [],
      archived: false,
      deleted: false,
    }, props);
  }
}
