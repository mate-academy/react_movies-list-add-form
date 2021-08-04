import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbld: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbld: '',
    });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { title, description, imgUrl, imdbUrl, imdbld } = this.state;

    return (

      <form onSubmit={handleSubmit} className="form">
        <input
          className="input"
          placeholder="title"
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          placeholder="description"
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          placeholder="imgUrl"
          type="text"
          name="imgUrl"
          value={imgUrl}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          placeholder="imdbUrl"
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          placeholder="imdbld"
          type="text"
          name="imdbld"
          value={imdbld}
          onChange={handleChange}
          required
        />
        <button
          className="button"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
