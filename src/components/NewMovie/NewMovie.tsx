/* eslint-disable no-console */
import React from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};
type State = {
  newMovie: Movie;
  invalidTitle: boolean;
  invalidDescription: boolean;
  invalidImgUrl: boolean;
  invalidImdbUrl: boolean;
  invalidImdbId: boolean;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    invalidTitle: false,
    invalidDescription: false,
    invalidImgUrl: false,
    invalidImdbUrl: false,
    invalidImdbId: false,
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleChange = (
    event:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState(currentState => ({
      newMovie: {
        ...currentState.newMovie,
        [name]: value,
      },
    }));

    if (name === 'title') {
      this.setState({ invalidTitle: false });
    }

    if (name === 'description') {
      this.setState({ invalidDescription: false });
    }

    if (name === 'imgUrl') {
      this.setState({ invalidImgUrl: false });
    }

    if (name === 'imdbUrl') {
      this.setState({ invalidImdbUrl: false });
    }

    if (name === 'imdbId') {
      this.setState({ invalidImdbId: false });
    }
  };

  onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onAdd(this.state.newMovie);

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

  onBlur = (
    event: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target;
    const text = value.trim();
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (name === 'imgUrl' && !regex.test(text)) {
      this.setState({ invalidImgUrl: true });
    }

    if (name === 'imdbUrl' && !regex.test(text)) {
      this.setState({ invalidImdbUrl: true });
    }

    if (text.length === 0) {
      if (name === 'title') {
        this.setState({ invalidTitle: true });
      } else if (name === 'description') {
        this.setState({ invalidDescription: true });
      } else if (name === 'imdbId') {
        this.setState({ invalidImdbId: true });
      }
    }

    if (name === 'imdbId' && Number.isNaN(Number(text))) {
      this.setState({ invalidImdbId: true });
    }
  };

  render() {
    console.log(this.state);
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;
    const {
      invalidTitle,
      invalidDescription,
      invalidImgUrl,
      invalidImdbUrl,
      invalidImdbId,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="sidebar__form Form">
        <label htmlFor="form-title" className="Form__label">
          Film title:
          <input
            className={classNames('Form__input', 'Form__title', { 'Form__input--error': invalidTitle })}
            type="text"
            name="title"
            id="form-title"
            value={title}
            onChange={this.handleChange}
            onBlur={this.onBlur}
            placeholder="type title here..."
            required
          />
          <div className="Form__error">{invalidTitle && 'Wrong title'}</div>
        </label>
        <label htmlFor="form-description" className="Form__label">
          Film description:
          <textarea
            className={classNames('Form__input', 'Form__description', { 'Form__input--error': invalidDescription })}
            name="description"
            id="form-description"
            value={description}
            onChange={this.handleChange}
            rows={4}
            onBlur={this.onBlur}
            placeholder="type description here..."
            required
          />
          <div className="Form__error">{invalidDescription && 'Wrong description'}</div>
        </label>
        <label htmlFor="form-imgUrl" className="Form__label">
          Link for film poster:
          <input
            className={classNames('Form__input', 'Form__imgUrl', { 'Form__input--error': invalidImgUrl })}
            type="text"
            name="imgUrl"
            id="form-imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            onBlur={this.onBlur}
            placeholder="type imgUrl here..."
            required
          />
          <div className="Form__error">{invalidImgUrl && 'Wrong image link'}</div>
        </label>
        <label htmlFor="form-imdbUrl" className="Form__label">
          Link to the IMDb:
          <input
            className={classNames('Form__input', 'Form__imdbUrl', { 'Form__input--error': invalidImdbUrl })}
            type="text"
            name="imdbUrl"
            id="form-imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            onBlur={this.onBlur}
            placeholder="type imdbUrl here..."
            required
          />
          <div className="Form__error">{invalidImdbUrl && 'Wrong IMDb link'}</div>
        </label>
        <label htmlFor="form-imdbId" className="Form__label">
          Films id on the IMDb:
          <input
            className={classNames('Form__input', 'Form__imdbId', { 'Form__input--error': invalidImdbId })}
            type="text"
            name="imdbId"
            id="form-imdbId"
            value={imdbId}
            onChange={this.handleChange}
            onBlur={this.onBlur}
            placeholder="type imdbId here..."
            required
          />
          <div className="Form__error">{invalidImdbId && 'Wrong IMDb Id'}</div>
        </label>

        <button
          className="Form__btn"
          type="submit"
          disabled={invalidTitle || invalidDescription || invalidImgUrl
          || invalidImdbUrl || invalidImdbId}
        >
          Add film
        </button>
      </form>
    );
  }
}
