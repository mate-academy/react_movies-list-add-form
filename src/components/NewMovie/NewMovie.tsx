import React, { Component } from 'react';

type Props = {
  movies: Movie[],
  addMovie: (newMovie: Movie) => void
};
type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [id]: value,
    }));
  }

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        className="addMovie-form"
        onSubmit={this.handleFormSubmit}
      >
        <legend className="addMovie-form__title">
          Add movie
        </legend>
        <label
          htmlFor="title"
          className="addMovie-form__text"
        >
          title:
          <input
            type="text"
            id="title"
            className="addMovie-form__input"
            value={title}
            onChange={(event) => (
              this.handleChange(event)
            )}
          />
        </label>
        <label
          htmlFor="description"
          className="addMovie-form__text"
        >
          description:
          <input
            type="text"
            id="description"
            className="addMovie-form__input"
            value={description}
            onChange={(event) => (
              this.handleChange(event)
            )}
          />
        </label>
        <label
          htmlFor="imgUrl"
          className="addMovie-form__text"
        >
          imgUrl:
          <input
            type="text"
            id="imgUrl"
            className="addMovie-form__input"
            value={imgUrl}
            onChange={(event) => (
              this.handleChange(event)
            )}
          />
        </label>
        <label
          htmlFor="imdbUrl"
          className="addMovie-form__text"
        >
          imdbUrl:
          <input
            type="text"
            id="imdbUrl"
            className="addMovie-form__input"
            value={imdbUrl}
            onChange={(event) => (
              this.handleChange(event)
            )}
          />
        </label>
        <label
          htmlFor="imdbId"
          className="addMovie-form__text"
        >
          imdbId:
          <input
            type="text"
            id="imdbId"
            className="addMovie-form__input"
            value={imdbId}
            onChange={(event) => (
              this.handleChange(event)
            )}
          />
        </label>
        <button
          type="submit"
          className="addMovie-form__submit"
        >
          submit
        </button>
      </form>
    );
  }
}
