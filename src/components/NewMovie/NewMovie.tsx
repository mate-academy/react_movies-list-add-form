import { Component } from 'react';

import './NewMovie.scss';

type Props = {
  movies: Movie[],
  addMovie: (newMovie: Movie) => void;
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

    // const { movies } = this.props;

    const newMovie: Movie = {
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    };

    return newMovie;
  };

  resetState = () => {
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
    this.resetState();
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
      <div>
        <h1 className="title">Add new Movie</h1>
        <form onSubmit={this.handleSubmit}>
          <section>
            <input
              type="text"
              className="input"
              value={newTitle}
              onChange={this.handleTitleChange}
              placeholder="Title"
              required
            />
          </section>

          <section>
            <input
              type="text"
              className="input"
              value={newDescription}
              onChange={this.handleDescriptionChange}
              placeholder="Description"
              required
            />
          </section>

          <section>
            <input
              type="text"
              value={newImgUrl}
              className="input"
              onChange={this.handleImgUrlChange}
              placeholder="ImgUrl"
              required
            />
          </section>

          <section>
            <input
              type="text"
              value={newImdbUrl}
              className="input"
              onChange={this.handleImdbUrlChange}
              placeholder="ImdbUrl"
              required
            />
          </section>

          <section>
            <input
              type="text"
              value={newImdbId}
              className="input"
              onChange={this.handleImdbIdChange}
              placeholder="ImdbId"
              required
            />
          </section>
          <button type="submit" className="button">Add</button>
        </form>
      </div>
    );
  }
}
