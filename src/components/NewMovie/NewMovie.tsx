import React, { FormEvent } from 'react';
import './NewMovie.scss';

type Props = {
  addNewMovie: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: EventsForm) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = { ...this.state };

    this.props.addNewMovie(newMovie);

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
        className="Form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter the title"
          className="Form__input"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={this.state.description}
          className="Form__textarea"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="Enter the link of image"
          className="Form__input"
          value={this.state.imgUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="Enter the link of IMDB"
          className="Form__input"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbId"
          placeholder="Enter the IMDB Id"
          className="Form__input"
          value={this.state.imdbId}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="Form__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}
