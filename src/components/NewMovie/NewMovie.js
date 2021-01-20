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

  hadleSubmit = (event) => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    event.preventDefault();
    this.props.onAdd(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl } = this.state;

    return (
      <>
        <form
          className="addMovieForm"
          onSubmit={this.hadleSubmit}
        >
          <div className="inputs">
            <input
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={((event) => {
                this.setState({
                  title: event.target.value,
                });
              })}
            />
            <textarea
              placeholder="Enter a description"
              value={description}
              onChange={((event) => {
                this.setState({
                  description: event.target.value,
                });
              })}
            />
            <input
              type="text"
              placeholder="Enter a imgUrl"
              value={imgUrl}
              onChange={((event) => {
                this.setState({
                  imgUrl: event.target.value,
                });
              })}
            />
            <input
              type="text"
              placeholder="Enter a imdbUrl"
              value={imdbUrl}
              onChange={((event) => {
                this.setState({
                  imdbUrl: event.target.value,
                });
              })}
            />
          </div>
          <button
            className="button"
            type="submit"
          >
            Add
          </button>
        </form>
      </>

    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
