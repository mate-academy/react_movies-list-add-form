import React, { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  isValidTitle: boolean,
  isValidDescription: boolean,
  isValidImgUrl: boolean,
  isValidImdbUrl: boolean,
  isValidImdbId: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isValidTitle: true,
    isValidDescription: true,
    isValidImgUrl: true,
    isValidImdbUrl: true,
    isValidImdbId: true,
  };

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isValidTitle: true,
      isValidDescription: true,
      isValidImgUrl: true,
      isValidImdbUrl: true,
      isValidImdbId: true,
    });
  };

  setInputs = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  validationUrl = (value: string) => {
    // eslint-disable-next-line max-len
    const validUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return !validUrl.test(value);
  };

  validationText = (value: string) => {
    const validText = /([^a-zA-Z0-9 .,'!?:;-])/;

    return !validText.test(value);
  };

  handleBlur = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        this.setState(prevState => {
          return {
            ...prevState,
            isValidTitle: this.validationText(value),
          };
        });
        break;

      case 'description':
        this.setState(prevState => {
          return {
            ...prevState,
            isValidDescription: this.validationText(value),
          };
        });
        break;

      case 'imgUrl':
        this.setState(prevState => {
          return {
            ...prevState,
            isValidImgUrl: this.validationUrl(value),
          };
        });
        break;

      case 'imdbUrl':
        this.setState(prevState => {
          return {
            ...prevState,
            isValidImdbUrl: this.validationUrl(value),
          };
        });
        break;

      case 'imdbId':
        this.setState(prevState => {
          return {
            ...prevState,
            isValidImdbId: this.validationText(value),
          };
        });
        break;

      default:
        break;
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.onAdd(newMovie);

    this.resetForm();
  };

  onChanges = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>, validator: string) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [validator]: true,
      };
    });
    this.setInputs(event);
  };

  buttonDisable = () => {
    const {
      isValidDescription,
      isValidImdbId,
      isValidImdbUrl,
      isValidImgUrl,
      isValidTitle,
    } = this.state;

    return (!isValidTitle || !isValidDescription || !isValidImgUrl
      || !isValidImdbUrl || !isValidImdbId);
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isValidTitle,
      isValidDescription,
      isValidImgUrl,
      isValidImdbUrl,
      isValidImdbId,
    } = this.state;

    return (
      <>
        <h2 className="title">
          ADD NEW MOVIE
        </h2>

        <form
          onSubmit={this.handleSubmit}
        >
          <label className="form__label">
            Add TITLE

            <input
              type="text"
              name="title"
              value={title}
              className={classNames('form-input',
                { 'form-input--error': !isValidTitle })}
              required
              onChange={(event) => this.onChanges(event, 'isValidTitle')}
              onBlur={this.handleBlur}
            />
            {!isValidTitle && (
              <p className="error-message">
                Please enter valid title
              </p>
            )}
          </label>

          <label className="form__label">
            Add DESCRIPTION

            <textarea
              name="description"
              className={classNames('description',
                { 'description--error': !isValidDescription })}
              value={description}
              onChange={(event) => this.onChanges(event, 'isValidDescription')}
              onBlur={this.handleBlur}
            />
            {!isValidDescription && (
              <p className="error-message">
                Please enter valid description
              </p>
            )}
          </label>

          <label className="form__label">
            Add IMAGE URL

            <input
              type="text"
              name="imgUrl"
              value={imgUrl}
              className={classNames('form-input',
                { 'form-input--error': !isValidImgUrl })}
              required
              onChange={(event) => this.onChanges(event, 'isValidImgUrl')}
              onBlur={this.handleBlur}
            />
            {!isValidImgUrl && (
              <p className="error-message">
                Please enter valid image URL
              </p>
            )}
          </label>

          <label className="form__label">
            Add IMDB URL

            <input
              type="text"
              name="imdbUrl"
              value={imdbUrl}
              className={classNames('form-input',
                { 'form-input--error': !isValidImdbUrl })}
              required
              onChange={(event) => this.onChanges(event, 'isValidImdbUrl')}
              onBlur={this.handleBlur}
            />
            {!isValidImdbUrl && (
              <p className="error-message">
                Please enter valid IMDB URL
              </p>
            )}
          </label>

          <label className="form__label">
            Add IMDB ID

            <input
              type="text"
              name="imdbId"
              value={imdbId}
              className={classNames('form-input',
                { 'form-input--error': !isValidImdbId })}
              required
              onChange={(event) => this.onChanges(event, 'isValidImdbId')}
              onBlur={this.handleBlur}
            />
            {!isValidImdbId && (
              <p className="error-message">
                Please enter valid IMDB ID
              </p>
            )}
          </label>

          <button
            type="submit"
            className="submit-button"
            disabled={this.buttonDisable()}
          >
            ADD NEW MOVIE
          </button>
        </form>
      </>
    );
  }
}
