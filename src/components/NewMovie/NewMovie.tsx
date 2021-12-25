import { Component } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';
import { InvalidField } from '../Invalid/InvalidField';
import { Movie } from '../../interfaces/Movie';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  newMovie: Movie;
  validation: boolean | null;
  isImgUrlValid: boolean | null;
  isImdbUrlValid: boolean | null;
  isTitleValid: boolean | null;
  isImdbIdValid: boolean | null;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    validation: false,
    isImgUrlValid: null,
    isImdbUrlValid: null,
    isTitleValid: null,
    isImdbIdValid: null,
  };

  validation = (fieldName: string) => {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const {
      imgUrl,
      imdbUrl,
      title,
      imdbId,
    } = this.state.newMovie;

    if (fieldName === 'imgUrl') {
      const isValidField = regExp.test(imgUrl);

      if (isValidField) {
        this.setState({ isImgUrlValid: true });
      } else {
        this.setState({ isImgUrlValid: false });
      }
    }

    if (fieldName === 'imdbUrl') {
      const isValidField = regExp.test(imdbUrl);

      if (isValidField) {
        this.setState({ isImdbUrlValid: true });
      } else {
        this.setState({ isImdbUrlValid: false });
      }
    }

    if (fieldName === 'title') {
      if (title.trim().length) {
        this.setState({ isTitleValid: true });
      } else {
        this.setState({ isTitleValid: false });
      }
    }

    if (fieldName === 'imdbId') {
      if (imdbId.trim().length) {
        this.setState({ isImdbIdValid: true });
      } else {
        this.setState({ isImdbIdValid: false });
      }
    }

    this.setState(state => {
      const isValid = (
        state.isImdbUrlValid
        && state.isImgUrlValid
        && state.isTitleValid
        && state.isImdbIdValid
      );

      return {
        validation: isValid,
      };
    });
  };

  movieCreate = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    this.props.addMovie({
      title: title.trim(),
      description: description.trim().length > 0 ? description : 'No description',
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    this.clearState();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  clearState = () => {
    this.setState({
      newMovie: {
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        title: '',
      },

      validation: false,
      isImgUrlValid: null,
      isImdbUrlValid: null,
      isTitleValid: null,
      isImdbIdValid: null,
    });
  };

  render() {
    const {
      isImdbUrlValid,
      isImgUrlValid,
      isImdbIdValid,
      isTitleValid,
    } = this.state;

    const invalidImdbUrl = isImdbUrlValid === false;
    const invalidImgUrl = isImgUrlValid === false;
    const invalidImdbId = isImdbIdValid === false;
    const invalidTitle = isTitleValid === false;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.movieCreate();
        }}
      >
        <label htmlFor="title" className="form__label">
          Title:
          {' '}
          <input
            required
            className={classNames('form__field', { form__invalid: invalidTitle })}
            type="text"
            name="title"
            id="title"
            value={this.state.newMovie.title}
            onChange={this.handleChange}
            onBlur={() => {
              this.validation('title');
            }}
          />
          {invalidTitle && <InvalidField field="title" />}
        </label>

        <label htmlFor="description" className="form__label">
          Description:
          {' '}
          <input
            className="form__field"
            type="text"
            name="description"
            id="description"
            onChange={this.handleChange}
            value={this.state.newMovie.description}
          />
        </label>

        <label htmlFor="imgUrl" className="form__label">
          imgUrl:
          {' '}
          <input
            required
            className={classNames('form__field', { form__invalid: invalidImgUrl })}
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={this.state.newMovie.imgUrl}
            onChange={this.handleChange}
            onBlur={() => {
              this.validation('imgUrl');
            }}
          />
          {invalidImgUrl && <InvalidField field="link" />}
        </label>

        <label htmlFor="imdbUrl" className="form__label">
          imdbUrl:
          {' '}
          <input
            required
            className={classNames('form__field', { form__invalid: invalidImdbUrl })}
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            value={this.state.newMovie.imdbUrl}
            onChange={this.handleChange}
            onBlur={() => {
              this.validation('imdbUrl');
            }}
          />
          {invalidImdbUrl && <InvalidField field="link" />}
        </label>

        <label htmlFor="imdbId" className="form__label">
          imdbId:
          {' '}
          <input
            required
            className={classNames('form__field', { form__invalid: invalidImdbId })}
            type="text"
            name="imdbId"
            id="imdbId"
            value={this.state.newMovie.imdbId}
            onChange={this.handleChange}
            onBlur={() => {
              this.validation('imdbId');
            }}
          />
          {invalidImdbId && <InvalidField field="imdbId" />}
        </label>

        <button
          type="submit"
          disabled={!this.state.validation}
        >
          Add movie
        </button>
      </form>
    );
  }
}
