import React, { Component } from 'react';
import { FormInput } from '../FormInput';

type Props = {
  add: (movie: Movie) => void;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {},
  };

  changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;

    this.setState({ [name]: value } as Omit<State, 'errors' | 'isFormValid'>);
    if (value) {
      this.setState(currentState => {
        return {
          errors: {
            ...currentState.errors,
            [name]: false,
          },
        };
      });
    }
  };

  addError = (name: keyof State) => {
    this.setState(currentState => {
      return {
        // isFormValid: false,
        errors: {
          ...currentState.errors,
          [name]: true,
        },
      };
    });
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  formValidation = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title) {
      this.addError('title');

      return false;
    }

    if (!imgUrl) {
      this.addError('imgUrl');

      return false;
    }

    if (!imdbUrl) {
      this.addError('imdbUrl');

      return false;
    }

    if (!imdbId) {
      this.addError('imdbId');

      return false;
    }

    return true;
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (this.formValidation()) {
      this.props.add(newMovie);
      this.clearState();
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form-label">
        <FormInput
          name="title"
          onChange={this.changeValue}
          addError={this.addError}
          value={this.state.title}
          errors={this.state.errors}
        />

        <FormInput
          name="description"
          onChange={this.changeValue}
          addError={this.addError}
          value={this.state.description}
          errors={this.state.errors}
        />

        <FormInput
          name="imgUrl"
          onChange={this.changeValue}
          addError={this.addError}
          value={this.state.imgUrl}
          errors={this.state.errors}
        />

        <FormInput
          name="imdbUrl"
          onChange={this.changeValue}
          addError={this.addError}
          value={this.state.imdbUrl}
          errors={this.state.errors}
        />

        <FormInput
          name="imdbId"
          onChange={this.changeValue}
          addError={this.addError}
          value={this.state.imdbId}
          errors={this.state.errors}
        />

        <button
          type="submit"
          className="btn btn-primary"
        >
          Add movie
        </button>

      </form>
    );
  }
}
