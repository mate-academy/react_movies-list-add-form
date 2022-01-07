import { Component } from 'react';

import classNames from 'classnames';

import './NewMovie.scss';

type Props = {
  addFilm: (newMovie: Movie) => void
};

type State = {
  newMovie: Movie,
  imgUrlCheck: boolean,
  imdbUrlCheck: boolean,
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
    imgUrlCheck: false,
    imdbUrlCheck: false,
  };

  // eslint-disable-next-line no-useless-escape
  pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  chengeState = (event: React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  checkForm = () => {
    const { imdbUrl, imgUrl } = this.state.newMovie;

    const imgUrlPattern = this.pattern.exec(imgUrl);
    const imdbUrlPattern = this.pattern.exec(imdbUrl);

    if (!imgUrlPattern) {
      this.setState((state) => (
        {
          imgUrlCheck: true,
          newMovie: {
            title: state.newMovie.title,
            description: state.newMovie.description,
            imgUrl: '',
            imdbUrl: state.newMovie.imdbUrl,
            imdbId: state.newMovie.imdbId,
          },
        }
      ));

      return;
    }

    if (!imdbUrlPattern) {
      this.setState((state) => (
        {
          imgUrlCheck: false,
          imdbUrlCheck: true,
          newMovie: {
            title: state.newMovie.title,
            description: state.newMovie.description,
            imgUrl: state.newMovie.imgUrl,
            imdbUrl: '',
            imdbId: state.newMovie.imdbId,
          },
        }
      ));

      return;
    }

    this.setState({
      imdbUrlCheck: false,
      imgUrlCheck: false,
    });

    this.props.addFilm(this.state.newMovie);
    this.clearForm();
  };

  clearForm = () => {
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

  controlAddButton = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    switch (true) {
      case title.length < 1:
      case description.length < 1:
      case imgUrl.length < 1:
      case imdbUrl.length < 1:
      case imdbId.length < 1:
        return true;
      default:
        return false;
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    return (
      <>
        <h2
          className="Title"
        >
          Add Film
        </h2>
        <form
          className="Form"
          onSubmit={(event) => {
            event.preventDefault();

            this.checkForm();
          }}
        >

          <input
            required
            type="text"
            name="title"
            placeholder="Enter Title"
            value={title}
            onChange={this.chengeState}
          />

          <input
            required
            type="text"
            name="description"
            placeholder="Enter Description"
            value={description}
            onChange={this.chengeState}
          />

          <input
            required
            type="text"
            name="imgUrl"
            placeholder="imgUrl"
            className={classNames('Form__input', { 'Form__input--error': this.state.imgUrlCheck })}
            value={imgUrl}
            onChange={this.chengeState}
          />
          {this.state.imgUrlCheck && (
            <p className="Form__input--message-error">Please enter a valid value</p>
          )}

          <input
            required
            type="text"
            name="imdbUrl"
            placeholder="imdbUrl"
            className={classNames('Form__input', { 'Form__input--error': this.state.imdbUrlCheck })}
            value={imdbUrl}
            onChange={this.chengeState}
          />
          {this.state.imdbUrlCheck && (
            <p className="Form__input--message-error">Please enter a valid value</p>
          )}

          <input
            type="text"
            required
            name="imdbId"
            placeholder="imdbId"
            value={imdbId}
            onChange={this.chengeState}
          />

          <button
            type="submit"
            disabled={this.controlAddButton()}
          >
            Add
          </button>

        </form>
      </>
    );
  }
}
