/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  newMovie: Movie;
};

export class NewMovie extends React.Component<Props, State> {
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
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      newMovie: {
        ...state.newMovie,
        [name]: value.trimLeft(),
      },
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    this.props.onAdd(this.state.newMovie);

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
        className="form-newMovie"
        onSubmit={this.handleSubmit}
      >
        <div className="form-newMovie__wrap">
          <label htmlFor="title">Title</label>
          <input
            required
            className="input"
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-newMovie__wrap">
          <label htmlFor="description">Description</label>
          <textarea
            className="textarea"
            required
            name="description"
            id="description"
            value={description}
            rows={3}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-newMovie__wrap">
          <label htmlFor="imgUrl">ImgUrl</label>
          <input
            required
            className="input"
            type="text"
            id="imgUrl"
            value={imgUrl}
            name="imgUrl"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-newMovie__wrap">
          <label htmlFor="imdbUrl">ImdbUrl</label>
          <input
            required
            className="input"
            type="text"
            id="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-newMovie__wrap">
          <label htmlFor="imdbId">ImdbId</label>
          <input
            className="input"
            required
            type="text"
            id="imdbId"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
        </div>

        <button
          type="submit"
          className="button is-info"
        >
          Add a new movie
        </button>
      </form>
    );
  }
}
