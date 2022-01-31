import React from 'react';
import classNames from 'classnames';

type Props = {
  onMovie: (movie: Movie) => void;
};
type HasError = {
  imgUrl: boolean,
  imdbUrl: boolean,
};

type State = {
  title: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  description: string,
  formValid: false,
  hasErrors: HasError,
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
    formValid: false,
    hasErrors: {
      imgUrl: false,
      imdbUrl: false,
    },
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      [name as keyof State]: value,
    }));
  };

  clearState = () => {
    this.setState({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.validateForm()) {
      this.props.onMovie(this.state);
      this.clearState();
    }
  };

  validateField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let isValid = true;
    const hasError = this.state.hasErrors;
    const regex = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    if (name === 'imgUrl' || name === 'imdbUrl') {
      isValid = regex.test(value);
      hasError[name] = !isValid;
    }

    this.setState((state) => ({
      ...state,
      hasErrors: {
        ...state.hasErrors,
        [name]: !isValid,
      },
    }));

    return isValid;
  };

  validateForm = () => {
    const {
      title,
      imdbId,
      description,
      hasErrors,
    } = this.state;

    if (!title || !imdbId || !description) {
      return false;
    }

    if (hasErrors.imgUrl === true
      || hasErrors.imdbUrl === true) {
      return false;
    }

    return true;
  };

  render() {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
      hasErrors,
    } = this.state;

    return (
      <form
        className="ui fluid form"
        onSubmit={this.handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Enten a title"
            name="title"
            value={title}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className={classNames('field', { error: hasErrors.imgUrl })}>
          <input
            type="text"
            placeholder="Enten an image url"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            onBlur={this.validateField}
            required
          />
          {hasErrors.imgUrl && (
            <div className="ui pointing red basic label">
              Please enter valid an image url
            </div>
          )}
        </div>

        <div className={classNames('field', { error: hasErrors.imdbUrl })}>
          <input
            type="text"
            placeholder="Enten an IMDb url"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            onBlur={this.validateField}
            required
          />
          {hasErrors.imdbUrl && (
            <div className="ui pointing red basic label">
              Please enter valid an IMDb url
            </div>
          )}
        </div>

        <div className="field">
          <input
            type="text"
            placeholder="Enten an IMDb Id"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="field">
          <textarea
            placeholder="Enten a description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </div>

        <button
          className={classNames('ui fluid yellow button', { disabled: !this.validateForm() })}
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}
