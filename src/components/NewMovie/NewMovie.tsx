import React, { Component } from 'react';
import { Field } from '../Field';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  [key: string]: string;
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

    this.setState({ [key]: value });
  };

  handleSubmit: React.FormEventHandler = (e) => {
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

    e.preventDefault();
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
      <form onSubmit={this.handleSubmit} className="container box">
        <Field
          type="text"
          id="title"
          value={title}
          label="Title"
          onChange={this.handleChange}
          required
        />
        <Field
          type="text"
          id="description"
          value={description}
          label="Description"
          onChange={this.handleChange}
          required
        />
        <Field
          type="text"
          id="imgUrl"
          value={imgUrl}
          label="Image Link"
          onChange={this.handleChange}
        />
        <Field
          type="text"
          id="imdbUrl"
          value={imdbUrl}
          label="IMDB Link"
          onChange={this.handleChange}
        />
        <Field
          type="text"
          id="imdbId"
          value={imdbId}
          label="IMDB id"
          onChange={this.handleChange}
        />
        <div className="control">
          <button type="submit" className="button is-link">Submit</button>
        </div>
      </form>
    );
  }
}
