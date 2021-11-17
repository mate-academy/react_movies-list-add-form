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

  handleFormDataChange =
  (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.addMovie({
      ...this.state,
    });
    this.clearForm();
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="form__input"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleFormDataChange}
          placeholder="Enter the movie title"
        />
        <textarea
          className="form__description"
          name="description"
          value={this.state.description}
          onChange={this.handleFormDataChange}
          placeholder="Movie Description"
        />
        <input
          className="form__input"
          type="text"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleFormDataChange}
          placeholder="imgUrl"
        />
        <input
          className="form__input"
          type="text"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleFormDataChange}
          placeholder="imdbUrl"
        />
        <input
          className="form__input"
          type="text"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.handleFormDataChange}
          placeholder="imdbId"
        />
        <button type="submit" className="form__submit">
          Add New Movie
        </button>
      </form>
    );
  }
}
