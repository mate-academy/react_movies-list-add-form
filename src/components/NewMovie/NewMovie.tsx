import React, { Component } from 'react';
import { Field } from '../Field';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  [key in keyof Movie]: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      id: key,
      value,
    } = e.currentTarget;

    this.setState(state => ({ ...state, [key]: value }));
  };

  handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

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

    this.props.addMovie(newMovie);
    this.clearForm();
  };

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleValidate = (key: string, value: string): boolean => {
    switch (key) {
      case 'title':
      case 'imdbId':
        return !!value.trim();

      case 'imgUrl':
      case 'imdbUrl':
        return value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/) !== null;

      default:
        return true;
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

    const isValid = Object.entries(this.state)
      .every(keyPair => this.handleValidate(...keyPair));

    return (
      <form onSubmit={this.handleSubmit} className="container box">
        <Field
          type="text"
          id="title"
          value={title}
          label="Title"
          onChange={this.handleChange}
          onValidate={this.handleValidate}
          required
        />
        <Field
          type="text"
          id="description"
          value={description}
          label="Description"
          onChange={this.handleChange}
        />
        <Field
          type="text"
          id="imgUrl"
          value={imgUrl}
          label="Image Link"
          onChange={this.handleChange}
          onValidate={this.handleValidate}
          required
        />
        <Field
          type="text"
          id="imdbUrl"
          value={imdbUrl}
          label="IMDB Link"
          onChange={this.handleChange}
          onValidate={this.handleValidate}
          required
        />
        <Field
          type="text"
          id="imdbId"
          value={imdbId}
          label="IMDB id"
          onChange={this.handleChange}
          onValidate={this.handleValidate}
          required
        />
        <div className="control">
          <button
            type="submit"
            className="button is-link"
            disabled={!isValid}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
