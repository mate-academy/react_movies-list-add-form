import React, { Component } from 'react';

export class NewMovie extends Component {
  state = {
    name: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  render() {
    const { name, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form className="form">
        <h2>Add a movie:</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={event => this.setState({ name: event.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={event => this.setState({ description: event.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="Image Source"
          name="imgUrl"
          value={imgUrl}
          onChange={event => this.setState({ imgUrl: event.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="IMDB Page"
          name="imdbUrl"
          value={imdbUrl}
          onChange={event => this.setState({ imdbUrl: event.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="IMDB ID"
          name="imdbId"
          value={imdbId}
          onChange={event => this.setState({ imdbId: event.target.value })}
        />
        <br />
        <button
          type="button"
          onClick={() => {
            this.props.onAdd({ ...this.state });
            this.setState({
              name: '',
              description: '',
              imgUrl: '',
              imdbUrl: '',
              imdbId: '',
            });
          }}
        >
          Submit
        </button>
      </form>
    );
  }
}
