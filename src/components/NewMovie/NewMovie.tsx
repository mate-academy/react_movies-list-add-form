/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

type State = {
  newMovie: Movie,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onAdd(this.state.newMovie);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        <div className="form__fields">
          <input
            name="title"
            placeholder="title"
            type="text"
            className="form__fields--field"
            value={this.state.newMovie.title}
            onChange={this.handleChange}
          />
          <input
            name="description"
            placeholder="description"
            type="text"
            className="form__fields--field"
            value={this.state.newMovie.description}
            onChange={this.handleChange}
          />
          <input
            name="imgUrl"
            placeholder="imgUrl"
            type="text"
            className="form__fields--field"
            value={this.state.newMovie.imgUrl}
            onChange={this.handleChange}
          />
          <input
            name="imdbUrl"
            placeholder="imdbUrl"
            type="text"
            className="form__fields--field"
            value={this.state.newMovie.imdbUrl}
            onChange={this.handleChange}
          />
          <input
            name="imdbId"
            placeholder="imdbId"
            type="text"
            className="form__fields--field"
            value={this.state.newMovie.imdbId}
            onChange={this.handleChange}
          />

          <button type="submit">
            Add
          </button>
        </div>
      </form>
    );
  }
}
