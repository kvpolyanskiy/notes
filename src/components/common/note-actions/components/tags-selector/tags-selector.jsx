import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import Popover from '@material-ui/core/Popover';

import api from 'api';

import {TagsSelectorRow} from '../tags-selector-row';

const {tags: tagsAPI} = api;

const TagsSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

export class TagsSelector extends React.Component {
  static propTypes = {
    anchorEl: PropTypes.object,
    selectedTags: PropTypes.arrayOf(PropTypes.string),
    toggleTag: PropTypes.func.isRequired,
    closeTagsSelector: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedTags: [],
  };

  state = {
    tags: [],
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.anchorEl && !prevProps.anchorEl) {
      const tags = tagsAPI.getTags();
      this.setState({tags});
    }
  }

  render() {
    const {
      anchorEl,
      selectedTags,
      toggleTag,
      closeTagsSelector,
    } = this.props;

    const {tags} = this.state;

    if (tags.length === 0) {
      return null;
    }

    return (
      <Popover
        id="tags-selector"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeTagsSelector}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <TagsSelectorContainer>
          {tags.map(tag => (
            <TagsSelectorRow
              key={tag}
              tag={tag}
              selected={selectedTags.includes(tag)}
              toggleTag={toggleTag}
            />
          ))}
        </TagsSelectorContainer>
      </Popover>
    )
  }
}
