import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    this.props.addMovie({
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
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="form__field"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Movie title"
        />
        <input
          className="form__field"
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="Movie description"
        />
        <input
          className="form__field"
          type="text"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          placeholder="Movie imgUrl"
        />
        <input
          className="form__field"
          type="text"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          placeholder="Movie imdbUrl"
        />
        <input
          className="form__field"
          type="text"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
          placeholder="Movie imdbId"
        />
        <button type="submit" className="form__submit">
          Add new Movie
        </button>
      </form>
    );
  }
}
