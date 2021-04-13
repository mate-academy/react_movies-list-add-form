import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addMovie({ ...this.state });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

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
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >

        <div className="form__field">
          <TextField
            id="standard-basic"
            label="Title"
            variant="outlined"
            name="title"
            value={title}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form__field">
          <TextField
            id="standard-basic"
            label="Description"
            variant="outlined"
            value={description}
            name="description"
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form__field">
          <TextField
            id="standard-basic"
            label="Image URL"
            variant="outlined"
            value={imgUrl}
            name="imgUrl"
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form__field">
          <TextField
            id="standard-basic"
            label="IMDB URL"
            variant="outlined"
            value={imdbUrl}
            name="imdbUrl"
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form__field">
          <TextField
            id="standard-basic"
            label="IMDB URL"
            variant="outlined"
            value={imdbId}
            name="imdbId"
            onChange={this.handleChange}
            required
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Add movie
        </Button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
