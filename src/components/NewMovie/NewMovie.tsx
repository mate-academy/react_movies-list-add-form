/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as { [key in keyof State]: string });
  };

  createMovie = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.clearState();
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

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <article className="Form">
        <h2 className="Form__title">
          Add movie
        </h2>
        <form onSubmit={this.createMovie} className="Form__info">
          <label htmlFor="title" className="Form__label">
            Title
          </label>
          <input
            className="Form__input"
            id="title"
            type="text"
            name="title"
            required
            value={title}
            onChange={this.handleChange}
          />
          <label htmlFor="description" className="Form__label">
            Description
          </label>
          <textarea
            className="Form__input"
            id="description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <label htmlFor="imgUrl" className="Form__label">
            imgUrl
          </label>
          <input
            className="Form__input"
            id="imgUrl"
            type="text"
            name="imgUrl"
            required
            value={imgUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="imdbUrl" className="Form__label">
            imdbUrl
          </label>
          <input
            className="Form__input"
            id="imdbUrl"
            type="text"
            name="imdbUrl"
            required
            value={imdbUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="imdbId" className="Form__label">
            imdbId
          </label>
          <input
            className="Form__input"
            id="imdbId"
            type="text"
            required
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
          <button type="submit" className="Form__button">
            Add
          </button>
        </form>
      </article>
    );
  }
}
