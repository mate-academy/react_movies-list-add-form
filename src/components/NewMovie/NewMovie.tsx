import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

export class NewMovie extends Component<Props, Movie> {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onAdd(this.state);

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
      <form
        className="form"
        method="GET"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="title" className="form__label">
          Movie title:
          <input
            type="text"
            id="title"
            name="title"
            className="form__input"
            placeholder="Enter film name"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imgUrl" className="form__label">
          Movie image url:
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            className="form__input"
            placeholder="Enter link to image"
            value={this.state.imgUrl}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imdbUrl" className="form__label">
          Imdb url:
          <input
            type="text"
            id="imdbUrl"
            name="imdbUrl"
            className="form__input"
            placeholder="Enter link on IMDB"
            value={this.state.imdbUrl}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imdbId" className="form__label">
          Imdb id:
          <input
            type="text"
            id="imdbId"
            name="imdbId"
            className="form__input"
            placeholder="Enter ID"
            value={this.state.imdbId}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="description" className="form__label">
          Movie description:
          <textarea
            id="description"
            name="description"
            className="form__input textarea"
            placeholder="Enter film description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className="form__button">
          Add Movie
        </button>
      </form>
    );
  }
}
