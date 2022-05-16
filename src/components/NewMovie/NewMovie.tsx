import React, { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  addMovie: (
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string
  ) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  errTitle: null | string;
  errImgUrl: null | string;
  errImdbUrl: null | string;
  errImdbId: null | string;
};

// eslint-disable-next-line
const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errTitle: null,
    errImgUrl: null,
    errImdbUrl: null,
    errImdbId: null,
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));

    if (name === 'title') {
      this.setState({
        errTitle: null,
      });
    }

    if (name === 'imdbId') {
      this.setState({
        errImdbId: null,
      });
    }

    if (name === 'imgUrl') {
      this.setState({
        errImgUrl: null,
      });
    }

    if (name === 'imdbUrl') {
      this.setState({
        errImdbUrl: null,
      });
    }
  };

  validateTitle = () => {
    const { title } = this.state;

    if (!title.trim()) {
      this.setState({
        errTitle: 'Please enter title',
      });

      return false;
    }

    return true;
  };

  validateImgUrl = () => {
    const { imgUrl } = this.state;

    if (!imgUrl.trim() || !regExp.test(imgUrl)) {
      this.setState({
        errImgUrl: 'Please enter valid image link',
      });

      return false;
    }

    return true;
  };

  validateImdbUrl = () => {
    const { imdbUrl } = this.state;

    if (!imdbUrl.trim() || !regExp.test(imdbUrl)) {
      this.setState({
        errImdbUrl: 'Please enter valid IMDB link',
      });

      return false;
    }

    return true;
  };

  validateImdbId = () => {
    const { imdbId } = this.state;

    if (!imdbId.trim()) {
      this.setState({
        errImdbId: 'Please enter IMDB Id',
      });

      return false;
    }

    return true;
  };

  submit = (event: React.SyntheticEvent) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    const { addMovie } = this.props;

    event.preventDefault();

    const arrFunc = [this.validateTitle(),
      this.validateImdbId(),
      this.validateImdbUrl(),
      this.validateImgUrl()];
    const validate = arrFunc.every(el => el);

    if (validate) {
      addMovie(title, description, imgUrl, imdbUrl, imdbId);

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errImdbId,
      errImgUrl,
      errTitle,
      errImdbUrl,
    } = this.state;

    return (
      <form onSubmit={this.submit}>
        <h2 className="Form__title">Create new movie</h2>
        <div className="Form__part">
          <p>
            {'Title '}
            <span className="Form__star">*</span>
          </p>

          <input
            type="text"
            name="title"
            value={title}
            placeholder="Inception"
            onChange={this.handleChange}
            onBlur={this.validateTitle}
            required
            className={classNames('Form__input', { Form__inputErr: errTitle })}
          />
        </div>
        {errTitle && <span className="Form__error">{errTitle}</span>}

        <div className="Form__part">
          <p>Description</p>
          <textarea
            value={description}
            name="description"
            onChange={this.handleChange}
            className="Form__area"
          />
        </div>

        <div className="Form__part">
          <p>
            {'ImgUrl '}
            <span className="Form__star">*</span>
          </p>

          <label>
            <input
              type="text"
              name="imgUrl"
              value={imgUrl}
              placeholder="https://www.imdb.com"
              onChange={this.handleChange}
              onBlur={this.validateImgUrl}
              required
              className={classNames(
                'Form__input', { Form__inputErr: errImgUrl },
              )}
            />
          </label>
        </div>
        {errImgUrl && <span className="Form__error">{errImgUrl}</span>}

        <div className="Form__part">
          <p>
            {'ImdbUrl '}
            <span className="Form__star">*</span>
          </p>

          <label>
            <input
              type="text"
              required
              name="imdbUrl"
              value={imdbUrl}
              placeholder="https://www.imdb.com"
              onChange={this.handleChange}
              onBlur={this.validateImdbUrl}
              className={classNames('Form__input',
                { Form__inputErr: errImdbUrl })}
            />
          </label>
        </div>
        {errImdbUrl && <span className="Form__error">{errImdbUrl}</span>}

        <div className="Form__part">
          <p>
            {'ImdbId '}
            <span className="Form__star">*</span>
          </p>

          <label>
            <input
              type="text"
              name="imdbId"
              required
              value={imdbId}
              placeholder="tt0314331"
              onChange={this.handleChange}
              onBlur={this.validateImdbId}
              className={classNames(
                'Form__input', { Form__inputErr: errImdbId },
              )}
            />
          </label>
        </div>
        {errImdbId && <span className="Form__error">{errImdbId}</span>}

        <button
          type="submit"
          className="Form__button"
          disabled={
            !title
            || !imgUrl
            || !imdbUrl
            || !imdbId
            || errImdbUrl !== null
            || errImgUrl !== null
          }
        >
          Add movie
        </button>
      </form>
    );
  }
}
