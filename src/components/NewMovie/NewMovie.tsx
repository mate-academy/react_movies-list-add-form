import { Component } from 'react';
import classNames from 'classnames';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void
};

type EmptyErrors = {
  isTitleErrorVisible: boolean;
  isImgUrlErrorVisible: boolean;
  isImdbUrlErrorVisible: boolean;
  isImdbIdErrorVisible: boolean;
};

type ValidUrlErrors = {
  isImgUrlInvalid: boolean;
  isImdbUrlInvalid: boolean;
};

type State = Movie & EmptyErrors & ValidUrlErrors & {
  isSubmited: boolean;
  isSubmitDisabled: boolean;
};

function urlValidator(str: string) {
  // eslint-disable-next-line max-len
  const validUrlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  return str.match(validUrlRegex) || false;
}

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleErrorVisible: false,
    isImgUrlErrorVisible: false,
    isImdbUrlErrorVisible: false,
    isImdbIdErrorVisible: false,
    isImgUrlInvalid: false,
    isImdbUrlInvalid: false,
    isSubmited: false,
    isSubmitDisabled: false,
  };

  isInputEmpty = (value: string, inputName: string) => {
    let errorName: string;

    switch (inputName) {
      case 'title':
        errorName = 'isTitleErrorVisible';
        break;

      case 'imgUrl':
        errorName = 'isImgUrlErrorVisible';
        break;

      case 'imdbUrl':
        errorName = 'isImdbUrlErrorVisible';
        break;

      case 'imdbId':
        errorName = 'isImdbIdErrorVisible';
        break;

      default:
        return;
    }

    if (value) {
      this.setState((prevState) => ({
        ...prevState,
        [errorName]: false,
        isSubmitDisabled: false,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        [errorName]: true,
        isSubmitDisabled: true,
      }));
    }
  };

  isUrlValid = (value: string, inputName: string) => {
    let errorName: keyof ValidUrlErrors;

    switch (inputName) {
      case 'imgUrl':
        errorName = 'isImgUrlInvalid';
        break;

      case 'imdbUrl':
        errorName = 'isImdbUrlInvalid';
        break;

      default:
        return;
    }

    if (urlValidator(value)) {
      this.setState((prevState) => ({
        ...prevState,
        [errorName]: false,
        isSubmitDisabled: false,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        [errorName]: true,
        isSubmitDisabled: true,
      }));
    }
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.setState({ isSubmited: true });

    if (!title) {
      this.setState({
        isTitleErrorVisible: true,
        isSubmitDisabled: true,
      });

      return;
    }

    if (!imgUrl) {
      this.setState({
        isImgUrlErrorVisible: true,
        isSubmitDisabled: true,
      });

      return;
    }

    if (!imdbUrl) {
      this.setState({
        isImdbUrlErrorVisible: true,
        isSubmitDisabled: true,
      });

      return;
    }

    if (!imdbId) {
      this.setState({
        isImdbIdErrorVisible: true,
        isSubmitDisabled: true,
      });

      return;
    }

    if (!urlValidator(imgUrl)) {
      this.setState({
        isImgUrlInvalid: true,
        isSubmitDisabled: true,
      });

      return;
    }

    if (!urlValidator(imdbUrl)) {
      this.setState({
        isImdbUrlInvalid: false,
        isSubmitDisabled: true,
      });

      return;
    }

    const { onAdd } = this.props;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isSubmited: false,
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleErrorVisible,
      isImgUrlErrorVisible,
      isImdbUrlErrorVisible,
      isImdbIdErrorVisible,
      isImdbUrlInvalid,
      isImgUrlInvalid,
      isSubmited,
      isSubmitDisabled,
    } = this.state;

    return (
      <form
        onSubmit={(event) => {
          this.handleSubmit(event);
        }}
        className="form"
      >
        <h2 className="form__title">
          Add new movie form
        </h2>

        <label className="form__label">
          Title:
          <input
            name="title"
            type="text"
            value={title}
            onChange={({ target }) => {
              this.setState({ title: target.value });
            }}
            onBlur={({ target }) => {
              if (isSubmited) {
                this.isInputEmpty(target.value, target.name);
              }
            }}
            className={classNames(
              'form__input',
              { 'form__input--invalid': isTitleErrorVisible },
            )}
          />
        </label>

        {isTitleErrorVisible && (
          <p className="form__error">
            * Title is required
          </p>
        )}

        <label className="form__label">
          Description:
          <input
            name="description"
            type="text"
            value={description}
            onChange={({ target }) => {
              this.setState({ description: target.value });
            }}
            className="form__input"
          />
        </label>

        <label className="form__label">
          Image URL:
          <input
            name="imgUrl"
            type="text"
            value={imgUrl}
            onChange={({ target }) => {
              this.setState({ imgUrl: target.value });
            }}
            onBlur={({ target }) => {
              if (isSubmited) {
                this.isInputEmpty(target.value, target.name);
                this.isUrlValid(target.value, target.name);
              }
            }}
            className={classNames(
              'form__input',
              {
                'form__input--invalid': (isImgUrlErrorVisible
                  || isImgUrlInvalid),
              },
            )}
          />
        </label>

        {isImgUrlErrorVisible && (
          <p className="form__error">
            * Image URL is required
          </p>
        )}

        {isImgUrlInvalid && (
          <p className="form__error">
            * Image URL is not valid
          </p>
        )}

        <label className="form__label">
          IMDB URL:
          <input
            name="imdbUrl"
            type="text"
            value={imdbUrl}
            onChange={({ target }) => {
              this.setState({ imdbUrl: target.value });
            }}
            onBlur={({ target }) => {
              if (isSubmited) {
                this.isInputEmpty(target.value, target.name);
                this.isUrlValid(target.value, target.name);
              }
            }}
            className={classNames(
              'form__input',
              {
                'form__input--invalid': (isImdbUrlErrorVisible
                  || isImdbUrlInvalid),
              },
            )}
          />
        </label>

        {isImdbUrlErrorVisible && (
          <p className="form__error">
            * IMDB URL is required
          </p>
        )}

        {isImdbUrlInvalid && (
          <p className="form__error">
            * IMDB URL is not valid
          </p>
        )}

        <label className="form__label">
          IMDB ID:
          <input
            name="imdbId"
            type="text"
            value={imdbId}
            onChange={({ target }) => {
              this.setState({ imdbId: target.value });
            }}
            onBlur={({ target }) => {
              if (isSubmited) {
                this.isInputEmpty(target.value, target.name);
              }
            }}
            className={classNames(
              'form__input',
              { 'form__input--invalid': isImdbIdErrorVisible },
            )}
          />
        </label>

        {isImdbIdErrorVisible && (
          <p className="form__error">
            * IMDB ID is required
          </p>
        )}

        <button
          type="submit"
          className="form__submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>

      </form>
    );
  }
}
