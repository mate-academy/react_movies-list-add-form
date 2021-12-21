import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addFilm: (newMovie: Movie) => void;
};

type State = {
  newMovie: Movie;
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.addFilm(this.state.newMovie);
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
      <form onSubmit={this.handleSubmit}>
        <div className="wrap">
          <span>Movie title</span>
          <input
            type="text"
            name="title"
            placeholder="Add title"
            onChange={this.handleChange}
            value={title}
          />
        </div>

        <div className="wrap">
          <span>Movie description</span>
          <textarea
            name="description"
            placeholder="Add description"
            onChange={this.handleChange}
            value={description}
          />
        </div>

        <div className="wrap">
          <span>Movie imgUrl</span>
          <input
            type="text"
            name="imgUrl"
            placeholder="Add imgUrl"
            onChange={this.handleChange}
            value={imgUrl}
          />
        </div>

        <div className="wrap">
          <span>Movie imdbUrl </span>
          <input
            type="text"
            name="imdbUrl"
            placeholder="Add imdbUrl"
            onChange={this.handleChange}
            value={imdbUrl}
          />
        </div>

        <div className="wrap">
          <span>Movie imdbId</span>
          <input
            type="text"
            name="imdbId"
            placeholder="Add imdbId"
            onChange={this.handleChange}
            value={imdbId}
          />
        </div>

        <button type="submit">
          Add new movie
        </button>
      </form>
    );
  }
}
