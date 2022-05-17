import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void,
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

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onAdd(this.state);

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
      imdbUrl,
      imgUrl,
      imdbId,
    } = this.state;

    return (
      <div>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <h1 className="form__title">
            Add a new movie
          </h1>

          <input
            className="form__input"
            type="text"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={this.changeHandler}
            required
          />

          <input
            className="form__input"
            type="text"
            name="description"
            placeholder="Enter a description"
            value={description}
            onChange={this.changeHandler}
          />

          <input
            className="form__input"
            type="text"
            name="imdbUrl"
            placeholder="Add a imdbUrl"
            value={imdbUrl}
            onChange={this.changeHandler}
            required
          />

          <input
            className="form__input"
            type="text"
            name="imgUrl"
            placeholder="Add a imgUrl"
            value={imgUrl}
            onChange={this.changeHandler}
            required
          />

          <input
            className="form__input"
            type="text"
            name="imdbId"
            placeholder="Add a imdbId"
            value={imdbId}
            onChange={this.changeHandler}
            required
          />

          <button type="submit" className="form__button">
            Add
          </button>
        </form>
      </div>
    );
  }
}
