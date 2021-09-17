import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

interface State {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

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
    } as { [K in keyof State]: State[K] });
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

  validate = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return !title || !description || !imgUrl || !imdbId || !imdbUrl;
  };

  handleSubmit = (event: React.FormEvent) => {
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

    this.clearState();
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
      <div className="NewMovie">
        <form
          onSubmit={this.handleSubmit}
          className="NewMovie__form"
          action=""
        >
          <label htmlFor="title">
            <input
              onChange={this.handleChange}
              type="text"
              name="title"
              value={title}
              className="NewMovie__input form-control"
              id="title"
              placeholder="title"
              required
            />
          </label>

          <label htmlFor="description">
            <input
              onChange={this.handleChange}
              type="text"
              name="description"
              value={description}
              className="NewMovie__input form-control"
              id="description"
              placeholder="description"
              required
            />
          </label>

          <label htmlFor="imgUrl">
            <input
              onChange={this.handleChange}
              type="text"
              name="imgUrl"
              value={imgUrl}
              className="NewMovie__input form-control"
              id="imgUrl"
              placeholder="imgUrl"
              required
            />
          </label>

          <label htmlFor="imdbUrl">
            <input
              onChange={this.handleChange}
              type="text"
              name="imdbUrl"
              value={imdbUrl}
              className="NewMovie__input form-control"
              id="imdbUrl"
              placeholder="imdbUrl"
              required
            />
          </label>

          <label htmlFor="imdbId">
            <input
              onChange={this.handleChange}
              type="text"
              name="imdbId"
              value={imdbId}
              className="NewMovie__input form-control"
              id="imdbId"
              placeholder="imdbId"
              required
            />
          </label>

          <button
            type="submit"
            name="add"
            className="button btn btn-primary"
            disabled={this.validate()}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
