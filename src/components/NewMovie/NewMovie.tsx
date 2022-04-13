import React from 'react';
import { FormInput } from '../FormInput/FormInput';
import { regex } from '../../regexp/regexp';

import './NewMovie.scss';

type Props = {
  onAdd: (x: Movie) => void
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  movie: Movie | null;
};

const isTextValid = (text: string) => text.length > 0;

const isUrlValid = (url: string) => regex.test(url);

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    movie: null,
  };

  isValid = () => (
    isTextValid(this.state.title)
    && isUrlValid(this.state.imgUrl)
    && isUrlValid(this.state.imdbUrl)
    && isTextValid(this.state.imdbId)
  );

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      movie: null,
    });
  };

  createMovie = () => {
    if (this.isValid()) {
      this.setState(state => ({
        movie: {
          title: state.title,
          description: state.description,
          imgUrl: state.imgUrl,
          imdbUrl: state.imdbUrl,
          imdbId: state.imdbId,
        },
      }));
    }
  };

  addMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { movie } = this.state;

    if (movie) {
      this.props.onAdd(movie);
      this.clearState();
    }
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
        className="form sidebar__form"
        onSubmit={this.addMovie}
      >
        <FormInput
          name="title"
          value={title}
          onChange={this.handleChange}
          isValid={isTextValid(title)}
        />
        <textarea
          className="input form__input input--textarea"
          name="description"
          value={description}
          onChange={this.handleChange}
          placeholder="Please enter a description"
        />
        <FormInput
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          isValid={isUrlValid(imgUrl)}
        />
        <FormInput
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          isValid={isUrlValid(imdbUrl)}
        />
        <FormInput
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          isValid={isTextValid(imdbId)}
        />
        <button
          type="submit"
          className="button form__button"
          onClick={this.createMovie}
          disabled={!this.isValid()}
        >
          Add film
        </button>
      </form>
    );
  }
}
