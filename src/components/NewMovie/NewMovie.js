import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '../TextField/TextField';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value.trim(),
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          name="title"
          label="Title"
          placeholder="Write title here..."
          value={title}
          onChange={this.handleChange}
        />
        <TextField
          name="description"
          label="Description"
          placeholder="Write description here..."
          value={description}
          onChange={this.handleChange}
        />
        <TextField
          name="imgUrl"
          label="ImgUrl"
          placeholder="Write url of image here..."
          value={imgUrl}
          onChange={this.handleChange}
        />
        <TextField
          name="imdbUrl"
          label="ImdbUrl"
          placeholder="Write url of imdb here..."
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <TextField
          name="imdbId"
          label="ImdbId"
          placeholder="Write Id here..."
          value={imdbId}
          onChange={this.handleChange}
        />
        <div>
          <button type="submit">
            Add movie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
