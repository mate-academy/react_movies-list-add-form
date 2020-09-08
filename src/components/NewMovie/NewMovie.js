import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbId: '',
    imdbUrl: '',
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trimLeft(),
    });
  }

  handleFormReset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbId: '',
      imdbUrl: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { onAdd } = this.props;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();

          onAdd({
            title, description, imgUrl, imdbUrl, imdbId,
          });

          this.handleFormReset();
        }}
        className="form"
      >
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Please, add a movie title"
          onChange={this.handleInputChange}
        />

        <input
          type="text"
          name="description"
          value={description}
          placeholder="Please, add a description"
          onChange={this.handleInputChange}
        />

        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          placeholder="Please, add a img url"
          onChange={this.handleInputChange}
        />

        <input
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Please, add a imdb url"
          onChange={this.handleInputChange}
        />

        <input
          type="text"
          name="imdbId"
          value={imdbId}
          placeholder="Please, add a imdb Id"
          onChange={this.handleInputChange}
        />

        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
