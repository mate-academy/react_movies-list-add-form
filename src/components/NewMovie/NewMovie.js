import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imbdId: '',
  };

  inputChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value.trimLeft() });
  }

  add = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imbdId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imbdId } = this.state;

    return (
      <>
        <h1>Add movie</h1>
        <form
          className="form"
          onSubmit={this.add}
        >
          <input
            type="text"
            name="title"
            placeholder="Movie title"
            className="form-input form-title"
            required
            value={title}
            onChange={this.inputChange}
          />
          <textarea
            name="description"
            className="form-input form-description"
            placeholder="Movie description"
            required
            value={description}
            onChange={this.inputChange}
          />
          <input
            type="text"
            name="imgUrl"
            placeholder="Movie imgUrl"
            className="form-input form-imgUrl"
            required
            value={imgUrl}
            onChange={this.inputChange}
          />
          <input
            type="text"
            name="imdbUrl"
            placeholder="Movie imdbUrl"
            className="form-input form-imdbUrl"
            required
            value={imdbUrl}
            onChange={this.inputChange}
          />
          <input
            type="text"
            name="imbdId"
            placeholder="Movie imbdId"
            className="form-input form-imbdId"
            required
            value={imbdId}
            onChange={this.inputChange}
          />
          <button type="submit" className="form-input form-button">
            Click me!
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
