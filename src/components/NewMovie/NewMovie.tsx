import { Component, FormEvent } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
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

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    const { onAdd } = this.props;

    onAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handlerInputChange = (value: string, inputName: string) => {
    this.setState((state) => ({
      ...state,
      [inputName]: value,
    }));
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
      <form
        onSubmit={(event) => {
          this.handleSubmit(event);
        }}
        className="sidebar__form"
      >
        <label>
          Enter title:
          <input
            name="title"
            value={title}
            type="text"
            className="sidebar__input"
            onChange={({ target }) => {
              this.handlerInputChange(target.value, target.name);
            }}
          />
        </label>

        <label>
          Enter description:
          <input
            name="description"
            value={description}
            type="text"
            className="sidebar__input"
            onChange={({ target }) => {
              this.handlerInputChange(target.value, target.name);
            }}
          />
        </label>

        <label>
          Enter imgUrl:
          <input
            name="imgUrl"
            value={imgUrl}
            type="text"
            className="sidebar__input"
            onChange={({ target }) => {
              this.handlerInputChange(target.value, target.name);
            }}
          />
        </label>

        <label>
          Enter imdbUrl:
          <input
            name="imdbUrl"
            value={imdbUrl}
            type="text"
            className="sidebar__input"
            onChange={({ target }) => {
              this.handlerInputChange(target.value, target.name);
            }}
          />
        </label>

        <label>
          Enter imdbId:
          <input
            name="imdbId"
            value={imdbId}
            type="text"
            className="sidebar__input"
            onChange={({ target }) => {
              this.handlerInputChange(target.value, target.name);
            }}
          />
        </label>

        <button
          type="submit"
          className="sidebar__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}
