import { Component, SyntheticEvent } from 'react';
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
  isErrorTitle: boolean,
  isErrorImgUrl: boolean,
  isErrorImdbUrl: boolean,
  isErrorImdbId: boolean,
  isDisabled: boolean,
};

const initialState: State = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  isErrorTitle: false,
  isErrorImgUrl: false,
  isErrorImdbUrl: false,
  isErrorImdbId: false,
  isDisabled: true,
};

// eslint-disable-next-line max-len
const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component<Props, State> {
  state: State = { ...initialState };

  resetForms = () => {
    this.setState({ ...initialState });
  };

  checkTitle = () => {
    if (this.state.title.trim() === '') {
      this.setState({
        isErrorTitle: true,
        isDisabled: true,
      });

      return false;
    }

    this.setState({
      isErrorTitle: false,
      isDisabled: false,
    });

    return true;
  };

  checkImgURl = () => {
    if (!regExp.test(this.state.imgUrl)) {
      this.setState({
        isErrorImgUrl: true,
        isDisabled: true,
      });

      return false;
    }

    this.setState({
      isErrorImgUrl: false,
      isDisabled: false,
    });

    return true;
  };

  checkImdbUrl = () => {
    if (!regExp.test(this.state.imdbUrl)) {
      this.setState({
        isErrorImdbUrl: true,
        isDisabled: true,
      });

      return false;
    }

    this.setState({
      isErrorImdbUrl: false,
      isDisabled: false,
    });

    return true;
  };

  checkImdbId = () => {
    if (this.state.imdbId.trim() === '') {
      this.setState({
        isErrorImdbId: true,
        isDisabled: true,
      });

      return false;
    }

    this.setState({
      isErrorImdbId: false,
      isDisabled: false,
    });

    return true;
  };

  addMovie = (event: SyntheticEvent) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const isTitle = this.checkTitle();
    const isImgUrl = this.checkImgURl();
    const isImdbUrl = this.checkImdbUrl();
    const isImdbId = this.checkImdbId();

    if (isTitle
      && isImgUrl
      && isImdbUrl
      && isImdbId) {
      this.props.onAdd({
        title: title.trim(),
        description: description.trim(),
        imgUrl,
        imdbUrl,
        imdbId: imdbId.trim(),
      });
      this.resetForms();
    }
  };

  render() {
    return (
      <form
        className="newMovie"
        method="post"
        name="form"
        onSubmit={this.addMovie}
      >
        <p className="newMovie__invitation">
          Put the form here
        </p>
        <p className="newMovie__name-form">
          Movie title:
        </p>
        <input
          className={
            classNames(
              'newMovie__title',
              'newMovie__error',
              {
                'newMovie__error--border': this.state.isErrorTitle,
              },
            )
          }
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={(event) => {
            this.setState({ title: event.target.value });
          }}
          onBlur={this.checkTitle}
        />
        <div
          className="newMovie__title-error
          newMovie__error--text"
        >
          {this.state.isErrorTitle && (
            <p
              className="newMovie__Title-error--text"
            >
              Title is absent
            </p>
          )}
        </div>

        <label className="newMovie__description">
          <p className="newMovie__name-form">
            Description:
          </p>
          <textarea
            className="newMovie__description--text
            newMovie__error"
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
              'newMovie__error',
              {
                'newMovie__error--border': this.state.isErrorImgUrl,
              },
            )
          }
          name="imgUrl"
          placeholder="https://m.media-amazon.com"
          value={this.state.imgUrl}
          onChange={(event) => {
            this.setState({ imgUrl: event.target.value.trim() });
          }}
          onBlur={this.checkImgURl}
        />
        <div
          className="newMovie__imgUrl-error
          newMovie__error--text"
        >
          {this.state.isErrorImgUrl && (
            <p className="newMovie__imgUrl-error--text">
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
              'newMovie__error',
              {
                'newMovie__error--border': this.state.isErrorImdbUrl,
              },
            )
          }
          name="imdbUrl"
          placeholder="https://www.imdb.com"
          value={this.state.imdbUrl}
          onChange={(event) => {
            this.setState({ imdbUrl: event.target.value.trim() });
          }}
          onBlur={this.checkImdbUrl}
        />
        <div
          className="newMovie__imdbUrl-error
          newMovie__error--text"
        >
          {this.state.isErrorImdbUrl && (
            <p
              className="newMovie__imdbUrl-error--text"
            >
              Incorrect URL
            </p>
          )}
        </div>

        <p className="newMovie__name-form">
          ID record:
        </p>
        <input
          className={
            classNames(
              'newMovie__imdbId',
              'newMovie__error',
              {
                'newMovie__error--border': this.state.isErrorImdbId,
              },
            )
          }
          name="imdbId"
          placeholder="tt0319262"
          value={this.state.imdbId}
          onChange={(event) => {
            this.setState({ imdbId: event.target.value });
          }}
          onBlur={this.checkImdbId}
        />
        <div
          className="newMovie__imdbId-error
          newMovie__error--text"
        >
          {this.state.isErrorImdbId && (
            <p
              className="newMovie__imdbId-error--text"
            >
              imdbID is absent
            </p>
          )}
        </div>

        <div className="newMovie__final-error">
          {(this.state.isErrorTitle
            || this.state.isErrorImdbUrl
            || this.state.isErrorImgUrl
            || this.state.isErrorImdbId)
            && (
              <p className="newMovie__final-error--text">
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
