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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
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
              name="newTitle"
              className="input"
              value={newTitle}
              onChange={this.handleChange}
              placeholder="Title"
              required
            />
          </section>

          <section>
            <input
              type="text"
              className="input"
              name="newDescription"
              value={newDescription}
              onChange={this.handleChange}
              placeholder="Description"
              required
            />
          </section>

          <section>
            <input
              type="text"
              value={newImgUrl}
              name="newImgUrl"
              className="input"
              onChange={this.handleChange}
              placeholder="ImgUrl"
              required
            />
          </section>

          <section>
            <input
              type="text"
              value={newImdbUrl}
              name="newImdbUrl"
              className="input"
              onChange={this.handleChange}
              placeholder="ImdbUrl"
              required
            />
          </section>

          <section>
            <input
              type="text"
              value={newImdbId}
              name="newImdbId"
              className="input"
              onChange={this.handleChange}
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
