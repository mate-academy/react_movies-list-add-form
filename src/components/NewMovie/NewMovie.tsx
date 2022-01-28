import React from 'react';
import classNames from 'classnames';
import { getInputNameOnValidate, getInputNameOnBlur, getInputNameOnTouch } from '../../helpers';
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
  wasTitleTouched: boolean;
  wasImgUrlTouched: boolean;
  wasImdbUrlTouched: boolean;
  wasImdbIdTouched: boolean;
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
    wasTitleTouched: false,
    wasImgUrlTouched: false,
    wasImdbUrlTouched: false,
    wasImdbIdTouched: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const inputNameOnValidate = getInputNameOnValidate(name);
    const inputNameOnBlur = getInputNameOnBlur(name);

    if (name === Fields.Description) {
      this.setState((currentState) => ({
        ...currentState,
        [name]: value,
      }));
    } else {
      this.setState((currentState) => ({
        ...currentState,
        [name]: value,
        [inputNameOnValidate]: true,
        [inputNameOnBlur]: this.validateOnBlur(event),
      }));
    }
  };

  handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = event.target;
    const inputNameOnBlur = getInputNameOnBlur(name);

    this.setState((currentState) => ({
      ...currentState,
      [inputNameOnBlur]: this.validateOnBlur(event),
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
    const inputNameOnTouch = getInputNameOnTouch(name);

    this.setState((state) => ({
      ...state,
      [inputNameOnTouch]: true,
    }));
  };

  validateForm = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      this.setState({
        isTitleValid: !!title.trim(),
        isImgUrlValid: !!imgUrl.trim(),
        isImdbUrlValid: !!imdbUrl.trim(),
        isImdbIdValid: !!imdbId.trim(),
      });

      return false;
    }

    if (!imgUrl.match(regex) || !imdbUrl.match(regex)) {
      this.setState({
        isImgUrlValid: !!imgUrl.match(regex),
        isImdbUrlValid: !!imdbUrl.match(regex),
      });

      return false;
    }

    return true;
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
      wasTitleTouched: false,
      wasImgUrlTouched: false,
      wasImdbUrlTouched: false,
      wasImdbIdTouched: false,
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
      wasTitleTouched,
      wasImgUrlTouched,
      wasImdbUrlTouched,
      wasImdbIdTouched,
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
                  { 'is-success': wasTitleTouched && isTitleValidOnBlur },
                  {
                    'is-danger': (
                      !isTitleValid
                      || (wasTitleTouched && title && !isTitleValidOnBlur)),
                  },
                )}
                type="text"
                id={Fields.Title}
                name={Fields.Title}
                value={title}
                onChange={this.handleChange}
                onBlur={this.handleOnBlur}
                onFocus={this.handleFocus}
              />
              {wasTitleTouched && isTitleValidOnBlur && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {(!isTitleValid || (wasTitleTouched && title && !isTitleValidOnBlur)) && (
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
                  { 'is-success': wasImdbUrlTouched && isImdbUrlValidOnBlur },
                  {
                    'is-danger': (
                      !isImdbUrlValid
                      || (wasImdbUrlTouched && imdbUrl && !isImdbUrlValidOnBlur)),
                  },
                )}
                type="text"
                id={Fields.ImdbUrl}
                name={Fields.ImdbUrl}
                value={imdbUrl}
                onChange={this.handleChange}
                onBlur={this.handleOnBlur}
                onFocus={this.handleFocus}
              />
              {wasImdbUrlTouched && isImdbUrlValidOnBlur && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {(!isImdbUrlValid || (wasImdbUrlTouched && imdbUrl && !isImdbUrlValidOnBlur)) && (
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
                  { 'is-success': wasImgUrlTouched && isImgUrlValidOnBlur },
                  {
                    'is-danger': (
                      !isImgUrlValid
                      || (wasImgUrlTouched && imgUrl && !isImgUrlValidOnBlur)),
                  },
                )}
                type="text"
                id={Fields.ImgUrl}
                name={Fields.ImgUrl}
                value={imgUrl}
                onChange={this.handleChange}
                onBlur={this.handleOnBlur}
                onFocus={this.handleFocus}
              />
              {wasImgUrlTouched && isImgUrlValidOnBlur && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {(!isImgUrlValid || (wasImgUrlTouched && imgUrl && !isImgUrlValidOnBlur)) && (
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
                  { 'is-success': wasImdbIdTouched && isImdbIdValidOnBlur },
                  {
                    'is-danger': (
                      !isImdbIdValid
                      || (wasImdbIdTouched && imdbId && !isImdbIdValidOnBlur)),
                  },
                )}
                type="text"
                id={Fields.ImdbId}
                name={Fields.ImdbId}
                value={imdbId}
                onChange={this.handleChange}
                onBlur={this.handleOnBlur}
                onFocus={this.handleFocus}
              />
              {wasImdbIdTouched && isImdbIdValidOnBlur && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {(!isImdbIdValid || (wasImdbIdTouched && imdbId && !isImdbIdValidOnBlur)) && (
              <p className="help is-danger">This imdb url is invalid</p>
            )}
          </div>

          <div className="control">
            <button
              className="button ui submit is-success"
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
