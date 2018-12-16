import React from 'react';

import api from 'api';

import {ACTIVE_NOTES} from 'models';

const {tags: tagsAPI} = api;

export default function AppServiceContainer(App) {
  return class extends React.Component {
    state = {
      tags: [],
      activeTags: [],
      activeNotesType: ACTIVE_NOTES,
      isChangingTags: false,
    };

    render() {
      const {
        tags,
        activeTags,
        activeNotesType,
        isChangingTags,
      } = this.state;

      return (
        <App
          {...this.props}
          activeNotesType={activeNotesType}
          selectActiveNotesType={this.selectActiveNotesType}
          tags={tags}
          activeTags={activeTags}
          toggleTag={this.toggleTag}
          toggleChangingTags={this.toggleChangingTags}
          updateActiveTags={this.updateActiveTags}
          isChangingTags={isChangingTags}
          createTag={this.createTag}
          deleteTag={this.deleteTag}
          changeTag={this.changeTag}
        />
      );
    }

    componentDidMount = () => {
      this.fetchTags();
    }

    selectActiveNotesType = (activeNotesType) => {
      this.setState({activeNotesType});
    }

    toggleTag = (tag) => {
      const {activeTags} = this.state;

      if (activeTags.includes(tag)) {
        const tagIndex = activeTags.indexOf(tag);
        this.setState({
          activeTags: [...activeTags.slice(0, tagIndex), ...activeTags.slice(tagIndex + 1)]
        });
        return;
      }

      this.setState({activeTags: [...activeTags, tag]});
    }

    toggleChangingTags = () => {
      this.setState((state) => ({
        isChangingTags: !state.isChangingTags
      }));
    }

    updateActiveTags = (activeTags) => {
      this.setState({activeTags})
    }

    deleteTag = (tag) => {
      tagsAPI.deleteTag(tag);
      this.fetchTags();
    }

    createTag = (tag) => {
      tagsAPI.createTag(tag);
      this.fetchTags();
    }

    changeTag = (oldTag, newTag) => {
      tagsAPI.changeTag(oldTag, newTag);
      this.fetchTags();
    }

    fetchTags() {
      const tags = tagsAPI.getTags();
      this.setState(({activeTags}) => ({
        tags,
        activeTags: activeTags.filter(activeTag => tags.includes(activeTag)),
      }));
    }
  }
}
