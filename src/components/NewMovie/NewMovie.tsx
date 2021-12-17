import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onSubmit(movie: Movie): void;
};

type State = {
  newMovie: Movie,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    this.props.onSubmit({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.clearForm();
  };

  clearForm = () => {
    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    return (
      <form
        className="form__content"
        action="POST"
        onSubmit={this.handleSubmit}
      >
        <div className="form__input-area">
          <label htmlFor="title">
            Name of the movie:
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title"
              className="form__input"
              required
              value={title}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className="form__input-area">
          <label htmlFor="title">
            Description:
            <input
              type="text"
              id="title"
              name="description"
              placeholder="Enter description"
              className="form__input"
              required
              value={description}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className="form__input-area">
          <label htmlFor="title">
            imgUrl:
            <input
              type="text"
              id="title"
              name="imgUrl"
              placeholder="Enter image URL"
              className="form__input"
              required
              value={imgUrl}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className="form__input-area">
          <label htmlFor="title">
            imdbUrl:
            <input
              type="text"
              id="title"
              name="imdbUrl"
              placeholder="Enter imdb URL"
              className="form__input"
              required
              value={imdbUrl}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className="form__input-area">
          <label htmlFor="title">
            imdbId:
            <input
              type="text"
              id="title"
              name="imdbId"
              placeholder="Enter imdb id"
              className="form__input"
              required
              value={imdbId}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <button type="submit" className="form__button">
          Add movie
        </button>
      </form>
    );
  }
}
