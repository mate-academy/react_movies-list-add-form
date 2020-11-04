import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component {
  state = { ...initialState }

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

    this.setDefaultForm();
  }

  setDefaultForm = () => {
    this.setState({ ...initialState });
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
          <Input
            fieldName={fieldName}
            value={value}
            onChange={this.handleChange}
          />
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
