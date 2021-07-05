import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from '../FormField/FormField';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (evt) => {
    const { target: { name, value } } = evt;

    this.setState({
      [name]: value.trim(),
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imbdId,
    } = this.state;

    this.props.addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imbdId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form name="addMovie" className="form" onSubmit={this.handleSubmit}>
        <FormField
          name="title"
          value={title}
          label="Movie title"
          placeholder="Enter movie name"
          onChange={this.handleChange}
        />

        <FormField
          name="description"
          value={description}
          label="Movie title"
          placeholder="Enter movie description"
          onChange={this.handleChange}
        />

        <FormField
          name="imgUrl"
          value={imgUrl}
          label="Movie title"
          placeholder="Enter movie image URL"
          onChange={this.handleChange}
        />

        <FormField
          name="imdbUrl"
          value={imdbUrl}
          label="Movie title"
          placeholder="Enter movie IMDB URL"
          onChange={this.handleChange}
        />

        <FormField
          name="imdbId"
          value={imdbId}
          label="Movie title"
          placeholder="Enter movie IMDB id"
          onChange={this.handleChange}
        />
        <button type="submit" className="form__button">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
