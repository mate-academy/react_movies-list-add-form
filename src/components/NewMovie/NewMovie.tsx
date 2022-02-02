import React from 'react';
import classNames from 'classnames';
import { getInputValidationName, getInputFilledName, getValidationLoadingName } from '../../helpers';
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
  isDescriptionValid: boolean;
  isImgUrlValid: boolean;
  isImdbUrlValid: boolean;
  isImdbIdValid: boolean;
  isDescriptionFilled: boolean;
  isTitleFilled: boolean;
  isImgUrlFilled: boolean;
  isImdbUrlFilled: boolean;
  isImdbIdFilled: boolean;
  wasSubmitButtonPressed: boolean;
  titleValidationLoading: boolean;
  descriptionValidationLoading: boolean;
  imgUrlValidationLoading: boolean;
  imdbUrlValidationLoading: boolean;
  imdbIdValidationLoading: boolean;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleValid: false,
    isDescriptionValid: true,
    isImgUrlValid: false,
    isImdbUrlValid: false,
    isImdbIdValid: false,
    isTitleFilled: false,
    isDescriptionFilled: false,
    isImgUrlFilled: false,
    isImdbUrlFilled: false,
    isImdbIdFilled: false,
    wasSubmitButtonPressed: false,
    descriptionValidationLoading: false,
    titleValidationLoading: false,
    imgUrlValidationLoading: false,
    imdbUrlValidationLoading: false,
    imdbIdValidationLoading: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const isInputFilled = getInputFilledName(name);

    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
      [isInputFilled]: false,
    }));
  };

  handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;

    this.setState({
      description: value,
    });
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement>
  | React.FocusEvent<HTMLTextAreaElement>
  | React.KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.validateInput(name, value);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.showInvalidInputs();

    const isFormValid = this.validateForm();

    if (isFormValid) {
      this.props.onAdd(this.getNewMovie());

      this.clearState();
    }
  };

  showInvalidInputs = () => {
    this.setState({
      isImdbIdFilled: true,
      isImdbUrlFilled: true,
      isImgUrlFilled: true,
      isTitleFilled: true,
      isDescriptionFilled: true,
      wasSubmitButtonPressed: true,
    });
  };

  getNewMovie = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };
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

  validateInput = (name: string, value: string) => {
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const isInputValid = getInputValidationName(name);
    const isInputFilled = getInputFilledName(name);
    const isInputValidationLoading = getValidationLoadingName(name);

    switch (name) {
      case Fields.Title: {
        this.setState((state) => ({
          ...state,
          [isInputValid]: !!value.trim(),
          [isInputFilled]: !!value.trim(),
          [isInputValidationLoading]: false,
        }));
        break;
      }

      case Fields.Description: {
        this.setState((state) => ({
          ...state,
          [isInputValid]: true,
          [isInputFilled]: true,
          [isInputValidationLoading]: false,
        }));
        break;
      }

      case Fields.ImdbUrl:
      case Fields.ImgUrl: {
        this.setState((state) => ({
          ...state,
          [isInputValid]: regex.test(value),
          [isInputFilled]: !!value.trim(),
          [isInputValidationLoading]: false,
        }));
        break;
      }

      case Fields.ImdbId: {
        this.setState((state) => ({
          ...state,
          isImdbIdValid: !!value.trim() && !this.props.imdbIds.includes(value),
          [isInputFilled]: !!value.trim(),
          [isInputValidationLoading]: false,
        }));
        break;
      }

      default:
        throw new Error('enter valid data');
    }
  };

  onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>
  | React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    const isInputValidationLoading = getValidationLoadingName(name);
    const isInputFilled = getInputFilledName(name);

    if (value.trim()) {
      this.setState((state) => ({
        ...state,
        [isInputValidationLoading]: true,
        [isInputFilled]: false,
      }));

      setTimeout(() => this.validateInput(name, value), 500);
    }
  };

  disableButton = () => {
    const {
      wasSubmitButtonPressed,
      isTitleValid,
      isImgUrlValid,
      isImdbUrlValid,
      isImdbIdValid,
    } = this.state;

    return wasSubmitButtonPressed
    && (!isTitleValid
    || !isImgUrlValid
    || !isImdbUrlValid
    || !isImdbIdValid);
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isTitleValid: false,
      isDescriptionValid: true,
      isImgUrlValid: false,
      isImdbUrlValid: false,
      isImdbIdValid: false,
      isTitleFilled: false,
      isDescriptionFilled: false,
      isImgUrlFilled: false,
      isImdbUrlFilled: false,
      isImdbIdFilled: false,
      wasSubmitButtonPressed: false,
      descriptionValidationLoading: false,
      titleValidationLoading: false,
      imgUrlValidationLoading: false,
      imdbUrlValidationLoading: false,
      imdbIdValidationLoading: false,
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
      isDescriptionValid,
      isImgUrlValid,
      isImdbUrlValid,
      isImdbIdValid,
      isTitleFilled,
      isDescriptionFilled,
      isImgUrlFilled,
      isImdbUrlFilled,
      isImdbIdFilled,
      titleValidationLoading,
      descriptionValidationLoading,
      imgUrlValidationLoading,
      imdbUrlValidationLoading,
      imdbIdValidationLoading,
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
                  { 'is-success': isTitleFilled && isTitleValid },
                  { 'is-danger': isTitleFilled && !isTitleValid },
                )}
                type="text"
                id={Fields.Title}
                name={Fields.Title}
                value={title}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onKeyUp={this.onKeyUp}
              />
              {isTitleFilled && isTitleValid && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {isTitleFilled && !isTitleValid && (
              <p className="help is-danger">This title is invalid</p>
            )}
            {titleValidationLoading && (
              <p className="help">Validating...</p>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor={Fields.Description}>
              Description
            </label>
            <div className="control has-icons-right">
              <textarea
                className={classNames(
                  'textarea',
                  { 'is-success': isDescriptionFilled && isDescriptionValid },
                  { 'is-danger': isDescriptionFilled && !isDescriptionValid },
                )}
                id={Fields.Description}
                name={Fields.Description}
                value={description}
                onChange={this.handleChangeDescription}
                onBlur={this.handleBlur}
                onKeyUp={this.onKeyUp}
              />
              {isDescriptionFilled && isDescriptionValid && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
              {descriptionValidationLoading && (
                <p className="help">Validating...</p>
              )}
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
                  { 'is-success': isImdbUrlFilled && isImdbUrlValid },
                  { 'is-danger': isImdbUrlFilled && !isImdbUrlValid },
                )}
                type="text"
                id={Fields.ImdbUrl}
                name={Fields.ImdbUrl}
                value={imdbUrl}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onKeyUp={this.onKeyUp}
              />
              {isImdbUrlFilled && isImdbUrlValid && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {isImdbUrlFilled && !isImdbUrlValid && (
              <p className="help is-danger">This imdb url is invalid</p>
            )}
            {imdbUrlValidationLoading && (
              <p className="help">Validating...</p>
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
                  { 'is-success': isImgUrlFilled && isImgUrlValid },
                  { 'is-danger': isImgUrlFilled && !isImgUrlValid },
                )}
                type="text"
                id={Fields.ImgUrl}
                name={Fields.ImgUrl}
                value={imgUrl}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onKeyUp={this.onKeyUp}
              />
              {isImgUrlFilled && isImgUrlValid && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {isImgUrlFilled && !isImgUrlValid && (
              <p className="help is-danger">This img url is invalid</p>
            )}
            {imgUrlValidationLoading && (
              <p className="help">Validating...</p>
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
                  { 'is-success': isImdbIdFilled && isImdbIdValid },
                  { 'is-danger': isImdbIdFilled && !isImdbIdValid },
                )}
                type="text"
                id={Fields.ImdbId}
                name={Fields.ImdbId}
                value={imdbId}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onKeyUp={this.onKeyUp}
              />
              {isImdbIdFilled && isImdbIdValid && (
                <span className="icon is-small is-right">
                  <i className="fas fa-check has-text-success" />
                </span>
              )}
            </div>
            {isImdbIdFilled && !isImdbIdValid && (
              <p className="help is-danger">This imdb url is invalid</p>
            )}
            {imdbIdValidationLoading && (
              <p className="help">Validating...</p>
            )}
          </div>

          <div className="control">
            <button
              className="button is-success"
              type="submit"
              disabled={this.disableButton()}
            >
              Add movie
            </button>
          </div>
        </form>
      </>
    );
  }
}
