import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
};
type State = {
  newMovieName: string;
  movieDescription: string;
  imgLink: string;
  siteLink: string;
  movieId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovieName: '',
    movieDescription: '',
    imgLink: '',
    siteLink: '',
    movieId: '',
  };

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [id]: value,
    }));
  }

  clearState = () => {
    this.setState({
      newMovieName: '',
      movieDescription: '',
      imgLink: '',
      siteLink: '',
      movieId: '',
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      newMovieName,
      movieDescription,
      imgLink,
      siteLink,
      movieId,
    } = this.state;

    const movie: Movie = {
      title: newMovieName,
      description: movieDescription,
      imgUrl: imgLink,
      imdbUrl: siteLink,
      imdbId: movieId,
    };

    this.props.addMovie(movie);
    this.clearState();
  };

  render() {
    const {
      newMovieName,
      movieDescription,
      imgLink,
      siteLink,
      movieId,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <section>
          <input
            type="text"
            placeholder="Title"
            className="form"
            id="newMovieName"
            value={newMovieName}
            onChange={(event) => (
              this.handleChange(event)
            )}
            required
          />
        </section>

        <section>
          <input
            type="text"
            placeholder="Description"
            className="form"
            id="movieDescription"
            value={movieDescription}
            onChange={(event) => (
              this.handleChange(event)
            )}
            required
          />
        </section>

        <section>
          <input
            type="text"
            placeholder="imgUrl"
            className="form"
            id="imgLink"
            value={imgLink}
            onChange={(event) => (
              this.handleChange(event)
            )}
            required
          />
        </section>

        <section>
          <input
            type="text"
            placeholder="imdbUrl"
            className="form"
            id="siteLink"
            value={siteLink}
            onChange={(event) => (
              this.handleChange(event)
            )}
            required
          />
        </section>

        <section>
          <input
            type="text"
            placeholder="imdbId"
            className="form"
            id="movieId"
            value={movieId}
            onChange={(event) => (
              this.handleChange(event)
            )}
            required
          />
        </section>

        <button type="submit" className="form button">Add</button>
      </form>
    );
  }
}
