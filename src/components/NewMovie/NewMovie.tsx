import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  movie: Movie,
  isValid: {
    title?: boolean,
    imgUrl?: boolean,
    imdbUrl?: boolean,
    imdbId?: boolean,
  },
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
    isValid: {
      title: true,
      imgUrl: true,
      imdbUrl: true,
      imdbId: true,
    },
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
    }));
  };

  setValidation = (inputName: string, validation: {}) => {
    this.setState(state => ({
      isValid: {
        ...state.isValid,
        [inputName]: validation,
      },
    }));
  };

  validateInput = (inputName: string, inputValue: string) => {
    // eslint-disable-next-line max-len
    const regexUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const regexImdbId = /^[a-z]{2,}\d+$/;
    const regexImdbUrl = /https:\/\/www\.imdb\.com\/title\/[a-z]{2,}\d+/;

    switch (inputName) {
      case 'imgUrl':
        this.setValidation(inputName, regexUrl.test(inputValue));
        break;

      case 'imdbUrl':
        this.setValidation(inputName, regexImdbUrl.test(inputValue));
        break;

      case 'title':
        this.setValidation(inputName, inputValue.length >= 4);
        break;

      case 'imdbId':
        this.setValidation(inputName, regexImdbId.test(inputValue));
        break;

      default:
    }
  };

  render() {
    const {
      title, description,
      imgUrl, imdbUrl,
      imdbId,
    } = this.state.movie;

    const {
      title: titleValid,
      imdbId: idValid,
      imdbUrl: imdbValid,
      imgUrl: imgValid,
    } = this.state.isValid;

    const initialState = {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    };

    const errorStyle = {
      border: '2px solid #9b2226',
      borderRadius: '5px',
    };

    return (
      <>
        <form
          method="POST"
          className="new-movie-form"
          onSubmit={(event) => {
            event.preventDefault();
            this.props.addMovie(this.state.movie);
            this.setState({ movie: initialState });
          }}
        >
          <p
            className="new-movie-form__title"
          >
            To add new movie, fill in data below:
          </p>

          <input
            required
            className="new-movie-form__input"
            style={!titleValid ? errorStyle : {}}
            type="text"
            placeholder="title"
            name="title"
            value={title}
            onChange={this.handleChange}
            onBlur={(event) => {
              this.validateInput(event.target.name, event.target.value);
            }}
          />
          {!titleValid && (
            <p className="error-text">Title should be 4+ chars</p>
          )}

          <input
            required
            className="new-movie-form__input"
            style={!imgValid ? errorStyle : {}}
            type="text"
            placeholder="image url (https://_imgUrl_)"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            onBlur={(event) => {
              this.validateInput(event.target.name, event.target.value);
            }}
          />
          {!imgValid && (
            <p className="error-text">imgUrl must be a valid url</p>
          )}

          <input
            required
            className="new-movie-form__input"
            style={!imdbValid ? errorStyle : {}}
            type="text"
            placeholder="imdb url (https://www.imdb.com/title/_imdbId_)"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            onBlur={(event) => {
              this.validateInput(event.target.name, event.target.value);
            }}
          />
          {!imdbValid && (
            <p className="error-text">imdbUrl must be a valid url</p>
          )}

          <input
            required
            className="new-movie-form__input"
            style={!idValid ? errorStyle : {}}
            type="text"
            placeholder="imdb id"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            onBlur={(event) => {
              this.validateInput(event.target.name, event.target.value);
            }}
          />
          {!idValid && (
            <p className="error-text">imdbId must meet a format: 2+ letters followed by digits</p>
          )}

          <textarea
            className="new-movie-form__input"
            placeholder="description (max length 150 chars)"
            name="description"
            maxLength={150}
            rows={4}
            value={description}
            onChange={this.handleChange}
          />

          <button
            type="submit"
            disabled={!Object.values(this.state.isValid)
              .every(validation => validation === true)}
          >
            Add a movie
          </button>

        </form>

        <hr />
      </>
    );
  }
}
