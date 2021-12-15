/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie:Movie) => void;
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
    e:React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

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

  handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    this.props.onAdd(this.state.newMovie);
    this.clearForm();
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
        className="form-addMovie"
        onSubmit={this.handleSubmit}
      >
        <div className="form-addMovie__input-wrap">
          <label htmlFor="title">Title</label>
          <input
            required
            className="input"
            type="text"
            id="title"
            placeholder="Enter movie title"
            value={title}
            name="title"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-addMovie__input-wrap">
          <label htmlFor="description">Description</label>
          <textarea
            className="textarea"
            required
            name="description"
            id="description"
            value={description}
            cols={30}
            rows={5}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-addMovie__input-wrap">
          <label htmlFor="imgUrl">imgUrl</label>
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
        <div className="form-addMovie__input-wrap">
          <label htmlFor="imdbUrl">imdbUrl</label>
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
        <div className="form-addMovie__input-wrap">
          <label htmlFor="imdbId">imdbId</label>
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
          className="button is-success"
        >
          Add
        </button>
      </form>
    );
  }
}
