import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

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
      [event.target.name]: event.target.value,
    });
  }

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
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
        onSubmit={(event) => {
          event.preventDefault();

          this.props.onAddMovie({
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          });

          this.clearForm();
        }}
      >
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
        />

        <textarea
          className="form__description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        />

        <input
          className="formImgUrl"
          name="imgUrl"
          placeholder="URL of the poster"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          className="formimdbUrl"
          name="imdbUrl"
          placeholder="Link to the IMDB page"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <input
          className="formimdbId"
          name="imdbId"
          placeholder="Movie id"
          value={imdbId}
          onChange={this.handleChange}
        />
        <button
          className="formbutton"
          type="submit"
          onChange={this.handleChange}
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
};
