import { Component, ChangeEvent } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  movie: Movie,

  isValid: {
    title: boolean,
    imdbUrl: boolean,
    imdbId: boolean,
    imgUrl: boolean,
  },
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    movie: {
      title: '',
      description: '',
      imdbUrl: '',
      imdbId: '',
      imgUrl: '',
    },
    isValid: {
      title: true,
      imdbUrl: true,
      imdbId: true,
      imgUrl: true,
    },
  };

  linkValidation = (link: string) => {
    const linkRegExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return linkRegExp.test(link);
  };

  changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  clearForm = () => {
    this.setState({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onAdd({ ...this.state.movie });
    this.clearForm();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    this.setState((state) => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
      isValid: {
        ...state.isValid,
        [name]: true,
      },
    }));
  };

  handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    switch (name) {
      case ('title'):
      case ('imdbId'):
        this.setState(state => (
          {
            isValid: {
              ...state.isValid,
              [name]: !(value.trim() === ''),
            },
          }
        ));
        break;
      case ('imdbUrl'):
      case ('imgUrl'):
        this.setState(state => (
          {
            isValid: {
              ...state.isValid,
              [name]: this.linkValidation(value),
            },
          }
        ));
        break;
      default:
        break;
    }
  };

  render() {
    const { movie, isValid } = this.state;
    const isButtonDisabled = !movie.title
    || !movie.imdbId
    || !this.linkValidation(movie.imdbUrl)
    || !this.linkValidation(movie.imgUrl);

    return (
      <form
        onSubmit={this.handleSubmit}
        className="form__label"
      >
        <div className="form__container">
          <label className="form__label" htmlFor="title">
            Title *
            <input
              type="text"
              name="title"
              className={classNames('form__input', { 'form__input--invalid': !isValid.title })}
              id="title"
              required
              value={movie.title}
              placeholder="Enter title"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </label>
          {isValid.title || <p className="form__error">Add title</p>}

          <label className="form__label" htmlFor="imgUrl">
            ImgUrl *
            <input
              type="text"
              name="imgUrl"
              className={classNames('form__input', { 'form__input--invalid': !isValid.imgUrl })}
              id="imgUrl"
              required
              value={movie.imgUrl}
              placeholder="Enter IMG URL"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {isValid.imgUrl || <p className="form__error">Url is invalid</p>}
          </label>

          <label className="form__label" htmlFor="imdbUrl">
            ImdbUrl *
            <input
              type="text"
              name="imdbUrl"
              className={classNames('form__input', { 'form__input--invalid': !isValid.imdbUrl })}
              id="imdbUrl"
              required
              value={movie.imdbUrl}
              placeholder="Enter IMDB URL"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {isValid.imdbUrl || <p className="form__error">Url is invalid</p>}

          </label>
          <label className="form__label" htmlFor="imdbId">
            ImdbId*
            <input
              type="text"
              name="imdbId"
              className={classNames('form__input', { 'form__input--invalid': !isValid.imdbId })}
              id="imdbId"
              required
              value={movie.imdbId}
              placeholder="Enter IMDB id"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {isValid.imdbId || <p className="form__error">Add IMDB Id</p>}

          </label>
          <label className="form__label" htmlFor="description">
            Description
            <textarea
              name="description"
              className="form__textarea"
              id="description"
              value={movie.description}
              placeholder="Enter description"
              onChange={this.handleChange}
            />
          </label>
        </div>

        <button
          type="submit"
          className="form__button"
          disabled={isButtonDisabled}
        >
          Add movie
        </button>
      </form>
    );
  }
}
