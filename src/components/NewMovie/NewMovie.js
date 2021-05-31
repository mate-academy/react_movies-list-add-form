import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',

    errorTitle: false,
    errorDesc: false,
    errorImg: false,
    errorImdb: false,
  };

  SubmitCheck = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl } = this.state;

    this.setState({
      errorTitle: !title,
      errorDesc: !description,
      errorImg: !imgUrl,
      errorImdb: !imdbUrl,
    });

    if (!title || !description || !imgUrl || !imdbUrl) {
      return;
    }

    this.props.onAdd(title, description, imgUrl, imdbUrl);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      errorTitle,
      errorDesc,
      errorImg,
      errorImdb,
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

        <button type="submit">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
