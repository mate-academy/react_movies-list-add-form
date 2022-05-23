import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (newItem: Movie) => void
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends Component <Props, State> {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <div className="wrapper-movie">
        <h1 className="wrapper-movie__title">
          ADD NEW MOVIE
        </h1>
        <form
          className="movie-form"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="movie-form__item"
            data-cy="form-title"
            value={title}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="Description"
            placeholder="Description"
            className="movie-form__item"
            data-cy="form-description"
            value={description}
            onChange={(event) => {
              this.setState({
                description: event.target.value,
              });
            }}
            required
          />
          <input
            type="text"
            name="ImgUrl"
            placeholder="ImgUrl"
            className="movie-form__item"
            data-cy="form-imgUrl"
            value={imgUrl}
            onChange={(event) => {
              this.setState({
                imgUrl: event.target.value,
              });
            }}
            required
          />
          <input
            type="text"
            name="imdbUrl"
            placeholder="imdbUrl"
            className="movie-form__item"
            data-cy="form-imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="imdbId"
            placeholder="imdbId"
            className="movie-form__item"
            data-cy="form-imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
          <button
            type="submit"
            className="button-form"
            data-cy="form-submit-button"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
