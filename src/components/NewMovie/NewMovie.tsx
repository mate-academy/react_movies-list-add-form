import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

type InputEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  inputHandler = (event: InputEvent) => {
    const { name, value } = event.target;

    this.setState((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
    return (
      <form
        className="Form"
        onSubmit={this.submitHandler}
      >
        <h2 className="Form__heading">You can add new movie here</h2>

        <div>
          <label htmlFor="new-movie-title">
            <p className="Form__title">Enter title: </p>
            <input
              id="new-movie-title"
              type="text"
              name="title"
              placeholder="Movie title"
              className="Form__input"
              value={this.state.title}
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <div>
          <p className="Form__title">Add description here: </p>
          <textarea
            id="new-movie-description"
            name="description"
            placeholder="Movie description"
            className="Form__input"
            rows={10}
            value={this.state.description}
            onChange={this.inputHandler}
          />
        </div>

        <div>
          <label htmlFor="new-movie-imgUrl">
            <p className="Form__title">Add link to movie poster: </p>
            <input
              id="new-movie-imgUrl"
              type="text"
              name="imgUrl"
              className="Form__input"
              placeholder="Link to movie poster"
              value={this.state.imgUrl}
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <div>
          <label htmlFor="new-movie-imdbUrl">
            <p className="Form__title">Add link to movie on IMDB: </p>
            <input
              id="new-movie-imdbUrl"
              type="text"
              name="imdbUrl"
              className="Form__input"
              placeholder="Link to movie on IMDB"
              value={this.state.imdbUrl}
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <div>
          <label htmlFor="new-movie-imdbId">
            <p className="Form__title">Enter movie ID from IMDB: </p>
            <input
              id="new-movie-imdbId"
              type="text"
              name="imdbId"
              className="Form__input"
              placeholder="IMDB ID"
              value={this.state.imdbId}
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <button type="submit" className="Form__button">
          Add movie
        </button>
      </form>
    );
  }
}
