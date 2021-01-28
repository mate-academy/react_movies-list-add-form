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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onAdd } = this.props;

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    onAdd(this.state);
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field-input">
          <label htmlFor="input-title">
            {`Title `}
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
            required
            id="input-title"
          />
        </div>

        <div className="field-input">
          <label htmlFor="input-description">
            {`Description `}
          </label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
            required
            id="input-description"
          />
        </div>

        <div className="field-input">
          <label htmlFor="input-imgUrl">
            {`Img Url `}
          </label>
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
            id="input-imgUrl"
          />
        </div>

        <div className="field-input">
          <label htmlFor="input-imdbUrl">
            {`Imdb Url `}
          </label>
          <input
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
            id="input-imdbUrl"
          />
        </div>

        <div className="field-input">
          <label htmlFor="input-imdbId">
            {`Imdb Id `}
          </label>
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
            id="input-imdbId"
          />
        </div>

        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
