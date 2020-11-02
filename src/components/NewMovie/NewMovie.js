import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

class NewMovie extends Component {
  fields = ['Title', 'Description', 'ImgUrl', 'ImdbUrl', 'ImdbId'];

  state = {
    Title: '',
    Description: '',
    ImgUrl: '',
    ImdbUrl: '',
    ImdbId: '',
  };

  setField(key, value) {
    this.setState((state) => {
      return {
        ...state,
        [`${key}`]: value,
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { Title, Description, ImdbId, ImgUrl, ImdbUrl } = this.state;

    if (
      Title.trim()
      && Description.trim()
      && ImdbId.trim()
      && ImgUrl.trim()
      && ImdbUrl.trim()
    ) {
      const movie = {
        title: Title,
        description: Description,
        imgUrl: ImgUrl,
        imdbUrl: ImdbUrl,
        imdbId: ImdbId,
      };

      this.setState({
        Title: '',
        Description: '',
        ImgUrl: '',
        ImdbUrl: '',
        ImdbId: '',
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
        onSubmit={event => this.handleSubmit(event)}
      >
        {this.fields.map(field => (
          <input
            key={field}
            type="text"
            placeholder={field}
            onChange={event => this.setField(field, event.target.value)}
            className="input is-info"
            value={this.state[field]}
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
