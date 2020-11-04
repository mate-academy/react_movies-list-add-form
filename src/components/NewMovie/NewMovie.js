import React, { Component } from 'react';
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
    this.setState({ [event.target.name]: event.target.value.trimLeft() });
  };

  handleSubmit = (event) => {
    const { addMovie } = this.props;
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    event.preventDefault();

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    addMovie({
      title, description, imgUrl, imdbUrl, imdbId,
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <p>Title</p>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <p>Description</p>
          <textarea
            name="description"
            id="description"
            value={description}
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <p>ImgUrl</p>
          <input
            type="url"
            name="imgUrl"
            id="imgUrl"
            value={imgUrl}
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <p>imdbUrl</p>
          <input
            type="url"
            name="imdbUrl"
            id="imdbUrl"
            value={imdbUrl}
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <p>imdbID</p>
          <input
            type="text"
            name="imdbId"
            id="imdbId"
            value={imdbId}
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add new film</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
