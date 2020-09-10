/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './NewMovie.scss';

export class NewMovie extends Component {
  textSaving = (event) => {
    if (event.target.value === ' ') {
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }

    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.props.addMovie(this.state);
          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
          event.target.reset();
        }}
      >
        <label>
          <p>Title:</p>
          <input
            className="form__item"
            type="text"
            name="title"
            onChange={this.textSaving}
            required
          />
        </label>
        <label>
          <p>Description:</p>
          <textarea
            className="form__item"
            name="description"
            rows="5"
            onChange={this.textSaving}
            required
          />
        </label>
        <label>
          <p>imgUrl:</p>
          <input
            className="form__item"
            type="url"
            name="imgUrl"
            onChange={this.textSaving}
            required
          />
        </label>
        <label>
          <p>imdbUrl:</p>
          <input
            className="form__item"
            type="url"
            name="imdbUrl"
            onChange={this.textSaving}
            required
          />
        </label>
        <label>
          <p>imdbId:</p>
          <input
            className="form__item"
            type="text"
            name="imdbId"
            onChange={this.textSaving}
            required
          />
        </label>
        <button type="submit">ADD</button>
      </form>
    );
  }
}
