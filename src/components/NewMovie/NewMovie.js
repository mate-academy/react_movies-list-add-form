import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

const lowercaseFirstLetter = string => string.charAt(0).toLowerCase()
  + string.slice(1);

class NewMovie extends Component {
  fields = ['Title', 'Description', 'ImgUrl', 'ImdbUrl', 'ImdbId'];

  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  setField = (event) => {
    const { name, value } = event.target;

    this.setState((state) => {
      return {
        ...state,
        [`${name}`]: value,
      };
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, imdbId, imgUrl, imdbUrl } = this.state;

    if (
      title.trim()
      && description.trim()
      && imdbId.trim()
      && imgUrl.trim()
      && imdbUrl.trim()
    ) {
      const movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      this.setState({
        description: '',
        imdbId: '',
        imdbUrl: '',
        imgUrl: '',
        title: '',
      });

      this.props.onAdd(movie);
    }
  }

  render() {
    return (
      <form
        name="new-movie"
        method="POST"
        className="field"
        onSubmit={this.handleSubmit}
      >
        {this.fields.map(field => (
          <input
            name={lowercaseFirstLetter(field)}
            key={field}
            type="text"
            placeholder={field}
            onChange={this.setField}
            className="input is-info"
            value={this.state[lowercaseFirstLetter(field)]}
            required
          />
        ))}
        <button type="submit" className="button">
          Add new film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export { NewMovie };
