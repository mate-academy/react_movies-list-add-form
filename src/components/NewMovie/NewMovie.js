import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbbld: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbbld,
    } = this.state;

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbbld,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbbld: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trimLeft(),
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbbld,
    } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label htmlFor="title">Name of movie</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={this.handleChange}
          className="form__input"
          required
        />

        <label htmlFor="description">Description of movie</label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={this.handleChange}
          className="form__input"
        />

        <label htmlFor="imgUrl">Url address of movie</label>
        <input
          type="url"
          id="imgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          className="form__input"
          required
        />

        <label htmlFor="imdbUrl">ImdbUrl of mive</label>
        <input
          type="url"
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          className="form__input"
          required
        />

        <label htmlFor="imdbbld">Imdbbld of movie</label>
        <input
          type="text"
          id="imdbbld"
          name="imdbbld"
          value={imdbbld}
          onChange={this.handleChange}
          className="form__input"
          required
        />

        <button type="submit">Add new movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
