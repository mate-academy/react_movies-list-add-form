import React, { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
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

  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value,
    } as State));
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

  submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    this.clearForm();
    this.props.onAdd({ ...this.state });
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
      <form onSubmit={this.submitForm}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={this.onChangeHandler}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={this.onChangeHandler}
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.onChangeHandler}
          required
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.onChangeHandler}
          required
        />
        <input
          type="text"
          name="imdbId"
          placeholder="imdbId"
          value={imdbId}
          onChange={this.onChangeHandler}
          required
        />
        <button type="submit">
          Add movie
        </button>
      </form>
    );
  }
}
