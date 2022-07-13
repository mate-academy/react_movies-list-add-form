import { Component } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';

type Props = {
  addMovie: AddMovie,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  formValid: boolean,
  errorTitle: boolean,
  errorImdbId: boolean,
  errorImgUrl: boolean,
  errorImdbUrl: boolean,
};

/* eslint-disable-next-line */
const validationRegEx = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    formValid: false,
    errorTitle: false,
    errorImdbId: false,
    errorImgUrl: false,
    errorImdbUrl: false,
  };

  componentDidUpdate() {
    const {
      errorTitle, errorImdbId, errorImgUrl, errorImdbUrl, formValid,
    } = this.state;
    const titleCheck = this.state.title.trim().length !== 0;
    const imdbIdCheck = this.state.imdbId.trim().length !== 0;
    const imgUrlCheck = validationRegEx.test(this.state.imgUrl);
    const imdbUrlCheck = validationRegEx.test(this.state.imdbUrl);

    switch (true) {
      case (titleCheck && errorTitle):
        this.setState({ errorTitle: false });
        break;

      case (imdbIdCheck && errorImdbId):
        this.setState({ errorImdbId: false });
        break;

      case (imgUrlCheck && errorImgUrl):
        this.setState({ errorImgUrl: false });
        break;

      case (imdbUrlCheck && errorImdbUrl):
        this.setState({ errorImdbUrl: false });
        break;
      /* eslint-disable-next-line */
      case (titleCheck && imdbIdCheck && imgUrlCheck && imdbUrlCheck && !formValid):
        this.setState({ formValid: true });
        break;
      /* eslint-disable-next-line */
      case ((!titleCheck || !imdbIdCheck || !imgUrlCheck || !imdbUrlCheck) && formValid):
        this.setState({ formValid: false });
        break;

      default:
        break;
    }
  }

  blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const {
      title, imdbId, imgUrl, imdbUrl,
    } = this.state;
    const inputName = event.target.dataset.cy;

    const titleCheck = title.trim().length !== 0;
    const imdbIdCheck = imdbId.trim().length !== 0;
    const imgUrlCheck = validationRegEx.test(imgUrl);
    const imdbUrlCheck = validationRegEx.test(imdbUrl);

    switch (inputName) {
      case 'form-title':
        this.setState({ errorTitle: !titleCheck });
        break;

      case 'form-imdbId':
        this.setState({ errorImdbId: !imdbIdCheck });
        break;

      case 'form-imgUrl':
        this.setState({ errorImgUrl: !imgUrlCheck });
        break;

      case 'form-imdbUrl':
        this.setState({ errorImdbUrl: !imdbUrlCheck });
        break;

      default:
        break;
    }
  };

  submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      title, description, imdbId, imgUrl, imdbUrl,
    } = this.state;

    this.props.addMovie({
      title, description, imdbId, imdbUrl, imgUrl,
    });
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      formValid: false,
    });
  };

  render() {
    const {
      title,
      description,
      imdbId,
      imgUrl,
      imdbUrl,
      formValid,
      errorTitle,
      errorImdbId,
      errorImgUrl,
      errorImdbUrl,
    } = this.state;

    return (
      <form
        className="NewMovie"
        onSubmit={event => this.submitForm(event)}
      >
        <h2 className="NewMovie__header">Add movie form</h2>
        {errorTitle
        && (
          <span className="NewMovie__error-span">
            Please enter correct title
          </span>
        )}
        <input
          onBlur={this.blurHandler}
          className={
            classNames('NewMovie__input',
              { 'NewMovie__input-error': errorTitle })
          }
          onChange={e => this.setState({ title: e.target.value })}
          value={title}
          data-cy="form-title"
          type="text"
          placeholder="Enter title"
        />
        <input
          className={classNames('NewMovie__input')}
          onChange={e => this.setState({ description: e.target.value })}
          value={description}
          data-cy="form-description"
          type="text"
          placeholder="Enter description"
        />
        {errorImgUrl
        && (
          <span className="NewMovie__error-span">
            Please enter correct imgUrl
          </span>
        )}
        <input
          onBlur={this.blurHandler}
          className={
            classNames('NewMovie__input',
              { 'NewMovie__input-error': errorImgUrl })
          }
          onChange={e => this.setState({ imgUrl: e.target.value })}
          value={imgUrl}
          data-cy="form-imgUrl"
          type="text"
          placeholder="Enter imgUrl"
        />
        {errorImdbUrl
        && (
          <span className="NewMovie__error-span">
            Please enter correct imdbUrl
          </span>
        )}
        <input
          onBlur={this.blurHandler}
          className={
            classNames('NewMovie__input',
              { 'NewMovie__input-error': errorImdbUrl })
          }
          onChange={e => this.setState({ imdbUrl: e.target.value })}
          value={imdbUrl}
          data-cy="form-imdbUrl"
          type="text"
          placeholder="Enter imdbUrl"
        />
        {errorImdbId
        && (
          <span className="NewMovie__error-span">
            Please enter correct imdbId
          </span>
        )}
        <input
          onBlur={this.blurHandler}
          className={
            classNames('NewMovie__input',
              { 'NewMovie__input-error': errorImdbId })
          }
          onChange={e => this.setState({ imdbId: e.target.value })}
          value={imdbId}
          data-cy="form-imdbId"
          type="text"
          placeholder="Enter imdbId"
        />
        <button
          disabled={!formValid}
          className="NewMovie__button"
          type="submit"
          data-cy="form-submit-button"
        >
          Add Movie
        </button>
      </form>
    );
  }
}
