import classNames from 'classnames';
import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  newMovie: Movie,
  validation: Validation,
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
    validation: {
      isTitleFilled: true,
      isImdbIdFilled: true,
      isImgUrlFilled: true,
      isImdbUrlFilled: true,
      isImgUrlValid: true,
      isImdbUrlValid: true,
    },
  };

  validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { getCheckedUrlInput } = this;
    const { name, value } = e.target;
    const validationName = `is${name[0].toUpperCase() + name.slice(1)}Filled`;

    if (name.includes('Url')) {
      getCheckedUrlInput(name, validationName, value);

      return;
    }

    this.setState(state => ({
      validation: {
        ...state.validation,
        [validationName]: Boolean(value),
      },
    }));
  };

  getCheckedUrlInput = (name: string, validationName: string, value: string) => {
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const urlValidationName = `is${name[0].toUpperCase() + name.slice(1)}Valid`;

    this.setState(state => ({
      validation: {
        ...state.validation,
        [validationName]: Boolean(value),
        [urlValidationName]: value ? regExp.test(value) : true,
      },
    }));
  };

  changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [e.target.name]: e.target.value,
      },
    }));
  };

  changeTextAreaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        description: e.target.value,
      },
    }));
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

  checkFormIsValid = () => {
    const { newMovie, validation } = this.state;

    const isFormValid = newMovie.title
      && newMovie.imgUrl
      && newMovie.imdbUrl
      && newMovie.imdbId
      && validation.isImdbUrlValid
      && validation.isImgUrlValid;

    return isFormValid;
  };

  sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.addMovie(this.state.newMovie);
    this.clearForm();
  };

  render() {
    const {
      newMovie,
      validation,
    } = this.state;

    const {
      validateInput,
      changeInputValue,
      changeTextAreaValue,
      checkFormIsValid,
      sendForm,
    } = this;

    return (
      <form
        onSubmit={sendForm}
        onChange={checkFormIsValid}
        className="form"
      >
        <label htmlFor="movie-title" className="form__field">
          <div>
            Movie title:
          </div>
          <input
            id="movie-title"
            type="text"
            name="title"
            value={newMovie.title}
            onChange={changeInputValue}
            onBlur={validateInput}
            placeholder="Enter movie title"
            className={classNames(
              'form__input',
              { 'form__input--not-valid': !validation.isTitleFilled },
            )}
          />
          {validation.isTitleFilled || (
            <div className="error">
              This field is required
            </div>
          )}
        </label>

        <label htmlFor="movie-description" className="form__field">
          <div>
            Movie description:
          </div>
          <textarea
            id="movie-description"
            name="description"
            value={newMovie.description}
            onChange={changeTextAreaValue}
            placeholder="Enter movie description..."
            className="form__description form__input"
          />
        </label>

        <label htmlFor="movie-imgUrl" className="form__field">
          <div>
            Movie image url:
          </div>
          <input
            id="movie-imgUrl"
            type="text"
            name="imgUrl"
            value={newMovie.imgUrl}
            onChange={changeInputValue}
            onBlur={validateInput}
            placeholder="Enter image url"
            className={classNames(
              'form__input',
              { 'form__input--not-valid': !validation.isImgUrlFilled || !validation.isImgUrlValid },
            )}
          />
          {(validation.isImgUrlFilled && validation.isImgUrlValid) || (
            <div className="error">
              {!validation.isImgUrlValid ? 'Url is not valid' : 'This field is required'}
            </div>
          )}
        </label>

        <label htmlFor="movie-imdb-url" className="form__field">
          <div>
            Movie imdb url:
          </div>
          <input
            id="movie-imdb-url"
            type="text"
            name="imdbUrl"
            value={newMovie.imdbUrl}
            onChange={changeInputValue}
            onBlur={validateInput}
            placeholder="Enter imdb url"
            className={classNames(
              'form__input',
              { 'form__input--not-valid': !validation.isImdbUrlFilled || !validation.isImdbUrlValid },
            )}
          />
          {(validation.isImdbUrlFilled && validation.isImdbUrlValid) || (
            <div className="error">
              {!validation.isImdbUrlValid ? 'Url is not valid' : 'This field is required'}
            </div>
          )}
        </label>

        <label htmlFor="movie-imdb-id" className="form__field">
          <div>
            Movie imdb id:
          </div>
          <input
            id="movie-imdb-id"
            type="text"
            name="imdbId"
            value={newMovie.imdbId}
            onChange={changeInputValue}
            onBlur={validateInput}
            placeholder="Enter imdb"
            className={classNames(
              'form__input',
              { 'form__input--not-valid': !validation.isImdbIdFilled },
            )}
          />
          {validation.isImdbIdFilled || (
            <div className="error">
              This field is required
            </div>
          )}
        </label>

        <button
          type="submit"
          disabled={!checkFormIsValid()}
          className={classNames(
            'form__submit-button',
            { 'form__submit-button--disabled': !checkFormIsValid() },
          )}
        >
          Add movie
        </button>
      </form>
    );
  }
}
