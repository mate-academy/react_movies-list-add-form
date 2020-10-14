import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleValue = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          this.props.onAdd(event, this.state);
        }}
      >
        <label htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={this.handleValue}
        />

        <label htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={this.handleValue}
        />

        <label htmlFor="imgUrl">
          imgUrl
        </label>
        <input
          type="text"
          name="imgUrl"
          id="imgUrl"
          value={imgUrl}
          onChange={this.handleValue}
        />
        <label htmlFor="imdbUrl">
          imdbUrl
        </label>
        <input
          type="text"
          name="imdbUrl"
          id="imdbUrl"
          value={imdbUrl}
          onChange={this.handleValue}
        />
        <label htmlFor="imdbId">
          imdbId
        </label>
        <input
          type="text"
          name="imdbId"
          id="imdbId"
          value={imdbId}
          onChange={this.handleValue}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
