import React, { Component } from 'react';
import './NewMovie.scss';

type Props = { addMovie:(movie: Movie) => void };
type State = Movie;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  eventHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const fieldName = event.currentTarget.name;
    const fieldValue = event.currentTarget.value;

    this.setState({
      [fieldName]: fieldValue,
    } as Pick<Movie, keyof Movie>);
  };

  newMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.addMovie(this.state);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    return (
      <form className="form" onSubmit={this.newMovie}>
        <input
          type="text"
          name="title"
          className="form__input"
          placeholder="title"
          value={title}
          required
          onChange={this.eventHandler}
        />
        <input
          type="text"
          name="description"
          className="form__input"
          placeholder="description"
          value={description}
          required
          onChange={this.eventHandler}
        />
        <input
          type="text"
          name="imgUrl"
          className="form__input"
          placeholder="imgUrl"
          value={imgUrl}
          required
          onChange={this.eventHandler}
        />
        <input
          type="text"
          name="imdbUrl"
          className="form__input"
          placeholder="imdbUrl"
          value={imdbUrl}
          required
          onChange={this.eventHandler}
        />
        <input
          type="text"
          name="imdbId"
          className="form__input"
          placeholder="imdbId"
          value={imdbId}
          required
          onChange={this.eventHandler}
        />
        <button type="submit" className="form__submit">Add new film</button>
      </form>
    );
  }
}
