import { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  isErrorImgUrl: boolean,
  isErrorimdbUrl: boolean,
  isDisabled: boolean,
};

// eslint-disable-next-line max-len
const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isErrorImgUrl: false,
    isErrorimdbUrl: false,
    isDisabled: false,
  };

  resetForms = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isErrorImgUrl: false,
      isErrorimdbUrl: false,
      isDisabled: false,
    });
  };

  checkImgURl = () => {
    if (!regExp.test(this.state.imgUrl)) {
      this.setState({
        isErrorImgUrl: true,
        isDisabled: true,
      });
    } else {
      this.setState({
        isErrorImgUrl: false,
        isDisabled: false,
      });
    }
  };

  checkImdbUrl = () => {
    if (!regExp.test(this.state.imdbUrl)) {
      this.setState({
        isErrorimdbUrl: true,
        isDisabled: true,
      });
    } else {
      this.setState({
        isErrorimdbUrl: false,
        isDisabled: false,
      });
    }
  };

  checkMovie = () => {
    if (!this.state.isErrorImgUrl && !this.state.isErrorimdbUrl) {
      this.props.onAdd(this.state);
      this.resetForms();
    }
  };

  render() {
    return (
      <form
        className="newMovie"
        method="post"
        name="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.checkMovie();
        }}
      >
        <p className="newMovie__invitation">
          Put the form here
        </p>
        <p className="newMovie__name-form">
          Movie title:
        </p>
        <input
          className="newMovie__title
          input"
          name="title"
          placeholder="Title"
          required
          value={this.state.title}
          onChange={(event) => {
            this.setState({ title: event.target.value });
          }}
        />
        <label className="newMovie__description">
          <p className="newMovie__name-form">
            Description:
          </p>
          <textarea
            className="newMovie__description--text
            input"
            name="description"
            placeholder="..."
            value={this.state.description}
            onChange={(event) => {
              this.setState({ description: event.target.value });
            }}
          />
        </label>
        <p className="newMovie__name-form">
          Image Link:
        </p>
        <input
          className={
            classNames(
              'newMovie__imgUrl',
              'url',
              {
                'url--wrong': this.state.isErrorImgUrl === true,
              },
            )
          }
          name="imgUrl"
          placeholder="https://m.media-amazon.com"
          required
          value={this.state.imgUrl}
          onChange={(event) => {
            this.setState({ imgUrl: event.target.value });
          }}
          onBlur={this.checkImgURl}
        />
        <div
          className="newMovie__imgUrl
          url--error"
        >
          {this.state.isErrorImgUrl && (
            <p className="newMovie__imgUrl--error-text">
              Incorrect URL
            </p>
          )}
        </div>

        <p className="newMovie__name-form">
          Film Link:
        </p>
        <input
          className={
            classNames(
              'newMovie__imdbUrl',
              'url',
              {
                'url--wrong': this.state.isErrorimdbUrl === true,
              },
            )
          }
          name="imdbUrl"
          placeholder="https://www.imdb.com"
          required
          value={this.state.imdbUrl}
          onChange={(event) => {
            this.setState({ imdbUrl: event.target.value });
          }}
          onBlur={this.checkImdbUrl}
        />
        <div
          className="newMovie__imdbUrl
          url--error"
        >
          {this.state.isErrorimdbUrl && (
            <p
              className="newMovie__imdbUrl--error-text"
            >
              Incorrect URL
            </p>
          )}
        </div>

        <p className="newMovie__name-form">
          ID record:
        </p>
        <input
          className="newMovie__imdbId
          input"
          name="imdbId"
          placeholder="tt0319262"
          required
          value={this.state.imdbId}
          onChange={(event) => {
            this.setState({ imdbId: event.target.value });
          }}
        />

        <div className="newMovie__imdbUrl--error">
          {(this.state.isErrorimdbUrl
            || this.state.isErrorImgUrl)
            && (
              <p className="newMovie__imdbUrl--error-text">
                Please, enter correct data
              </p>
            )}
        </div>

        <button
          className="newMovie__button"
          type="submit"
          disabled={this.state.isDisabled}
        >
          ADD   MOVIE
        </button>
      </form>
    );
  }
}
