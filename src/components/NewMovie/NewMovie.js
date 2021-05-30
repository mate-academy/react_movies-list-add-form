import React, { Component } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    if (!title || title.startsWith(' ')) {
      return;
    }

    if (!description || description.startsWith(' ')) {
      return;
    }

    if (!imgUrl || imgUrl.startsWith(' ')) {
      return;
    }

    if (!imdbUrl || imdbUrl.startsWith(' ')) {
      return;
    }

    if (!imdbId || imdbId.startsWith(' ')) {
      return;
    }
    // eslint-disable-next-line
    this.props.addMovie(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="submitForm">
        <input
          className={classNames(
            'submitForm__form',
            { submitForm__active: this.state.title !== '' },
          )}
          type="text"
          placeholder="title"
          value={this.state.title}
          onChange={(event) => {
            this.setState({
              title: event.target.value,
            });
          }}
        />
        <input
          className={classNames(
            'submitForm__form',
            { submitForm__active: this.state.description !== '' },
          )}
          type="text"
          placeholder="description"
          value={this.state.description}
          onChange={(event) => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <input
          className={classNames(
            'submitForm__form',
            { submitForm__active: this.state.imgUrl !== '' },
          )}
          type="url"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={(event) => {
            this.setState({
              imgUrl: event.target.value,
            });
          }}
        />
        <input
          className={classNames(
            'submitForm__form',
            { submitForm__active: this.state.imdbUrl !== '' },
          )}
          type="url"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={(event) => {
            this.setState({
              imdbUrl: event.target.value,
            });
          }}
        />
        <input
          className={classNames(
            'submitForm__form',
            { submitForm__active: this.state.imdbId !== '' },
          )}
          type="url"
          placeholder="imdbId"
          value={this.state.imdbId}
          onChange={(event) => {
            this.setState({
              imdbId: event.target.value,
            });
          }}
        />
        <button type="submit" className="formButton">
          Add movie
        </button>
      </form>
    );
  }
}
