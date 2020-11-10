import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../FormInput/FormInput';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  }

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
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    return (
      <form
        className="ui form"
        onSubmit={this.handleSubmit}
        name="newMovie"
        method="post"
      >
        { Object.entries(this.state).map(([key, value]) => (
          <FormInput
            fieldName={key}
            value={value}
            onChange={this.handleChange}
          />
        ))}

        <button
          className="ui button"
          type="submit"
        >
          Add movie
        </button>

        <button
          className="ui button"
          type="button"
          onClick={this.setDefaultForm}
        >
          Clear
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
