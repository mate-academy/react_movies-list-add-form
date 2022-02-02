import React, { Component } from 'react';

import './NewMovie.scss';

type Props = {
  onMovieCreate: (
    movie: Movie
  ) => void
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as { [I in keyof State]: State[I] });
  };

  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const movie = {
            title: this.state.title,
            description: this.state.description,
            imgUrl: this.state.imgUrl,
            imdbUrl: this.state.imdbUrl,
            imdbId: this.state.imdbId,
          };

          this.props.onMovieCreate(movie);

          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }}
        className="add-movie"
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          className="add-movie__input"
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          className="add-movie__input"
        />
        <input
          type="text"
          placeholder="ImgUrl"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          className="add-movie__input"
        />
        <input
          type="text"
          placeholder="ImdbUrl"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          className="add-movie__input"
        />
        <input
          type="text"
          placeholder="ImdbId"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
          className="add-movie__input"
        />
        <button
          type="submit"
          className="add-movie__submit"
        >
          Add a new movie
        </button>
      </form>
    );
  }
}
