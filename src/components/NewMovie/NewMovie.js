import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  };

  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.props.addMovie(
            {
              title: this.state.title,
              description: this.state.description,
              imgUrl: this.state.imgUrl,
              imdbUrl: this.state.imdbUrl,
              imdbId: this.state.imdbId,
            },
          );
        }}
      >
        <label>
          Title:
          <input
            className="addInfoBar"
            id="Title"
            placeholder="Title"
            onChange={event => this.setState({ title: event.target.value })}
            required
          />
        </label>
        <label>
          Image url:
          <input
            className="addInfoBar"
            placeholder="Image url"
            onChange={event => this.setState({ imgUrl: event.target.value })}
            required
          />
        </label>
        <label>
          imdbUrl:
          <input
            className="addInfoBar"
            placeholder="imdbUrl"
            onChange={event => this.setState({ imdbUrl: event.target.value })}
            required
          />
        </label>
        <label>
          imdbId:
          <input
            className="addInfoBar"
            placeholder="imdbId"
            onChange={event => this.setState({ imdbId: event.target.value })}
            required
          />
        </label>
        <label>
          Description*:
          <textarea
            className="addInfoBar description"
            placeholder="Description*"
            onChange={event => this.setState({
              description: event.target.value,
            })}
          />
        </label>
        <button
          type="submit"
          className="submitButton"
        >
          Submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
