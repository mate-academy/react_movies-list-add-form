import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form/Form';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onSubmit = (event) => {
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

  onChange = (event) => {
    const { target: { name, value } } = event;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form name="newMovie" onSubmit={this.onSubmit}>
        <Form
          name="title"
          value={title}
          label="Title"
          onChange={this.onChange}
        />
        <Form
          name="description"
          value={description}
          label="Description"
          onChange={this.onChange}
        />
        <Form
          name="imgUrl"
          value={imgUrl}
          label="ImgUrl"
          onChange={this.onChange}
        />
        <Form
          name="imdbUrl"
          value={imdbUrl}
          label="ImdbUrl"
          onChange={this.onChange}
        />
        <Form
          name="imdbId"
          value={imdbId}
          label="ImdbId"
          onChange={this.onChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-lg"
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
