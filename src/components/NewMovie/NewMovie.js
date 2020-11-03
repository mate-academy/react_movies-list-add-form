import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

function transformText(text) {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  titles = Object.keys(this.state);

  onnAdd = ({ target }) => {
    this.setState({
      [target.name]: transformText(target.value),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;

    this.titles.map(title => (
      this.setState({
        [title]: '',
      })
    ));

    addMovie(this.state);
  }

  render() {
    return (
      <form
        className="new-movie__form"
        onSubmit={this.handleSubmit}
      >
        {this.titles.map(title => (
          <label
            className="new-movie__label"
          >
            {transformText(title)}
            <input
              className="new-movie__input"
              name={title}
              value={this.state[title]}
              title={title}
              required
              onChange={this.onnAdd}
            />
          </label>
        ))}

        <button
          type="submit"
          className="new-movie__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
