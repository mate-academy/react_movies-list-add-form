import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  title?: string;
  description?: string;
  imgUrl?: string;
  imdbUrl?: string;
  imdbId?: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  clearInput = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
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

    this.clearInput();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <fieldset>
          <legend>Add movie</legend>
          <input
            type="text"
            className="form__input"
            name="title"
            placeholder="Movie title"
            autoComplete="off"
            value={this.state.title}
            onChange={this.changeInput}
          />

          <input
            type="text"
            className="form__input"
            name="description"
            placeholder="Movie description"
            autoComplete="off"
            value={this.state.description}
            onChange={this.changeInput}
          />

          <input
            type="text"
            className="form__input"
            name="imgUrl"
            placeholder="Movie imgUrl"
            autoComplete="off"
            value={this.state.imgUrl}
            onChange={this.changeInput}
          />

          <input
            type="text"
            className="form__input"
            name="imdbUrl"
            placeholder="Movie imdbUrl"
            autoComplete="off"
            value={this.state.imdbUrl}
            onChange={this.changeInput}
          />

          <input
            type="text"
            className="form__input"
            name="imdbId"
            placeholder="Movie imdbId"
            value={this.state.imdbId}
            onChange={this.changeInput}
          />

          <button
            type="submit"
          >
            Add
          </button>
        </fieldset>
      </form>
    );
  }
}
