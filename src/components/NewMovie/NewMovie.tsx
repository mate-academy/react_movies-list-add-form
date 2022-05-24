import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};
type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  errorImg: boolean;
  errorImdb: boolean;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errorImg: false,
    errorImdb: false,
  };

  onSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    if (!this.state.errorImdb && !this.state.errorImg) {
      this.props.onAdd(newMovie);

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  validImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (regExp.test(event.target.value)) {
      this.setState(state => ({
        ...state,
        errorImg: false,
        [event.target.name]: event.target.value,
      }));
    } else {
      this.setState(state => ({
        ...state,
        errorImg: true,
        [event.target.name]: event.target.value,
      }));
    }
  };

  validImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (regExp.test(event.target.value)) {
      this.setState(state => ({
        ...state,
        errorImdb: false,
        [event.target.name]: event.target.value,
      }));
    } else {
      this.setState(state => ({
        ...state,
        errorImdb: true,
        [event.target.name]: event.target.value,
      }));
    }
  };

  render() {
    return (

      <form
        onSubmit={this.onSumbit}
        className="form"
      >
        <h1 className="form__title">
          Add new movie
        </h1>
        <input
          className="form__input"
          name="title"
          type="text"
          value={this.state.title}
          placeholder="Enter title"
          onChange={this.onChange}
          required
        />
        <input
          className="form__input"
          type="text"
          name="description"
          value={this.state.description}
          placeholder="Enter description"
          onChange={this.onChange}
        />
        <div>
          <input
            className="form__input"
            type="text"
            name="imgUrl"
            value={this.state.imgUrl}
            placeholder="Enter image URL"
            onChange={this.validImgUrl}
            required
          />
          {this.state.errorImg && (
            <span className="error">incorrect url</span>
          )}
        </div>
        <div>
          <input
            className="form__input"
            type="text"
            name="imdbUrl"
            value={this.state.imdbUrl}
            placeholder="Enter Imdb URL"
            onChange={this.validImdbUrl}
            required
          />
          {this.state.errorImdb && (
            <span className="error">incorrect url</span>
          )}
        </div>
        <input
          className="form__input"
          type="text"
          name="imdbId"
          value={this.state.imdbId}
          placeholder="Enter Imdb Id"
          onChange={this.onChange}
          required
        />
        <button
          type="submit"
          className="form__button"
        >
          Add
        </button>
      </form>
    );
  }
}
