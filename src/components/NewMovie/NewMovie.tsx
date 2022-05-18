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

  isEmptyTitle: boolean,
  isEmptyImgUrl:boolean,
  isEmptyImdbUrl: boolean,
  isEmptyImdbId: boolean,

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

    isEmptyTitle: false,
    isEmptyImgUrl: false,
    isEmptyImdbUrl: false,
    isEmptyImdbId: false,

    isInputEmpty: false,
    errorContext: '',
  };

  isEmptyTitle = (value: string) => {
    if (!value) {
      this.setState((state) => ({
        ...state,
        isEmptyTitle: true,
      }));
    } else {
      this.setState((state) => ({
        ...state,
        isEmptyTitle: false,
      }));
    }
  };

  isEmptyImgUrl = (value: string) => {
    if (!value) {
      this.setState((state) => ({
        ...state,
        isEmptyImgUrl: true,
      }));
    } else {
      this.setState((state) => ({
        ...state,
        isEmptyImgUrl: false,
      }));
    }
  };

  isEmptyImdbUrl = (value: string) => {
    if (!value) {
      this.setState((state) => ({
        ...state,
        isEmptyImdbUrl: true,
      }));
    } else {
      this.setState((state) => ({
        ...state,
        isEmptyImdbUrl: false,
      }));
    }
  };

  isEmptyImdbId = (value: string) => {
    if (!value) {
      this.setState((state) => ({
        ...state,
        isEmptyImdbId: true,
      }));
    } else {
      this.setState((state) => ({
        ...state,
        isEmptyImdbId: false,
      }));
    }
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
      || !imdbId
      || !imgUrl
      || !imdbUrl
    ) {
      this.setState((state) => ({
        ...state,

        isInputEmpty: true,
        errorContext: 'Please fill all required fields!',
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

      isInputEmpty: false,
      errorContext: '',
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
      isEmptyTitle,
      isEmptyImgUrl,
      isEmptyImdbUrl,
      isEmptyImdbId,
      isInputEmpty,
      errorContext,
    } = this.state;

    return (
      <form
        onSubmit={(event) => {
          this.handleSubmit(event);
        }}
        className="sidebar__form"
      >

        {isInputEmpty && (
          <p className="sidebar__error">{errorContext}</p>
        )}

        <label>
          <p className="sidebar__input-description">
            <span className="required">
              *
            </span>
            Enter title:
          </p>
          <input
            name="title"
            value={title}
            type="text"
            className="sidebar__input"
            onChange={({ target }) => {
              this.handlerInputChange(target.value, target.name);
            }}
            onBlur={({ target }) => {
              this.isEmptyTitle(target.value);
            }}
          />
          {isEmptyTitle && (
            <p className="sidebar__input-error">
              Please, enter a title!
            </p>
          )}
        </label>

        <label>
          <p className="sidebar__input-description">
            Enter description:
          </p>
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
          <p className="sidebar__input-description">
            <span className="required">
              *
            </span>
            Enter imgUrl:
          </p>
          <input
            name="imgUrl"
            value={imgUrl}
            type="text"
            className="sidebar__input"
            onChange={({ target }) => {
              this.handlerInputChange(target.value, target.name);
            }}
            onBlur={({ target }) => {
              this.isEmptyImgUrl(target.value);
            }}
          />
          {isEmptyImgUrl && (
            <p className="sidebar__input-error">
              Please, enter a image Url!
            </p>
          )}
        </label>

        <label>
          <p className="sidebar__input-description">
            <span className="required">
              *
            </span>
            Enter imdbUrl:
          </p>
          <input
            name="imdbUrl"
            value={imdbUrl}
            type="text"
            className="sidebar__input"
            onChange={({ target }) => {
              this.handlerInputChange(target.value, target.name);
            }}
            onBlur={({ target }) => {
              this.isEmptyImdbUrl(target.value);
            }}
          />
          {isEmptyImdbUrl && (
            <p className="sidebar__input-error">
              Please, enter a IMDB Url!
            </p>
          )}
        </label>

        <label>
          <p className="sidebar__input-description">
            <span className="required">
              *
            </span>
            Enter imdbId:
          </p>
          <input
            name="imdbId"
            value={imdbId}
            type="text"
            className="sidebar__input"
            onChange={({ target }) => {
              this.handlerInputChange(target.value, target.name);
            }}
            onBlur={({ target }) => {
              this.isEmptyImdbId(target.value);
            }}
          />
          {isEmptyImdbId && (
            <p className="sidebar__input-error">
              Please, enter a IMDB Id!
            </p>
          )}
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
