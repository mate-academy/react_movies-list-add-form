import { Component } from 'react';

import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void;
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

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
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

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onAdd(this.state.newMovie);
    this.clearForm();
  }

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state.newMovie;

    return (
      <div className="NewMovie">
        <form
          className="NewMovie__form Form"
          onSubmit={this.handleSubmit}
        >
          <div className="Form__title">
            <label
              htmlFor="title"
            >
              Title
              <input
                className="input"
                type="text"
                required
                id="title"
                placeholder="Enter movie title"
                value={title}
                name="title"
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div className="Form__description">
            <label
              htmlFor="description"
            >
              Description
              <textarea
                className="input"
                required
                id="description"
                placeholder="Movie description..."
                value={description}
                name="description"
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div className="Form__imgUrl">
            <label
              htmlFor="imgUrl"
            >
              Image URL
              <input
                className="input"
                type="text"
                required
                id="imgUrl"
                placeholder="Add image URL"
                value={imgUrl}
                name="imgUrl"
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div className="Form__imdbUrl">
            <label
              htmlFor="imdbUrl"
            >
              IMDB URL
              <input
                className="input"
                type="text"
                required
                id="imdbUrl"
                placeholder="Add IMDB URL"
                value={imdbUrl}
                name="imdbUrl"
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div className="Form__imdbId">
            <label
              htmlFor="imdbId"
            >
              IMDB ID
              <input
                className="input"
                type="text"
                required
                id="imdbId"
                placeholder="Add IMDB ID"
                value={imdbId}
                name="imdbId"
                onChange={this.handleChange}
              />
            </label>
          </div>

          <button
            type="submit"
            className="button is-success"
          >
            Add movie
          </button>
        </form>
      </div>
    );
  }
}
