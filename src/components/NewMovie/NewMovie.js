import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component {
  state = { ...defaultForm }

  handleChange = ({ target }) => {
    this.setState(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const movie = { ...this.state };

    this.props.addMovie(movie);

    this.setState({ ...defaultForm });
  }

  setDefaultForm = () => {
    this.setState({ ...defaultForm });
  };

  render() {
    return (
      <form
        className="ui large form"
        onSubmit={this.handleSubmit}
        name="newMovie"
        method="post"
      >
        { Object.entries(this.state).map(([fieldName, value]) => (
          <>
            <label htmlFor="fieldName">
              {fieldName[0].toUpperCase() + fieldName.slice(1)}
            </label>
            <input
              key={fieldName}
              type="text"
              name={fieldName}
              value={value}
              onChange={this.handleChange}
              required
            />
          </>
        ))}

        <button
          className="ui green button"
          type="submit"
        >
          Add movie
        </button>

        <button
          className="ui grey button"
          type="button"
          onClick={this.setDefaultForm}
        >
          Clear form
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
