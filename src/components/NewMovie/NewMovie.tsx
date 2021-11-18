import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

export class NewMovie extends Component<Props> {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

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
  };

  render() {
    return (
      <form className="test-form" onSubmit={this.handleSubmit}>
        <label htmlFor="title">
          Name of movie:
          <br />

          <input
            name="title"
            type="text"
            id="title"
            placeholder="Movie tile"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </label>

        <label htmlFor="description">
          Description of movie:
          <br />

          <textarea
            name="description"
            id="description"
            placeholder="Movie description"
            value={this.state.description}
            onChange={this.handleInputChange}
            cols={40}
            rows={5}
          />
        </label>

        <label htmlFor="imgUrl">
          Movie imgUrl:
          <br />

          <input
            name="imgUrl"
            type="text"
            id="imgUrl"
            placeholder="Movie imgUrl"
            value={this.state.imgUrl}
            onChange={this.handleInputChange}
          />
        </label>

        <label htmlFor="imdbUrl">
          Movie imdbUrl:
          <br />

          <input
            name="imdbUrl"
            type="text"
            id="imdbUrl"
            placeholder="Movie imdbUrl"
            value={this.state.imdbUrl}
            onChange={this.handleInputChange}
          />
        </label>

        <label htmlFor="imdbId">
          Movie imdbId:
          <br />

          <input
            name="imdbId"
            type="text"
            id="imdbId"
            placeholder="Movie imdbId"
            value={this.state.imdbId}
            onChange={this.handleInputChange}
          />
        </label>

        <button type="submit">Add movie</button>
      </form>
    );
  }
}
