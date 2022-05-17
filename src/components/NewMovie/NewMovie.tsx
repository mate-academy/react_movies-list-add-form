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

  isInputEmpty: boolean,
  errorContext: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',

    isInputEmpty: false,
    errorContext: '',
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

    if (
      !title
      || !imgUrl
      || !imdbUrl
      || !imdbId
      || !imgUrl
      || !imdbUrl
    ) {
      this.setState((state) => ({
        ...state,
        isInputEmpty: true,
        errorContext: 'Please fill all fields',
      }));

      return;
    }

    if (
      title
      && imgUrl
      && imdbUrl
      && imdbId
      && imgUrl
      && imdbUrl
    ) {
      this.setState((state) => ({
        ...state,
        isInputEmpty: false,
        errorContext: '',
      }));

      return;
    }

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
      isInputEmpty,
      errorContext,
    } = this.state;

    return (
      <form
        onSubmit={(event) => {
          this.handleSubmit(event);
        }}
        onBlur={this.handleSubmit}
        className="sidebar__form"
      >

        {isInputEmpty && (
          <p className="sidebar__error">{errorContext}</p>
        )}

        <label>
          <p className="sidebar__input-description">Enter title:</p>
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
          <p className="sidebar__input-description">Enter description:</p>
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
          <p className="sidebar__input-description">Enter imgUrl:</p>
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
          <p className="sidebar__input-description">Enter imdbUrl:</p>
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
          <p className="sidebar__input-description">Enter imdbId:</p>
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
