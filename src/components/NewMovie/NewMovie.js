import React, { Component } from 'react';

export class NewMovie extends Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => (
      {
        newMovie: {
          ...state.newMovie,
          [name]: value,
        },
      }
    ));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      newMovie: {
        title: '',
        description: '',
        imdbId: '',
        imdbUrl: '',
        imgUrl: '',
      },
    });
  }

  render() {
    return (
      <form
        onSubmit={event => this.handleSubmit(event)}
      >
        <div>
          <input
            type="text"
            placeholder="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="description"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input
            type="url"
            placeholder="imgUrl"
            name="imgUrl"
            value={this.state.imgUrl}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input
            type="url"
            placeholder="imdbUrl"
            name="imdbUrl"
            value={this.state.imdbUrl}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="imdbId"
            name="imdbId"
            value={this.state.imdbId}
            onChange={this.handleChange}
          />
        </div>

        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}
