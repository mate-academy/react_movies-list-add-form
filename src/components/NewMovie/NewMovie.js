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

  checkValidationUrl = (url) => {
    // eslint-disable-next-line
    const isLink = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._s+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

    return isLink.test(url);
  }

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

    if (!this.checkValidationUrl(imgUrl) || !this.checkValidationUrl(imdbUrl)) {
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
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            onChange={this.setData('description')}
            value={description}
            required
          />
        </label>
        <label>
          Image Url:
          <input
            type="text"
            onChange={this.setData('imgUrl')}
            value={imgUrl}
            required
          />
        </label>
        <label>
          IMDB Url:
          <input
            type="text"
            onChange={this.setData('imdbUrl')}
            value={imdbUrl}
            required
          />
        </label>
        <label>
          IMDB Id:
          <input
            type="number"
            onChange={this.setData('id')}
            value={this.state.id}
            required
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
