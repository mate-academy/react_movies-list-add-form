import React, { Component } from 'react';
import '../../App.scss';
import PropTypes from 'prop-types';

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

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { onAdd } = this.props;

    return (
      <form
        className="inputs"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(this.state);
          this.clearForm();
        }}
      >
        <div>Title:</div>
        <input
          name="title"
          placeholder="Name me!"
          value={title}
          onChange={this.handleChange}
        />

        <div>Description:</div>
        <input
          name="description"
          placeholder="About movie"
          value={description}
          onChange={this.handleChange}
        />

        <div>imgUrl:</div>
        <input
          name="imgUrl"
          placeholder="My image cover"
          value={imgUrl}
          onChange={this.handleChange}
        />

        <div>imdbUrl:</div>
        <input
          name="imdbUrl"
          placeholder="Where from I am?"
          value={imdbUrl}
          onChange={this.handleChange}
        />

        <div>imdbId:</div>
        <input
          name="imdbId"
          placeholder="My unique ID"
          value={imdbId}
          onChange={this.handleChange}
        />

        <button
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
