import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',

    errorTitle: false,
    errorDesc: false,
    errorImg: false,
    errorImdb: false,
    errorId: false,
  };

  SubmitCheck = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.setState({
      errorTitle: !title,
      errorDesc: !description,
      errorImg: !imgUrl,
      errorImdb: !imdbUrl,
      errorId: !imdbId,
    });

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    this.props.onAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errorTitle,
      errorDesc,
      errorImg,
      errorImdb,
      errorId,
    } = this.state;

    return (
      <form onSubmit={this.SubmitCheck}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(event) => {
            this.setState({
              title: event.target.value, errorTitle: false,
            });
          }}
        />

        <br />
        {errorTitle && (
          <span style={{ color: 'red' }}>Please enter the Title</span>
        )}
        <br />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(event) => {
            this.setState({
              description: event.target.value, errorDesc: false,
            });
          }}
        />

        <br />
        {errorDesc && (
          <span style={{ color: 'red' }}>Please enter the Description</span>
        )}
        <br />

        <label htmlFor="imgUrl">Film Logo</label>
        <input
          type="url"
          name="imgUrl"
          id="imgUrl"
          value={imgUrl}
          onChange={(event) => {
            this.setState({
              imgUrl: event.target.value, errorImg: false,
            });
          }}
        />

        <br />
        {errorImg && (
          <span style={{ color: 'red' }}>Please enter the correct Url</span>
        )}
        <br />

        <label htmlFor="imdbUrl">Film Url</label>
        <input
          type="url"
          name="imdbUrl"
          id="imdbUrl"
          value={imdbUrl}
          onChange={(event) => {
            this.setState({
              imdbUrl: event.target.value, errorImdb: false,
            });
          }}
        />

        <br />
        {errorImdb && (
          <span style={{ color: 'red' }}>Please enter the correct Url</span>
        )}
        <br />

        <label htmlFor="imdbId">Film Id</label>
        <input
          type="text"
          name="imdbId"
          id="imdbId"
          value={imdbId}
          onChange={(event) => {
            this.setState({
              imdbId: event.target.value, errorId: false,
            });
          }}
        />

        <br />
        {errorId && (
          <span style={{ color: 'red' }}>Please enter the Film Id</span>
        )}
        <br />

        <button type="submit">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
