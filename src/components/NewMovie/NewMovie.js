import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {};

  writeData(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  render() {
    return (
      <form className="form">
        <label
          htmlFor="title"
          className="form__label"
        >
          <h3 className="form__heading">Movie title</h3>
          <input
            id="title"
            className="form__input"
            placeholder="Enter new movie title"
            autoComplete="off"
            required
            onKeyUp={(event) => {
              this.writeData(event);
            }}
          />
        </label>

        <label
          htmlFor="description"
          className="form__label"
        >
          <h3 className="form__heading">Movie description</h3>
          <input
            id="description"
            className="form__input"
            placeholder="Enter new movie description"
            autoComplete="off"
            required
            onKeyUp={(event) => {
              this.writeData(event);
            }}
          />
        </label>

        <label
          htmlFor="imgUrl"
          className="form__label"
        >
          <h3 className="form__heading">Movie image link</h3>
          <input
            id="imgUrl"
            className="form__input"
            placeholder="Enter new movie image link"
            autoComplete="off"
            required
            onKeyUp={(event) => {
              this.writeData(event);
            }}
          />
        </label>

        <label
          htmlFor="imdbUrl"
          className="form__label"
        >
          <h3 className="form__heading">Movie IMBD link</h3>
          <input
            id="imdbUrl"
            className="form__input"
            placeholder="Enter new movie IMBD link"
            autoComplete="off"
            required
            onKeyUp={(event) => {
              this.writeData(event);
            }}
          />
        </label>

        <label
          htmlFor="imdbId"
          className="form__label"
        >
          <h3 className="form__heading">Movie IMBD id</h3>
          <input
            id="imdbId"
            className="form__input"
            placeholder="Enter new movie IMBD id"
            autoComplete="off"
            required
            onKeyUp={(event) => {
              this.writeData(event);
            }}
          />
        </label>

        <button
          type="submit"
          className="form__addmovie"
          disabled={!this.state.title
          || !this.state.description
          || !this.state.imgUrl
          || !this.state.imdbUrl
          || !this.state.imdbId}
          onClick={(event) => {
            event.preventDefault();

            this.props.handler(this.state);

            document.querySelectorAll('.form__input').forEach((element) => {
              const input = element;

              input.value = '';
              this.setState({ [input.id]: '' });
            });
          }}
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  handler: PropTypes.func.isRequired,
};
