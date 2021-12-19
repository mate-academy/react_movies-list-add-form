import classNames from 'classnames';
import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  isTitleFilled: boolean,
  isImdbIdFilled: boolean,
  isImgUrlFilled: boolean,
  isImdbUrlFilled: boolean,
  isImgUrlValid: boolean,
  isImdbUrlValid: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleFilled: true,
    isImdbIdFilled: true,
    isImgUrlFilled: true,
    isImdbUrlFilled: true,
    isImgUrlValid: true,
    isImdbUrlValid: true,
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
      ...state,
      [validationName]: Boolean(value),
    }));
  };

  getCheckedUrlInput = (name: string, validationName: string, value: string) => {
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const urlValidationName = `is${name[0].toUpperCase() + name.slice(1)}Valid`;

    this.setState(state => ({
      ...state,
      [validationName]: Boolean(value),
      [urlValidationName]: value ? regExp.test(value) : true,
    }));
  };

  changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  changeTextAreaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: e.target.value });
  };

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.addMovie(this.state);
    this.clearForm();
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleFilled,
      isImdbIdFilled,
      isImgUrlFilled,
      isImdbUrlFilled,
      isImdbUrlValid,
      isImgUrlValid,
    } = this.state;

    const {
      validateInput,
      changeInputValue,
      changeTextAreaValue,
      sendForm,
    } = this;

    const isFormValid = title && imgUrl && imdbUrl
       && imdbId && isImdbUrlValid && isImgUrlValid;

    return (
      <form onSubmit={sendForm} className="form">
        <label htmlFor="movie-title" className="form__field">
          <div>
            Movie title:
          </div>
          <input
            id="movie-title"
            type="text"
            name="title"
            value={title}
            onChange={changeInputValue}
            onBlur={validateInput}
            placeholder="Enter movie title"
            className={classNames(
              'form__input',
              { 'form__input--not-valid': !isTitleFilled },
            )}
          />
          {isTitleFilled || (
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
            value={description}
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
            value={imgUrl}
            onChange={changeInputValue}
            onBlur={validateInput}
            placeholder="Enter image url"
            className={classNames(
              'form__input',
              { 'form__input--not-valid': !isImgUrlFilled || !isImgUrlValid },
            )}
          />
          {(isImgUrlFilled && isImgUrlValid) || (
            <div className="error">
              {!isImgUrlValid ? 'Url is not valid' : 'This field is required'}
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
            value={imdbUrl}
            onChange={changeInputValue}
            onBlur={validateInput}
            placeholder="Enter imdb url"
            className={classNames(
              'form__input',
              { 'form__input--not-valid': !isImdbUrlFilled || !isImdbUrlValid },
            )}
          />
          {(isImdbUrlFilled && isImdbUrlValid) || (
            <div className="error">
              {!isImdbUrlValid ? 'Url is not valid' : 'This field is required'}
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
            value={imdbId}
            onChange={changeInputValue}
            onBlur={validateInput}
            placeholder="Enter imdb"
            className={classNames(
              'form__input',
              { 'form__input--not-valid': !isImdbIdFilled },
            )}
          />
          {isImdbIdFilled || (
            <div className="error">
              This field is required
            </div>
          )}
        </label>

        <button
          type="submit"
          disabled={!isFormValid}
          className={classNames(
            'form__submit-button',
            { 'form__submit-button--disabled': !isFormValid },
          )}
        >
          Add movie
        </button>
      </form>
    );
  }
}
