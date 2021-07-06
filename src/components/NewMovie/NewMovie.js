import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Template } from './Template';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    error: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trim(),
      error: false,
    });
  }

  formsCheck = () => {
    const { title, imgUrl, imdbUrl, imdbId, description } = this.state;
    const { addMovie } = this.props;

    if (title && imgUrl && imdbUrl && imdbId) {
      addMovie({
        title, description, imgUrl, imdbUrl, imdbId,
      });
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    } else {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId, error } = this.state;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.formsCheck();
        }}
      >
        <Template
          title="Title"
          name="title"
          value={title}
          placeholder="title of your film"
          onChange={this.handleChange}
        />
        <br />

        <Template
          title="Description"
          name="description"
          value={description}
          placeholder="description of your film"
          onChange={this.handleChange}
        />
        <br />

        <Template
          title="ImgUrl"
          name="imgUrl"
          value={imgUrl}
          placeholder="link of your poster"
          onChange={this.handleChange}
        />
        <br />

        <Template
          title="ImdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="link of your film on imdb"
          onChange={this.handleChange}
        />
        <br />

        <Template
          title="ImdbId"
          name="imdbId"
          value={imdbId}
          placeholder="id of your film on imdb"
          onChange={this.handleChange}
        />
        <br />

        <button type="submit" className="button is-warning">
          Add movie
        </button>

        <p hidden={!error}>
          Complete all fields, please
        </p>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
