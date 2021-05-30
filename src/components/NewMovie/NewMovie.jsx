import React, { Component } from 'react';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onAdd({
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          });
          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }}
      >
        <input
          type="text"
          className="input"
          name="title"
          value={title}
          placeholder="Movie title"
          onChange={event => this.setState({ title: event.target.value })}
        />
        <br />
        <textarea
          type="text"
          className="input textarea"
          name="description"
          value={description}
          placeholder="Movie description"
          onChange={event => this.setState({ description: event.target.value })}
        />
        <br />
        <input
          type="text"
          className="input"
          name="imgUrl"
          value={imgUrl}
          placeholder="Movie imgUrl"
          onChange={event => this.setState({ imgUrl: event.target.value })}
        />
        <br />
        <input
          type="text"
          className="input"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Movie imdbUrl"
          onChange={event => this.setState({ imdbUrl: event.target.value })}
        />
        <br />
        <button
          type="submit"
          className="submit-btn"
        >
          Submit
        </button>
      </form>
    );
  }
}
