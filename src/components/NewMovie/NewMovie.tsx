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

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newMovieName: event.target.value,
    });
  };

  handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      movieDescription: event.target.value,
    });
  };

  handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imgLink: event.target.value,
    });
  };

  handleSiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      siteLink: event.target.value,
    });
  };

  handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      movieId: event.target.value,
    });
  };

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
            value={newMovieName}
            onChange={this.handleNameChange}
            required
          />
        </section>

        <section>
          <input
            type="text"
            placeholder="Description"
            className="form"
            value={movieDescription}
            onChange={this.handleDescriptionChange}
            required
          />
        </section>

        <section>
          <input
            type="text"
            placeholder="imgUrl"
            className="form"
            value={imgLink}
            onChange={this.handlePictureChange}
            required
          />
        </section>

        <section>
          <input
            type="text"
            placeholder="imdbUrl"
            className="form"
            value={siteLink}
            onChange={this.handleSiteChange}
            required
          />
        </section>

        <section>
          <input
            type="text"
            placeholder="imdbId"
            className="form"
            value={movieId}
            onChange={this.handleIdChange}
            required
          />
        </section>

        <button type="submit" className="form button">Add</button>
      </form>
    );
  }
}
