import React from 'react';
import classNames from 'classnames';
import { getPropertyName, getPropertyNameOnBlur } from '../../helpers';
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
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const InputName = getPropertyName(name);
    const InputNameOnBlur = getPropertyNameOnBlur(name);

    if (name === Fields.Description) {
      this.setState((currentState) => ({
        ...currentState,
        [name]: value,
      }));
    } else {
      this.setState((currentState) => ({
        ...currentState,
        [name]: value,
        [InputName]: true,
        [InputNameOnBlur]: this.validateOnBlur(event),
      }));
    }
  };

  handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = event.target;
    const InputNameOnBlur = getPropertyNameOnBlur(name);

    this.setState((currentState) => ({
      ...currentState,
      [InputNameOnBlur]: this.validateOnBlur(event),
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
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      this.clearState();
    }
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
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div className="field">
          <label className="label" htmlFor={Fields.Title}>
            Title
          </label>
          <div className="control has-icons-right">
            <input
              className={classNames(
                'input',
                { 'is-success': isTitleValidOnBlur },
                { 'is-danger': !isTitleValid || !isTitleValidOnBlur },
              )}
              type="text"
              id={Fields.Title}
              name={Fields.Title}
              value={title}
              onChange={this.handleChange}
              onBlur={this.handleOnBlur}
            />
            {isTitleValidOnBlur && (
              <span className="icon is-small is-right">
                <i className="fas fa-check has-text-success" />
              </span>
            )}
          </div>
          {(!isTitleValid || !isTitleValidOnBlur) && (
            <p className="help is-danger">This title is invalid</p>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor={Fields.Description}>
            Description
            <textarea
              className="textarea"
              id={Fields.Description}
              name={Fields.Description}
              value={description}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className="field">
          <label className="label" htmlFor={Fields.ImdbUrl}>
            ImdbUrl
          </label>
          <div className="control has-icons-right">
            <input
              className={classNames(
                'input',
                { 'is-success': isImdbUrlValidOnBlur },
                { 'is-danger': !isImdbUrlValid || !isImdbUrlValidOnBlur },
              )}
              type="text"
              id={Fields.ImdbUrl}
              name={Fields.ImdbUrl}
              value={imdbUrl}
              onChange={this.handleChange}
              onBlur={this.handleOnBlur}
            />
            {isImdbUrlValidOnBlur && (
              <span className="icon is-small is-right">
                <i className="fas fa-check has-text-success" />
              </span>
            )}
          </div>
          {(!isImdbUrlValid || !isImdbUrlValidOnBlur) && (
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
                { 'is-success': isImgUrlValidOnBlur },
                { 'is-danger': !isImgUrlValid || !isImgUrlValidOnBlur },
              )}
              type="text"
              id={Fields.ImgUrl}
              name={Fields.ImgUrl}
              value={imgUrl}
              onChange={this.handleChange}
              onBlur={this.handleOnBlur}
            />
            {isImgUrlValidOnBlur && (
              <span className="icon is-small is-right">
                <i className="fas fa-check has-text-success" />
              </span>
            )}
          </div>
          {(!isImgUrlValid || !isImgUrlValidOnBlur) && (
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
                { 'is-success': isImdbIdValidOnBlur },
                { 'is-danger': !isImdbIdValid || !isImdbIdValidOnBlur },
              )}
              type="text"
              id={Fields.ImdbId}
              name={Fields.ImdbId}
              value={imdbId}
              onChange={this.handleChange}
              onBlur={this.handleOnBlur}
            />
            {isImdbIdValidOnBlur && (
              <span className="icon is-small is-right">
                <i className="fas fa-check has-text-success" />
              </span>
            )}
          </div>
          {(!isImdbIdValid || !isImdbIdValidOnBlur) && (
            <p className="help is-danger">This imdb url is invalid</p>
          )}
        </div>

        <div className="control">
          <button
            className="button ui submit is-success"
            type="submit"
            disabled={!isTitleValid || !isImdbUrlValid || !isImgUrlValid || !isImdbIdValid}
          >
            Add movie
          </button>
        </div>
      </form>
    );
  }
}
