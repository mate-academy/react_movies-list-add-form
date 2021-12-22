import { Component } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';
import { InvalidLink } from '../Invalid/Invalid';
import { Movie } from '../../interfaces/Movie';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  newMovie: Movie;
  validation: boolean | null;
  imgUrlValid: boolean | null,
  imdbUrlValid: boolean | null,
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

    this.setState(state => {
      const isValid = state.imdbUrlValid && state.imgUrlValid;

      return {
        validation: isValid,
      };
    });
  };

  movieCreate = () => {
    this.props.addMovie(this.state.newMovie);
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
    const { imdbUrlValid, imgUrlValid } = this.state;
    const invalidImdbUrl = imdbUrlValid === false;
    const invalidImgUrl = imgUrlValid === false;

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
            className="form__field"
            type="text"
            name="title"
            id="title"
            value={this.state.newMovie.title}
            onChange={this.handleChange}
          />
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
            onChange={this.handleChange}
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
          {invalidImgUrl && <InvalidLink />}
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
          {invalidImdbUrl && <InvalidLink />}
        </label>

        <label htmlFor="imdbId" className="form__label">
          imdbId:
          {' '}
          <input
            required
            className="form__field"
            type="text"
            name="imdbId"
            id="imdbId"
            value={this.state.newMovie.imdbId}
            onChange={this.handleChange}
          />
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
