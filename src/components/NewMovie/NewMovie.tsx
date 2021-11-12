import classNames from 'classnames';
import { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  movie: Movie;
  touched: {
    title: boolean;
    imgUrl: boolean;
    imdbUrl: boolean;
    imdbId: boolean;
  }
  validFieldLink: {
    imgUrl: boolean;
    imdbUrl: boolean;
  }
};

const errMessage = {
  length: 'This field is required!',
  link: 'URL - should be valid',
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    touched: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
    validFieldLink: {
      imgUrl: false,
      imdbUrl: false,
    },
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
    }));
  };

  validateOnBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const regexpLink = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    switch (name) {
      case 'title':
      case 'imdbId':
        this.setState(state => ({
          touched: {
            ...state.touched,
            [name]: state.movie[name].length < 1,
          },
        }));
        break;

      case 'imdbUrl':
      case 'imgUrl':
        if (this.state.movie[name].length === 0) {
          this.setState(state => ({
            touched: {
              ...state.touched,
              [name]: state.movie[name].length < 1,
            },
          }));
        } else {
          const isValid = regexpLink.test(this.state.movie[name]);

          this.setState(state => ({
            touched: {
              ...state.touched,
              [name]: state.movie[name].length < 1,
            },
            validFieldLink: {
              ...state.validFieldLink,
              [name]: !isValid,
            },
          }));
        }

        break;
      default:
        break;
    }
  };

  resetForm = () => {
    this.setState({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      touched: {
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      },
      validFieldLink: {
        imgUrl: false,
        imdbUrl: false,
      },
    });
  };

  render() {
    const { movie, touched, validFieldLink } = this.state;
    const { addMovie } = this.props;

    return (
      <>
        <h2 className="title">Add new movie</h2>
        <form
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            addMovie({
              ...movie,
            });
            this.resetForm();
          }}
        >
          <label
            htmlFor="formTitle"
            className="label"
          >
            <span className="label__title">Title:</span>
            <input
              id="formTitle"
              type="text"
              name="title"
              className={classNames('input', { 'input--error': touched.title })}
              value={movie.title}
              onChange={(event) => this.handleChange(event)}
              onBlur={(event) => this.validateOnBlur(event)}
              required
            />
            {touched.title && (
              <p className="label__error">{errMessage.length}</p>
            )}
          </label>

          <label
            htmlFor="formDescription"
            className="label"
          >
            <span className="label__title">Description:</span>
            <textarea
              id="formDescription"
              name="description"
              className="textarea"
              value={movie.description}
              onChange={(event) => this.handleChange(event)}
            />
          </label>

          <label
            htmlFor="formImgUrl"
            className="label"
          >
            <span className="label__title">imgUrl:</span>
            <input
              id="formImgUrl"
              name="imgUrl"
              className={classNames('input', { 'input--error': touched.imgUrl || validFieldLink.imgUrl })}
              value={movie.imgUrl}
              onChange={(event) => this.handleChange(event)}
              onBlur={(event) => this.validateOnBlur(event)}
              required
            />
            {touched.imgUrl && (
              <p className="label__error">{errMessage.length}</p>
            )}
            {validFieldLink.imgUrl && (
              <p className="label__error">{errMessage.link}</p>
            )}
          </label>

          <label
            htmlFor="formImdbUrl"
            className="label"
          >
            <span className="label__title">imdbUrl:</span>
            <input
              id="formImdbUrl"
              name="imdbUrl"
              className={classNames('input', { 'input--error': touched.imdbUrl || validFieldLink.imdbUrl })}
              value={movie.imdbUrl}
              onChange={(event) => this.handleChange(event)}
              onBlur={(event) => this.validateOnBlur(event)}
              required
            />
            {touched.imdbUrl && (
              <p className="label__error">{errMessage.length}</p>
            )}
            {validFieldLink.imdbUrl && (
              <p className="label__error">{errMessage.link}</p>
            )}
          </label>

          <label
            htmlFor="formImdbId"
            className="label"
          >
            <span className="label__title">imdbUrl:</span>
            <input
              id="formImdbId"
              name="imdbId"
              className={classNames('input', { 'input--error': this.state.touched.imdbId })}
              value={movie.imdbId}
              onChange={(event) => this.handleChange(event)}
              onBlur={(event) => this.validateOnBlur(event)}
              required
            />
            {touched.imdbId && (
              <p className="label__error">{errMessage.length}</p>
            )}
          </label>

          <button
            type="submit"
            className="button"
            disabled={Object.values({ ...touched, ...validFieldLink }).some(el => el === true)}
          >
            Add movie
          </button>
        </form>
      </>
    );
  }
}
