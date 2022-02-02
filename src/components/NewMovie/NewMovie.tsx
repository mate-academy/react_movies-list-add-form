import React, { Component } from 'react';

type Props = {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
};
type State = {
  newMovieName: string;
  movieDescription: string;
  imgUrl: string;
  siteUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovieName: '',
    movieDescription: '',
    imgUrl: '',
    siteUrl: '',
    imdbId: '',
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
      imgUrl: '',
      siteUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      newMovieName,
      movieDescription,
      imgUrl,
      siteUrl,
      imdbId,
    } = this.state;

    const movie: Movie = {
      title: newMovieName,
      description: movieDescription,
      imgUrl,
      imdbUrl: siteUrl,
      imdbId,
    };

    this.props.addMovie(movie);
    this.clearState();
  };

  render() {
    const {
      newMovieName,
      movieDescription,
      imgUrl,
      siteUrl,
      imdbId,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <section>
          <input
            type="text"
            placeholder="Title"
            className="input"
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
            id="movieDescription"
            className="input"
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
            className="input"
            id="imgUrl"
            value={imgUrl}
            onChange={(event) => (
              this.handleChange(event)
            )}
            required
          />
        </section>

        <section>
          <input
            type="text"
            placeholder="siteUrl"
            className="input"
            id="siteUrl"
            value={siteUrl}
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
            className="input"
            id="imdbId"
            value={imdbId}
            onChange={(event) => (
              this.handleChange(event)
            )}
            required
          />
        </section>

        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    );
  }
}
