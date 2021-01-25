import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  inputsHandler = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  formHandler = (event) => {
    event.preventDefault();

    const movie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbId: this.state.imdbId,
      imdbUrl: this.state.imdbUrl,
    };

    this.props.onSubmit(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    return (
      <form
        onSubmit={this.formHandler}
      >
        <div>
          <label
            htmlFor="title"
            className="form-label"
          >
            Title
          </label>
          <input
            className="input is-rounded"
            id="title"
            name="title"
            placeholder="title"
            value={this.state.title}
            onChange={this.inputsHandler}
            required
          />
        </div>
        <div>
          <label
            htmlFor="imgUrl"
            className="form-label"
          >
            ImgUrl
          </label>
          <input
            className="input is-rounded"
            id="imgUrl"
            name="imgUrl"
            placeholder="imgUrl"
            value={this.state.imgUrl}
            onChange={this.inputsHandler}
            required
          />
        </div>
        <div>
          <label
            htmlFor="imdbUrl"
            className="form-label"
          >
            ImdbUrl
          </label>
          <input
            id="imdbUrl"
            className="input is-rounded"
            name="imdbUrl"
            placeholder="imdbUrl"
            value={this.state.imdbUrl}
            onChange={this.inputsHandler}
            required
          />
        </div>
        <div>
          <label
            htmlFor="imdbId"
            className="form-label"
          >
            ImdbId
          </label>
          <input
            id="imdbId"
            className="input is-rounded"
            name="imdbId"
            placeholder="imdbId"
            value={this.state.imdbId}
            onChange={this.inputsHandler}
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="form-label"
          >
            Description
          </label>
          <textarea
            id="description"
            className="input is-rounded"
            name="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.inputsHandler}
          >
            {this.state.description}
          </textarea>
        </div>
        <button
          type="submit"
          className="button is-warning is-hovered"
        >
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
