import React, { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  addMovie:(
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string
  ) => void
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  errTitle: string | null,
  errImgUrl: string | null,
  errImdbUrl: string | null,
  errImdbId: string | null,
};

// eslint-disable-next-line
const validUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errTitle: '',
    errImgUrl: '',
    errImdbUrl: '',
    errImdbId: '',
  };

  handleInput = (event:
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState((state: State) => ({
      ...state,
      [name]: value,
    }));

    if (name === 'title') {
      this.setState({
        errTitle: null,
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

    if (name === 'imdbId') {
      this.setState({
        errImdbId: null,
      });
    }
  };

  validationTitle = () => {
    const { title } = this.state;

    if (!title.trim()) {
      this.setState({
        errTitle: 'Please input Title',
      });

      return false;
    }

    return true;
  };

  validationImgUrl = () => {
    const { imgUrl } = this.state;

    if (!imgUrl.trim() || !validUrl.test(imgUrl)) {
      this.setState({
        errImgUrl: 'Please input correct Img Url',
      });

      return false;
    }

    return true;
  };

  validationImdbUrl = () => {
    const { imdbUrl } = this.state;

    if (!imdbUrl.trim() || !validUrl.test(imdbUrl)) {
      this.setState({
        errImdbUrl: 'Please input correct Imdb Url',
      });

      return false;
    }

    return true;
  };

  validationImdbId = () => {
    const { imdbId } = this.state;

    if (!imdbId.trim()) {
      this.setState({
        errImdbId: 'Please input ImdbId',
      });

      return false;
    }

    return true;
  };

  onSubmit = (event: React.SyntheticEvent) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const { addMovie } = this.props;

    event.preventDefault();

    if (this.validationTitle() && this.validationImgUrl()
     && this.validationImdbUrl() && this.validationImdbId()) {
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
      errImdbId,
      errImgUrl,
      errTitle,
      errImdbUrl,
    } = this.state;

    return (
      <form name="form" className="form" onSubmit={this.onSubmit}>
        <h2 className="form__title">Add new movie</h2>
        <label>
          Title
          <input
            className={classNames('form__input', { form__inputErr: errTitle })}
            value={this.state.title}
            type="text"
            name="title"
            placeholder="Movie name"
            required
            onBlur={this.validationTitle}
            onChange={this.handleInput}
          />
        </label>
        {errTitle && <p className="form__err">{errTitle}</p>}

        <label>
          Description
          <textarea
            value={this.state.description}
            className="form__input"
            name="description"
            placeholder="Write about movie"
            onChange={this.handleInput}
          />
        </label>

        <label>
          ImgUrl
          <input
            value={this.state.imgUrl}
            className={classNames('form__input', { form__inputErr: errImgUrl })}
            placeholder="https://m.media-amazon.com"
            type="text"
            name="imgUrl"
            required
            onBlur={this.validationImgUrl}
            onChange={this.handleInput}
          />
        </label>
        {errImgUrl && <p className="form__err">{errImgUrl}</p>}

        <label>
          ImdbUrl
          <input
            value={this.state.imdbUrl}
            className={classNames('form__input',
              { form__inputErr: errImdbUrl })}
            type="text"
            name="imdbUrl"
            placeholder="https://m.media-amazon.com"
            required
            onBlur={this.validationImdbUrl}
            onChange={this.handleInput}
          />
        </label>
        {errImdbUrl && <p className="form__err">{errImdbUrl}</p>}

        <label>
          ImdbId
          <input
            value={this.state.imdbId}
            className={classNames('form__input', { form__inputErr: errImdbId })}
            type="text"
            name="imdbId"
            placeholder="tt0314331"
            required
            onBlur={this.validationImdbId}
            onChange={this.handleInput}
          />
        </label>
        {errImdbId && <p className="form__err">{errImdbId}</p>}

        <button
          className="form__button"
          type="submit"
          disabled={!this.state.title
             || !this.state.imgUrl
             || !this.state.imdbUrl
             || !this.state.imdbId}
        >
          Add Movie
        </button>
      </form>
    );
  }
}
