import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { title, description, imdbUrl, imdbId, imgUrl } = this.state;
    const { addMovie } = this.props;

    addMovie({
      title, description, imdbUrl, imdbId, imgUrl,
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
    const {
      title,
      description,
      imdbUrl,
      imdbId,
      imgUrl,
    } = this.state;
    const { addMovie } = this.props;

    return (
      <div className="container">
        <h2 className="container__title">Add new movie</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          addMovie(this.state);
        }}
        >
          <div className="container__content">
            <div>
              <label>
                Enter name of the movie:
                <input
                  name="title"
                  type="text"
                  value={title}
                  onChange={(event) => {
                    this.setState({
                      title: event.target.value.trimLeft(),
                    });
                  }}
                  required
                />
              </label>
            </div>

            <div className="movieDescription">
              <label>
                Enter description of the movie:
                <input
                  className="description"
                  name="description"
                  value={description}
                  onChange={(event) => {
                    this.setState({
                      description: event.target.value.trimLeft(),
                    });
                  }}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Enter a link to the movie poster:
                <input
                  name="imgUrl"
                  type="text"
                  value={imgUrl}
                  onChange={(event) => {
                    this.setState({
                      imgUrl: event.target.value.trimLeft(),
                    });
                  }}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Enter a link to IMDB page of the movie:
                <input
                  name="imdbUrl"
                  type="text"
                  value={imdbUrl}
                  onChange={(event) => {
                    this.setState({
                      imdbUrl: event.target.value.trimLeft(),
                    });
                  }}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Enter a IMDB&apos;s id:
                <input
                  name="imdbId"
                  type="text"
                  value={imdbId}
                  onChange={(event) => {
                    this.setState({
                      imdbId: event.target.value.trimLeft(),
                    });
                  }}
                  required
                />
              </label>
            </div>
            <button
              type="submit"
            >
              Add the movie
            </button>
          </div>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
