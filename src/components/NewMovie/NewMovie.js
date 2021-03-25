import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    id: 0,
  };

  setData = (key) => {
    return (event) => {
      this.setState({
        [key]: event.target.value,
      });
    };
  }

  addFilm = (event) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
    } = this.state;

    event.preventDefault();

    if (title === '' || description === '' || imgUrl === '' || imdbUrl === '') {
      return;
    }

    this.props.add(this.state);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      id: 0,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
    } = this.state;

    return (
      <form className="form">
        <label>
          Title:
          <input
            type="text"
            onChange={this.setData('title')}
            value={title}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            onChange={this.setData('description')}
            value={description}
          />
        </label>
        <label>
          Image Url:
          <input
            type="text"
            onChange={this.setData('imgUrl')}
            value={imgUrl}
          />
        </label>
        <label>
          IMDB Url:
          <input
            type="text"
            onChange={this.setData('imdbUrl')}
            value={imdbUrl}
          />
        </label>
        <label>
          IMDB Id:
          <input
            type="number"
            onChange={this.setData('id')}
            value={this.state.id}
          />
        </label>
        <button
          type="button"
          onClick={this.addFilm}
        >
          Submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  add: PropTypes.func.isRequired,
};
