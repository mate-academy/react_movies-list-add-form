import React, { Component } from 'react';
import propTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onChangeHandler = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
    } = this.state;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onAdd({ ...this.state });
          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }}
      >
        <input
          type="text"
          className="input"
          name="title"
          value={title}
          placeholder="Movie title"
          onChange={event => this.onChangeHandler(event)}
        />
        <br />
        <textarea
          type="text"
          className="input textarea"
          name="description"
          value={description}
          placeholder="Movie description"
          onChange={event => this.onChangeHandler(event)}
        />
        <br />
        <input
          type="text"
          className="input"
          name="imgUrl"
          value={imgUrl}
          placeholder="Movie imgUrl"
          onChange={event => this.onChangeHandler(event)}
        />
        <br />
        <input
          type="text"
          className="input"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Movie imdbUrl"
          onChange={event => this.onChangeHandler(event)}
        />
        <br />
        <button
          type="submit"
          className="submit-btn"
        >
          Submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: propTypes.func.isRequired,
};
