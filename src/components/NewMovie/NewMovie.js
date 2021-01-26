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

  submit = (event) => {
    event.preventDefault();
    this.props.onAdd({
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgbUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        Name of movie:
        <br />
        <input
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="title"
          required="true"
        />
        <br />
        Description:
        <br />
        <input
          placeholder="description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br />
        imgUrl:
        <br />
        <input
          name="imgUrl"
          placeholder="url..."
          value={this.state.imgUrl}
          onChange={this.handleChange}
          required="true"
        />
        <br />
        imdbUrl:
        <br />
        <input
          name="imdbUrl"
          placeholder="imdbUrl..."
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          required="true"
        />
        <br />
        imdbId
        <br />
        <input
          name="imdbId"
          placeholder="imdbId..."
          value={this.state.imdbId}
          onChange={this.handleChange}
          required="true"
        />
        <br />
        <br />
        <button type="submit" className="button">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
