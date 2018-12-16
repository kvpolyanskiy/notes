import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Divider from '@material-ui/core/Divider';
import LabelIcon from '@material-ui/icons/Label';
import EditIcon from '@material-ui/icons/Edit';
import {
  MenuItem,
  MenuGroup,
  TagsEditor,
} from './components';

import {
  NOTES,
  NOTES_INFO,
} from 'models';

const MainMenuContainer = styled.div`
  width: 280px;
`;

export class MainMenu extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    activeTags: PropTypes.arrayOf(PropTypes.string),
    activeNotesType: PropTypes.oneOf(NOTES),
    isChangingTags: PropTypes.bool,
    selectActiveNotesType: PropTypes.func.isRequired,
    toggleTag: PropTypes.func.isRequired,
    toggleChangingTags: PropTypes.func.isRequired,
    createTag: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
    changeTag: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tags: [],
    activeTags: [],
  };

  render() {
    const {
      activeNotesType,
      selectActiveNotesType,
      tags,
      activeTags,
      toggleTag,
      toggleChangingTags,
      isChangingTags,
      createTag,
      deleteTag,
      changeTag,
    } = this.props;

    return (
      <MainMenuContainer>
        <MenuGroup>
          {Object.entries(NOTES_INFO).map(([key, value]) => (
            <MenuItem
              id={key}
              title={value.menuTitle}
              icon={value.icon}
              active={key === activeNotesType}
              key={key}
              onClick={selectActiveNotesType}
            />
          ))}
        </MenuGroup>
        <Divider />
        <MenuGroup title="TAGS">
          {tags.map(tag => (
            <MenuItem
              id={tag}
              title={tag}
              key={tag}
              icon={LabelIcon}
              active={activeTags.includes(tag)}
              onClick={toggleTag}
            />
          ))}
          <MenuItem
            title="Change tags"
            icon={EditIcon}
            onClick={toggleChangingTags}
          />
        </MenuGroup>
        <TagsEditor
          isOpen={isChangingTags}
          tags={tags}
          closeTagsEditor={toggleChangingTags}
          createTag={createTag}
          deleteTag={deleteTag}
          changeTag={changeTag}
        />
      </MainMenuContainer>
    );
  }
}
