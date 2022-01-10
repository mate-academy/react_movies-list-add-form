/* eslint-disable no-console */
import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addFilm: (newMovie: Movie) => void,
};

type State = {
  newMovie: Movie,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  handleSubmitForm = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  handleClick = () => {
    this.props.addFilm(this.state.newMovie);
    this.clearForm();
  };

  clearForm = () => {
    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    return (
      <form className="form" onSubmit={this.handleSubmitForm}>
        <h2 className="form__title">Add film</h2>
        <input
          className="form__input"
          type="text"
          placeholder="Enter title"
          name="title"
          value={title}
          onChange={(event) => this.handleChange(event)}
        />
        <input
          className="form__input"
          type="text"
          placeholder="Enter description"
          name="description"
          value={description}
          onChange={(event) => this.handleChange(event)}
        />
        <input
          className="form__input"
          type="text"
          placeholder="Enter imgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={(event) => this.handleChange(event)}
        />
        <input
          className="form__input"
          type="text"
          placeholder="Enter imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          onChange={(event) => this.handleChange(event)}
        />
        <input
          className="form__input"
          type="text"
          placeholder="Enter imdbId"
          name="imdbId"
          value={imdbId}
          onChange={(event) => this.handleChange(event)}
        />
        <button
          type="submit"
          className="form__input form__btn"
          onClick={this.handleClick}
        >
          Add new film
        </button>
      </form>
    );
  }
}
