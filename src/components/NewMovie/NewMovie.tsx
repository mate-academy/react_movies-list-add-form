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
  imgUrlValid: boolean | null;
  imdbUrlValid: boolean | null;
  titleValid: boolean | null;
  imdbIdValid: boolean | null;
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
    imgUrlValid: null,
    imdbUrlValid: null,
    titleValid: null,
    imdbIdValid: null,
  };

  validation = (fieldName: string) => {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (fieldName === 'imgUrl') {
      const isValidField = regExp.test(this.state.newMovie.imgUrl);

      if (isValidField) {
        this.setState({ imgUrlValid: true });
      } else {
        this.setState({ imgUrlValid: false });
      }
    }

    if (fieldName === 'imdbUrl') {
      const isValidField = regExp.test(this.state.newMovie.imdbUrl);

      if (isValidField) {
        this.setState({ imdbUrlValid: true });
      } else {
        this.setState({ imdbUrlValid: false });
      }
    }

    if (fieldName === 'title') {
      if (this.state.newMovie.title.trim().length > 0) {
        this.setState({ titleValid: true });
      } else {
        this.setState({ titleValid: false });
      }
    }

    if (fieldName === 'imdbId') {
      if (this.state.newMovie.imdbId.trim().length > 0) {
        this.setState({ imdbIdValid: true });
      } else {
        this.setState({ imdbIdValid: false });
      }
    }

    this.setState(state => {
      const isValid = (
        state.imdbUrlValid
        && state.imgUrlValid
        && state.titleValid
        && state.imdbIdValid
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
    });
  };

  render() {
    const {
      imdbUrlValid,
      imgUrlValid,
      imdbIdValid,
      titleValid,
    } = this.state;

    const invalidImdbUrl = imdbUrlValid === false;
    const invalidImgUrl = imgUrlValid === false;
    const invalidImdbId = imdbIdValid === false;
    const invalidTitle = titleValid === false;

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
