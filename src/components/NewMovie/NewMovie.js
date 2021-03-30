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

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  submitHandler = (event) => {
    const { onAdd } = this.props;

    onAdd(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        this.submitHandler();
      }}
      >
        <label>
          <span>Title:</span>
          <input
            value={title}
            type="text"
            name="title"
            id="title"
            onChange={this.changeHandler}
          />
        </label>
        <br />
        <label>
          <span>Description:</span>
          <input
            value={description}
            type="text"
            name="description"
            id="description"
            onChange={this.changeHandler}
          />
        </label>
        <br />
        <label>
          <span>imgUrl:</span>
          <input
            value={imgUrl}
            type="text"
            name="imgUrl"
            id="imgUrl"
            onChange={this.changeHandler}
          />
        </label>
        <br />
        <label>
          <span>imdbUrl:</span>
          <input
            value={imdbUrl}
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            onChange={this.changeHandler}
          />
        </label>
        <br />
        <label>
          <span>imdbId:</span>
          <input
            value={imdbId}
            type="text"
            name="imdbId"
            id="imdbId"
            onChange={this.changeHandler}
          />
        </label>
        <br />
        <button
          type="submit"
          className="button"
        >
          Add film!
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
