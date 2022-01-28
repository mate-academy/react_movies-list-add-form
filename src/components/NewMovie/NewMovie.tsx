import React from 'react';
import classNames from 'classnames';
import { getInputValidationName, getInputFocusedName } from '../../helpers';
import './NewMovie.scss';

enum Fields {
  Title = 'title',
  Description = 'description',
  ImgUrl = 'imgUrl',
  ImdbUrl = 'imdbUrl',
  ImdbId = 'imdbId',
}

type Props = {
  onAdd: (newMovie: Movie) => void;
  imdbIds: string[];
};

type State = Movie & {
  isTitleValid: boolean;
  isImgUrlValid: boolean;
  isImdbUrlValid: boolean;
  isImdbIdValid: boolean;
  wasTitleFocused: boolean;
  wasImgUrlFocused: boolean;
  wasImdbUrlFocused: boolean;
  wasImdbIdFocused: boolean;
  wasSubmitButtonPressed: boolean
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleValid: false,
    isImgUrlValid: false,
    isImdbUrlValid: false,
    isImdbIdValid: false,
    wasTitleFocused: false,
    wasImgUrlFocused: false,
    wasImdbUrlFocused: false,
    wasImdbIdFocused: false,
    wasSubmitButtonPressed: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const isInputValid = getInputValidationName(name);

    if (name === Fields.Description) {
      this.setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        [name]: value,
        [isInputValid]: this.validateInput(event),
      }));
    }
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = event.target;
    const isInputValid = getInputValidationName(name);

    this.setState((prevState) => ({
      ...prevState,
      [isInputValid]: this.validateInput(event),
    }));
  };

  handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = event.target;
    const wasInputFocused = getInputFocusedName(name);

    this.setState((state) => ({
      ...state,
      [wasInputFocused]: true,
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({
      wasImdbIdFocused: true,
      wasImdbUrlFocused: true,
      wasImgUrlFocused: true,
      wasTitleFocused: true,
      wasSubmitButtonPressed: true,
    });

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const isFormValid = this.validateForm();

    if (isFormValid) {
      this.props.onAdd({
        title: title.trim(),
        description: description.trim(),
        imgUrl: imgUrl.trim(),
        imdbUrl: imdbUrl.trim(),
        imdbId: imdbId.trim(),
      });

      this.clearState();
    }
  };

  validateForm = () => {
    const {
      isTitleValid,
      isImgUrlValid,
      isImdbUrlValid,
      isImdbIdValid,
    } = this.state;

    return isTitleValid
    && isImgUrlValid
    && isImdbUrlValid
    && isImdbIdValid;
  };

  validateInput = (event: React.FocusEvent<HTMLInputElement, Element>
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    switch (name) {
      case Fields.Title: {
        return value.trim();
      }

      case Fields.ImgUrl: {
        return value.trim() && !!value.match(regex);
      }

      case Fields.ImdbUrl: {
        return value.trim() && !!value.match(regex);
      }

      case Fields.ImdbId: {
        return value.trim() && !this.props.imdbIds.includes(value);
      }

      default:
        throw new Error('enter valid data');
    }
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isTitleValid: false,
      isImgUrlValid: false,
      isImdbUrlValid: false,
      isImdbIdValid: false,
      wasTitleFocused: false,
      wasImgUrlFocused: false,
      wasImdbUrlFocused: false,
      wasImdbIdFocused: false,
      wasSubmitButtonPressed: false,
    });
  };

  render() {
    const {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
      isTitleValid,
      isImgUrlValid,
      isImdbUrlValid,
      isImdbIdValid,
      wasTitleFocused,
      wasImgUrlFocused,
      wasImdbUrlFocused,
      wasImdbIdFocused,
      wasSubmitButtonPressed,
    } = this.state;

    return (
      <>
        <h3 className="title">Add new movie</h3>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="field">
            <label className="label" htmlFor={Fields.Title}>
              Title
            </label>
            <div className="control has-icons-right">
              <input
                className={classNames(
                  'input',
                  { 'is-success': wasTitleFocused && isTitleValid },
                  { 'is-danger': wasTitleFocused && !isTitleValid },
                )}
                type="text"
                id={Fields.Title}
                name={Fields.Title}
                value={title}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
              />
              {wasTitleFocused && isTitleValid && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {wasTitleFocused && !isTitleValid && (
              <p className="help is-danger">This title is invalid</p>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor={Fields.Description}>
              Description
            </label>
            <div className="control">
              <textarea
                className="textarea"
                id={Fields.Description}
                name={Fields.Description}
                value={description}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor={Fields.ImdbUrl}>
              ImdbUrl
            </label>
            <div className="control has-icons-right">
              <input
                className={classNames(
                  'input',
                  { 'is-success': wasImdbUrlFocused && isImdbUrlValid },
                  { 'is-danger': wasImdbUrlFocused && !isImdbUrlValid },
                )}
                type="text"
                id={Fields.ImdbUrl}
                name={Fields.ImdbUrl}
                value={imdbUrl}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
              />
              {wasImdbUrlFocused && isImdbUrlValid && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {wasImdbUrlFocused && !isImdbUrlValid && (
              <p className="help is-danger">This imdb url is invalid</p>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor={Fields.ImgUrl}>
              ImgUrl
            </label>
            <div className="control has-icons-right">
              <input
                className={classNames(
                  'input',
                  { 'is-success': wasImgUrlFocused && isImgUrlValid },
                  { 'is-danger': wasImgUrlFocused && !isImgUrlValid },
                )}
                type="text"
                id={Fields.ImgUrl}
                name={Fields.ImgUrl}
                value={imgUrl}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
              />
              {wasImgUrlFocused && isImgUrlValid && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {wasImgUrlFocused && !isImgUrlValid && (
              <p className="help is-danger">This img url is invalid</p>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor={Fields.ImdbId}>
              ImdbId
            </label>
            <div className="control has-icons-right">
              <input
                className={classNames(
                  'input',
                  { 'is-success': wasImdbIdFocused && isImdbIdValid },
                  { 'is-danger': wasImdbIdFocused && !isImdbIdValid },
                )}
                type="text"
                id={Fields.ImdbId}
                name={Fields.ImdbId}
                value={imdbId}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
              />
              {wasImdbIdFocused && isImdbIdValid && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {wasImdbIdFocused && !isImdbIdValid && (
              <p className="help is-danger">This imdb url is invalid</p>
            )}
          </div>

          <div className="control">
            <button
              className="button is-success"
              type="submit"
              disabled={
                wasSubmitButtonPressed
                && (!isTitleValid
                || !isImgUrlValid
                || !isImdbUrlValid
                || !isImdbIdValid)
              }
            >
              Add movie
            </button>
          </div>
        </form>
      </>
    );
  }
}
