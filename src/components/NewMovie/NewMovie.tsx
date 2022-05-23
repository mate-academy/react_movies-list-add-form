import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void;
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

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    return this.props.onAdd(newMovie);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label className="form__label">
          Title:
          <input
            type="text"
            placeholder="Enter a title here"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            required
            className="form__input"
          />
        </label>

        <label className="form__label">
          Description:
          <input
            type="text"
            name="description"
            value={this.state.description}
            placeholder="Enter a description here"
            onChange={this.handleChange}
            className="form__input"
          />
        </label>

        <label className="form__label">
          ImgUrl:
          <input
            type="text"
            name="imgUrl"
            value={this.state.imgUrl}
            placeholder="Enter a imgUrl here"
            onChange={this.handleChange}
            required
            className="form__input"
          />
        </label>

        <label className="form__label">
          ImdbUrl:
          <input
            type="text"
            name="imdbUrl"
            value={this.state.imdbUrl}
            placeholder="Enter a imdbUrl here"
            onChange={this.handleChange}
            required
            className="form__input"
          />
        </label>

        <label className="form__label">
          ImdbId:
          <input
            type="text"
            name="imdbId"
            value={this.state.imdbId}
            placeholder="Enter a imdbId here"
            onChange={this.handleChange}
            required
            className="form__input"
          />
        </label>

        <button type="submit" className="form__button">
          Add movie
        </button>
      </form>
    );
  }
}
