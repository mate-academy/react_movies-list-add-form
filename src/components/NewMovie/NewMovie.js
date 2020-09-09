/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
  };

  change = (event) => {
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
        }}
      >
        <label>
          <p>Title:</p>
          <input
            className="form__item"
            type="text"
            name="title"
            onChange={this.change}
            required
          />
        </label>
        <label>
          <p>Description:</p>
          <textarea
            className="form__item"
            name="description"
            rows="5"
            onChange={this.change}
            required
          />
        </label>
        <label>
          <p>imgUrl:</p>
          <input
            className="form__item"
            type="url"
            name="imgUrl"
            onChange={this.change}
            required
          />
        </label>
        <label>
          <p>imdbUrl:</p>
          <input
            className="form__item"
            type="url"
            name="imdbUrl"
            onChange={this.change}
            required
          />
        </label>
        <label>
          <p>imdbId:</p>
          <input
            className="form__item"
            type="text"
            name="imdbId"
            onChange={this.change}
            required
          />
        </label>
        <button type="submit">ADD</button>
      </form>
    );
  }
}
