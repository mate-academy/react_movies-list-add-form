import React, { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    newTitle: '',
    hasTitleError: false,

    newDescription: '',

    newImgUrl: '',
    hasImgError: false,

    newImdbUrl: '',
    hasImdbUrlError: false,

    newImdbId: '',
    hasIdError: false,
  };

  handleTitleChange = (event) => {
    this.setState({
      newTitle: event.target.value,
      hasTitleError: false,
    });
  }

  handleDescriptionChange = (event) => {
    this.setState({
      newDescription: event.target.value,
    });
  }

  handleImgUrlChange = (event) => {
    this.setState({
      newImgUrl: event.target.value,
      hasImgError: false,
    });
  }

  handleImdbUrlChange = (event) => {
    this.setState({
      newImdbUrl: event.target.value,
      hasImdbUrlError: false,
    });
  }

  handleImdbIdChange = (event) => {
    this.setState({
      newImdbId: event.target.value,
      hasIdError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      newTitle,
      newDescription,
      newImgUrl,
      newImdbUrl,
      newImdbId,
    } = this.state;

    this.setState(state => ({
      hasTitleError: !state.newTitle,
      hasImgError: !state.newImgUrl,
      hasImdbUrlError: !state.newImdbUrl,
      hasIdError: !state.newImdbId,
    }));

    if (!newTitle) {
      return;
    }

    if (!newImgUrl) {
      return;
    }

    if (!newImdbUrl) {
      return;
    }

    if (!newImdbId) {
      return;
    }

    this.props.onAdd(
      newTitle,
      newDescription,
      newImgUrl,
      newImdbUrl,
      newImdbId,
    );

    this.setState({
      newDescription: '',
      newTitle: '',
      newImgUrl: '',
      newImdbUrl: '',
      newImdbId: '',
    });
  };

  render() {
    const {
      newTitle,
      newDescription,
      newImgUrl,
      newImdbUrl,
      newImdbId,
      hasTitleError,
      hasImgError,
      hasImdbUrlError,
      hasIdError,
    } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <h2>Add new movie</h2>
        <div>
          <input
            type="text"
            placeholder="Movie title"
            value={newTitle}
            onChange={this.handleTitleChange}
            className={classNames(`area`, {
              error: hasTitleError,
            })}
          />
          {hasTitleError && (
            <span style={{ color: 'red' }}>Please enter the title</span>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Movie description"
            value={newDescription}
            onChange={this.handleDescriptionChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Movie image"
            value={newImgUrl}
            onChange={this.handleImgUrlChange}
            className={classNames(`area`, {
              error: hasImgError,
            })}
          />
          {hasImgError && (
            <span style={{ color: 'red' }}>Please enter the image url</span>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Movie link"
            value={newImdbUrl}
            onChange={this.handleImdbUrlChange}
            className={classNames(`area`, {
              error: hasImdbUrlError,
            })}
          />
          {hasImdbUrlError && (
            <span style={{ color: 'red' }}>Please enter the movie url</span>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Movie id"
            value={newImdbId}
            onChange={this.handleImdbIdChange}
            className={classNames(`area`, {
              error: hasIdError,
            })}
          />
          {hasIdError && (
            <span style={{ color: 'red' }}>Please enter the id</span>
          )}
        </div>

        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
