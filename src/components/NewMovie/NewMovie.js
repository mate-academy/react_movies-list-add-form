import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormField } from '../FormField/FormField';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.trim(),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
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
      <form name="newMovie" onSubmit={this.handleSubmit}>
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
          label="Movie description"
          placeholder="Enter movie description"
          onChange={this.handleChange}
        />
        <FormField
          name="imgUrl"
          value={imgUrl}
          label="Movie imgUrl"
          placeholder="Enter movie imgUrl"
          onChange={this.handleChange}
        />
        <FormField
          name="imdbUrl"
          value={imdbUrl}
          label="imdbUrl"
          placeholder="Enter movie imdbUrl"
          onChange={this.handleChange}
        />
        <FormField
          name="imdbId"
          value={imdbId}
          label="Movie imdbId"
          placeholder="Enter movie imdbId"
          onChange={this.handleChange}
        />
        <button type="submit" className="button">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
