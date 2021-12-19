import React, { Component } from 'react';
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

    this.setState((state) => ({
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
  };

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state.newMovie;

    return (
      <div className="newMovie newMovie__container">
        <form
          className="newMovie__form"
          onSubmit={this.handleSubmit}
        >
          <div className="form__title">
            <label htmlFor="title">
              Title
              <input
                className="input"
                type="text"
                id="title"
                placeholder="Enter movie title"
                value={title}
                name="title"
                onChange={this.handleChange}
                required
              />
            </label>
          </div>

          <div className="form__description">
            <label htmlFor="description">
              Description
              <textarea
                className="textarea"
                name="description"
                id="description"
                cols={30}
                rows={10}
                value={description}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>

          <div className="form__imgUrl">
            <label htmlFor="imgUrl">
              Image URL
              <input
                className="input"
                type="text"
                id="imgUrl"
                name="imgUrl"
                placeholder="Add image URL"
                value={imgUrl}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>

          <div className="form__imdbUrl">
            <label htmlFor="imdbUrl">
              <input
                className="input"
                type="text"
                id="imdbUrl"
                name="imdbUrl"
                placeholder="Add IMDB URL"
                value={imdbUrl}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>

          <div className="form__imdbId">
            <label htmlFor="imdbId">
              <input
                className="input"
                type="text"
                id="imdbId"
                name="imdbId"
                placeholder="Add IMBD ID"
                value={imdbId}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>

          <button
            className="form__button"
            type="submit"
          >
            Add movie
          </button>
        </form>
      </div>
    );
  }
}
