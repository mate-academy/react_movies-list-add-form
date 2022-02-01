import React, { Component } from 'react';

type Props = {
  movies: Movie[],
  addMovie: (newMovie: Movie) => void,
};

type State = {
  newTitle: string;
  newDescription: string;
  newImgUrl: string;
  newImdbUrl: string;
  newImdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newTitle: '',
    newDescription: '',
    newImgUrl: '',
    newImdbUrl: '',
    newImdbId: '',
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.target.value,
    });
  };

  handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newDescription: event.target.value,
    });
  };

  handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newImgUrl: event.target.value,
    });
  };

  handleImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newImdbUrl: event.target.value,
    });
  };

  handleImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newImdbId: event.target.value,
    });
  };

  getNewMovie = () => {
    const {
      newTitle,
      newDescription,
      newImgUrl,
      newImdbUrl,
      newImdbId,
    } = this.state;

    const newMovie: Movie = {
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    };

    return newMovie;
  };

  clearState = () => {
    this.setState({
      newTitle: '',
      newDescription: '',
      newImgUrl: '',
      newImdbUrl: '',
      newImdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = this.getNewMovie();

    this.props.addMovie(newMovie);
    this.clearState();
  };

  render() {
    const {
      newTitle,
      newDescription,
      newImgUrl,
      newImdbUrl,
      newImdbId,
    } = this.state;

    return (
      <div className="input-film">
        <h1 className="title">Add new film</h1>

        <form onSubmit={this.handleSubmit} className="form">
          <div className="title-change">
            <input
              type="text"
              value={newTitle}
              onChange={this.handleTitleChange}
              placeholder="Title"
              className="input"
              required
            />
          </div>

          <div className="description-change">
            <input
              type="text"
              value={newDescription}
              onChange={this.handleDescriptionChange}
              placeholder="Description"
              className="input"
              required
            />
          </div>

          <div className="imgUrl-change">
            <input
              type="text"
              value={newImgUrl}
              onChange={this.handleImgUrlChange}
              placeholder="ImgUrl"
              className="input"
              required
            />
          </div>

          <div className="imdbUrl-change">
            <input
              type="text"
              value={newImdbUrl}
              onChange={this.handleImdbUrlChange}
              placeholder="imdbUrl"
              className="input"
              required
            />
          </div>

          <div className="imdbId-change">
            <input
              type="text"
              value={newImdbId}
              onChange={this.handleImdbIdChange}
              placeholder="ImdbId"
              className="input"
              required
            />
          </div>

          <button
            type="submit"
            className="add-button"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
