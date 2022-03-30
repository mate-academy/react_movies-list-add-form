import React from 'react';
import { simpleValidation, urlsValidation } from '../../heplers/validators';
import { ChangeEvent, InputConditions } from '../../types/customTypes';
//
import { Input } from '../Input/Input';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imdbId: string,
  imgUrl: string,
  imdbUrl: string,
  inputConditions: InputConditions;
};

type StateKeys = keyof State;

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imdbId: '',
    imgUrl: '',
    imdbUrl: '',

    inputConditions: {
      title: null,
      imdbId: null,
      imgUrl: null,
      imdbUrl: null,
    },
  };

  reset = () => {
    this.setState({
      title: '',
      description: '',
      imdbId: '',
      imgUrl: '',
      imdbUrl: '',
      inputConditions: {
        title: null,
        imdbId: null,
        imgUrl: null,
        imdbUrl: null,
      },
    });
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = event.target;
    const isUrl = name.includes('Url');

    if (isUrl) {
      this.setState(state => ({
        ...state,
        inputConditions: {
          ...state.inputConditions,
          [name]: urlsValidation(state[name as StateKeys] as StateKeys),
        },
      }));
    } else {
      this.setState(state => ({
        ...state,
        inputConditions: {
          ...state.inputConditions,
          [name]: simpleValidation(state[name as StateKeys] as StateKeys),
        },
      }));
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMovie = {
      ...this.state,
    };

    this.props.onAdd(newMovie);
    this.reset();
  };

  handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  render() {
    const {
      title,
      description,
      imdbId,
      imgUrl,
      imdbUrl,
      inputConditions,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="new-movie__form"
      >
        <Input
          name="title"
          value={title}
          onChange={this.handleChange}
          onblur={this.handleBlur}
          conditions={inputConditions}
        />
        <textarea
          className="new-movie__input"
          name="description"
          value={description}
          placeholder="description"
          onChange={this.handleChange}
        />
        <Input
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          onblur={this.handleBlur}
          conditions={inputConditions}
        />
        <Input
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          onblur={this.handleBlur}
          conditions={inputConditions}
        />
        <Input
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          onblur={this.handleBlur}
          conditions={inputConditions}
        />
        <button
          type="submit"
          disabled={Object.values(inputConditions).some(condition => condition === false
            || condition === null)}
          className="new-movie__button"
        >
          Add
        </button>
      </form>
    );
  }
}
