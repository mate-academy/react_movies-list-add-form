import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  movieAdder: (movie: Movie) => void,
};

type State = {
  title: string
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

  addData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,

      [name]: value,
    }));
  };

  submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.props.movieAdder(this.state);

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
        onSubmit={this.submitForm}
        className="add-movie"
      >
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.addData}
          placeholder="Title"
          className="add-movie__input"
        />
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.addData}
          placeholder="Description"
          className="add-movie__input"
        />
        <input
          type="text"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.addData}
          placeholder="Img URL"
          className="add-movie__input"
        />
        <input
          type="text"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.addData}
          placeholder="IMBD URL"
          className="add-movie__input"
        />
        <input
          type="text"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.addData}
          placeholder="IMBD Id"
          className="add-movie__input add-movie__input--last"
        />

        <button
          type="submit"
          className="add-movie__submit-button"
        >
          Add movie
        </button>
      </form>
    );
  }
}
