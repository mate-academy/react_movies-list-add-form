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
      imdbId,
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
          onChange={this.onChangeHandler}
          required
        />
        <br />
        <textarea
          type="text"
          className="input textarea"
          name="description"
          value={description}
          placeholder="Movie description"
          onChange={this.onChangeHandler}
          required
        />
        <br />
        <input
          type="text"
          className="input"
          name="imgUrl"
          value={imgUrl}
          placeholder="Movie imgUrl"
          onChange={this.onChangeHandler}
          required
        />
        <br />
        <input
          type="text"
          className="input"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Movie imdbUrl"
          onChange={this.onChangeHandler}
          required
        />
        <br />
        <input
          type="text"
          className="input"
          name="imdbId"
          value={imdbId}
          placeholder="Movie ImdbId"
          onChange={this.onChangeHandler}
          required
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
