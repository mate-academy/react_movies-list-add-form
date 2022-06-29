import React, { Component } from 'react';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as { [Key in keyof State]: State[Key] });
  };

  hendleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { onAdd } = this.props;

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

    onAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  setInput = (name: string, value: string) => {
    return (
      <input
        type="text"
        data-cy={`form-${name}`}
        placeholder={name}
        required
        name={name}
        value={value}
        id={name}
        onChange={this.handleChange}
      />
    );
  };

  render() {
    return (
      <form
        className="NewMovie"
        onSubmit={this.hendleSubmit}
      >
        {this.setInput('title', this.state.title)}
        {this.setInput('description', this.state.description)}
        {this.setInput('imgUrl', this.state.imgUrl)}
        {this.setInput('imdbUrl', this.state.imdbUrl)}
        {this.setInput('imdbId', this.state.imdbId)}

        <button type="submit">
          Add movie
        </button>
      </form>
    );
  }
}
