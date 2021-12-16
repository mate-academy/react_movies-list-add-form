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
  };

  render() {
    const {
      imdbId, imdbUrl, imgUrl, title, description,
    } = this.state.newMovie;

    return (
      <div className="newMovie newMovie__wrapper">
        <form
          className="newMovie__form"
          onSubmit={this.handleSubmit}
        >
          <div className="newMovie__item">
            <label
              htmlFor="title"
              className="newMovie__item-wrapper"
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

          <div className="newMovie__item">
            <label
              htmlFor="description"
              className="newMovie__item-wrapper"
            >
              Description
              <textarea
                className="textarea"
                required
                id="description"
                value={description}
                cols={30}
                rows={5}
                name="description"
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div className="newMovie__item">
            <label
              htmlFor="imgUrl"
              className="newMovie__item-wrapper"
            >
              imgUrl

              <input
                required
                className="input"
                type="text"
                id="imgUrl"
                value={imgUrl}
                name="imgUrl"
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div className="newMovie__item">
            <label
              htmlFor="imdbUrl"
              className="newMovie__item-wrapper"
            >
              imdbUrl
              <input
                required
                className="input"
                type="text"
                id="imdbUrl"
                name="imdbUrl"
                value={imdbUrl}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div className="newMovie__item">
            <label
              htmlFor="imdbId"
              className="newMovie__item-wrapper"
            >
              imdbId
              <input
                className="input"
                required
                type="text"
                id="imdbId"
                name="imdbId"
                value={imdbId}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <button
            type="submit"
            className="button is-success"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
