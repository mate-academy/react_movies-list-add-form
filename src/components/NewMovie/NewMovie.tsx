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

  /* handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  }; */

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    this.setState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
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
              name="newTitle"
              type="text"
              value={newTitle}
              onChange={this.handleChange}
              placeholder="Title"
              className="input"
              required
            />
          </div>

          <div className="description-change">
            <input
              name="newDescription"
              type="text"
              value={newDescription}
              onChange={this.handleChange}
              placeholder="Description"
              className="input"
              required
            />
          </div>

          <div className="imgUrl-change">
            <input
              name="newImgUrl"
              type="text"
              value={newImgUrl}
              onChange={this.handleChange}
              placeholder="ImgUrl"
              className="input"
              required
            />
          </div>

          <div className="imdbUrl-change">
            <input
              name="newImdbUrl"
              type="text"
              value={newImdbUrl}
              onChange={this.handleChange}
              placeholder="imdbUrl"
              className="input"
              required
            />
          </div>

          <div className="imdbId-change">
            <input
              name="newImdbId"
              type="text"
              value={newImdbId}
              onChange={this.handleChange}
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
