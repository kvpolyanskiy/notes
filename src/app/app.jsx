import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';

import {WithTheme} from 'components/common';
import {
  MainMenu,
  NotesList,
} from 'components';

import AppServiceContainer from './app-service-container';

import {NOTES} from 'models';

const AppContainer = styled.div`
  display: flex;
  min-width: 1000px;
`;

class App extends React.Component {
  static propTypes = {
    activeNotesType: PropTypes.oneOf(NOTES),
    selectActiveNotesType: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    activeTags: PropTypes.arrayOf(PropTypes.string),
    isChangingTags: PropTypes.bool,
    toggleTag: PropTypes.func.isRequired,
    toggleChangingTags: PropTypes.func.isRequired,
    updateActiveTags: PropTypes.func.isRequired,
    createTag: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
    changeTag: PropTypes.func.isRequired,
  };

  render() {
    const {
      tags,
      activeTags,
      activeNotesType,
      isChangingTags,
      selectActiveNotesType,
      toggleTag,
      toggleChangingTags,
      updateActiveTags,
      createTag,
      deleteTag,
      changeTag,
    } = this.props;

    return (
      <>
        <CssBaseline />
        <WithTheme>
          <AppContainer>
            <MainMenu
              tags={tags}
              activeTags={activeTags}
              activeNotesType={activeNotesType}
              isChangingTags={isChangingTags}
              selectActiveNotesType={selectActiveNotesType}
              toggleTag={toggleTag}
              toggleChangingTags={toggleChangingTags}
              createTag={createTag}
              deleteTag={deleteTag}
              changeTag={changeTag}
            />
            <NotesList
              activeTags={activeTags}
              tags={tags}
              activeNotesType={activeNotesType}
              updateActiveTags={updateActiveTags}
            />
          </AppContainer>
        </WithTheme>
      </>
    );
  }
}

export default AppServiceContainer(App);
