import React from 'react';
import classNames from 'classnames';
import { getInputNameOnValidate, getInputNameOnBlur, getInputNameOnFocus } from '../../helpers';
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
  isTitleValidOnBlur: boolean;
  isImgUrlValidOnBlur: boolean;
  isImdbUrlValidOnBlur: boolean;
  isImdbIdValidOnBlur: boolean;
  wasTitleFocused: boolean;
  wasImgUrlFocused: boolean;
  wasImdbUrlFocused: boolean;
  wasImdbIdFocused: boolean;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleValid: true,
    isImgUrlValid: true,
    isImdbUrlValid: true,
    isImdbIdValid: true,
    isTitleValidOnBlur: false,
    isImgUrlValidOnBlur: false,
    isImdbUrlValidOnBlur: false,
    isImdbIdValidOnBlur: false,
    wasTitleFocused: false,
    wasImgUrlFocused: false,
    wasImdbUrlFocused: false,
    wasImdbIdFocused: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const nameOnValidate = getInputNameOnValidate(name);
    const nameOnBlur = getInputNameOnBlur(name);

    if (name === Fields.Description) {
      this.setState((currentState) => ({
        ...currentState,
        [name]: value,
      }));
    } else {
      this.setState((currentState) => ({
        ...currentState,
        [name]: value,
        [nameOnValidate]: !!value.trim(),
        [nameOnBlur]: this.validateOnBlur(event),
      }));
    }
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = event.target;
    const nameOnBlur = getInputNameOnBlur(name);

    this.setState((currentState) => ({
      ...currentState,
      [nameOnBlur]: this.validateOnBlur(event),
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

  handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = event.target;
    const nameOnFocus = getInputNameOnFocus(name);

    this.setState((state) => ({
      ...state,
      [nameOnFocus]: true,
    }));
  };

  validateForm = () => {
    const {
      isTitleValidOnBlur,
      isImgUrlValidOnBlur,
      isImdbUrlValidOnBlur,
      isImdbIdValidOnBlur,
    } = this.state;

    this.setState({
      isTitleValid: isTitleValidOnBlur,
      isImgUrlValid: isImgUrlValidOnBlur,
      isImdbUrlValid: isImdbUrlValidOnBlur,
      isImdbIdValid: isImdbIdValidOnBlur,
    });

    return isTitleValidOnBlur
    && isImgUrlValidOnBlur
    && isImdbUrlValidOnBlur
    && isImdbIdValidOnBlur;
  };

  validateOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>
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
      isTitleValid: true,
      isImgUrlValid: true,
      isImdbUrlValid: true,
      isImdbIdValid: true,
      isTitleValidOnBlur: false,
      isImgUrlValidOnBlur: false,
      isImdbUrlValidOnBlur: false,
      isImdbIdValidOnBlur: false,
      wasTitleFocused: false,
      wasImgUrlFocused: false,
      wasImdbUrlFocused: false,
      wasImdbIdFocused: false,
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
      isImdbIdValid,
      isImdbUrlValid,
      isImgUrlValid,
      isTitleValidOnBlur,
      isImgUrlValidOnBlur,
      isImdbUrlValidOnBlur,
      isImdbIdValidOnBlur,
      wasTitleFocused,
      wasImgUrlFocused,
      wasImdbUrlFocused,
      wasImdbIdFocused,
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
                  { 'is-success': wasTitleFocused && isTitleValidOnBlur },
                  {
                    'is-danger': (
                      !isTitleValid
                      || (wasTitleFocused && title && !isTitleValidOnBlur)),
                  },
                )}
                type="text"
                id={Fields.Title}
                name={Fields.Title}
                value={title}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
              />
              {wasTitleFocused && isTitleValidOnBlur && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {(!isTitleValid || (wasTitleFocused && title && !isTitleValidOnBlur)) && (
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
                  { 'is-success': wasImdbUrlFocused && isImdbUrlValidOnBlur },
                  {
                    'is-danger': (
                      !isImdbUrlValid
                      || (wasImdbUrlFocused && imdbUrl && !isImdbUrlValidOnBlur)),
                  },
                )}
                type="text"
                id={Fields.ImdbUrl}
                name={Fields.ImdbUrl}
                value={imdbUrl}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
              />
              {wasImdbUrlFocused && isImdbUrlValidOnBlur && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {(!isImdbUrlValid || (wasImdbUrlFocused && imdbUrl && !isImdbUrlValidOnBlur)) && (
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
                  { 'is-success': wasImgUrlFocused && isImgUrlValidOnBlur },
                  {
                    'is-danger': (
                      !isImgUrlValid
                      || (wasImgUrlFocused && imgUrl && !isImgUrlValidOnBlur)),
                  },
                )}
                type="text"
                id={Fields.ImgUrl}
                name={Fields.ImgUrl}
                value={imgUrl}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
              />
              {wasImgUrlFocused && isImgUrlValidOnBlur && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {(!isImgUrlValid || (wasImgUrlFocused && imgUrl && !isImgUrlValidOnBlur)) && (
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
                  { 'is-success': wasImdbIdFocused && isImdbIdValidOnBlur },
                  {
                    'is-danger': (
                      !isImdbIdValid
                      || (wasImdbIdFocused && imdbId && !isImdbIdValidOnBlur)),
                  },
                )}
                type="text"
                id={Fields.ImdbId}
                name={Fields.ImdbId}
                value={imdbId}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
              />
              {wasImdbIdFocused && isImdbIdValidOnBlur && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {(!isImdbIdValid || (wasImdbIdFocused && imdbId && !isImdbIdValidOnBlur)) && (
              <p className="help is-danger">This imdb url is invalid</p>
            )}
          </div>

          <div className="control">
            <button
              className="button is-success"
              type="submit"
              disabled={
                !isTitleValid
                || !isImdbUrlValid
                || !isImgUrlValid
                || !isImdbIdValid
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
