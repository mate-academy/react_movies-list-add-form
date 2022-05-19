import {
  Component,
  SyntheticEvent,
} from 'react';
import classNames from 'classnames';

import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

type RequiredErrors = {
  titleIsRequiredError: boolean,
  imgUrlIsRequiredError: boolean,
  imdbUrlIsRequiredError: boolean,
  imdbIdRequiredError: boolean
};

type IncorrectURLErrors = {
  imgUrlError: boolean,
  imdbUrlError: boolean,
};

type State = RequiredErrors & IncorrectURLErrors & {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  isCanSubmit: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',

    titleIsRequiredError: false,
    imgUrlIsRequiredError: false,
    imdbUrlIsRequiredError: false,
    imdbIdRequiredError: false,

    imgUrlError: false,
    imdbUrlError: false,

    isCanSubmit: true,
  };

  submit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const titleEmptyError = this.setIsEmptyError('title', title);

    const imgEmptyError = this.setIsEmptyError('imgUrl', imgUrl);
    const imgUrlError = this.setIsInvalidUrlError('imgUrl', imgUrl);

    const imdbEmptyError = this.setIsEmptyError('imdbUrl', imdbUrl);
    const imdbUrlEmptyError = this.setIsInvalidUrlError('imdbUrl', imdbUrl);

    const imdbIdEmptyError = this.setIsEmptyError('imdbId', imdbId);

    if (titleEmptyError
      || imgEmptyError
      || imgUrlError
      || imdbEmptyError
      || imdbUrlEmptyError
      || imdbIdEmptyError) {
      this.setStateToField('isCanSubmit', false);
    } else {
      this.setStateToField('isCanSubmit', true);
      const newMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      this.props.addMovie(newMovie);
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  };

  onChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setStateToField(name, value);
  };

  onBlurHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    const isFieldEmpty = this.setIsEmptyError(name, value);
    const isUrlIncorrect = this.setIsInvalidUrlError(name, value);

    if (!isFieldEmpty && !isUrlIncorrect) {
      this.setStateToField('isCanSubmit', true);
    } else {
      this.setStateToField('isCanSubmit', false);
    }
  };

  setIsInvalidUrlError = (name: string, value: string) => {
    let nameOfFieldError: keyof State;
    // eslint-disable-next-line max-len
    const patternURL = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/g;

    switch (name) {
      case 'imgUrl':
        nameOfFieldError = 'imgUrlError';
        break;

      case 'imdbUrl':
        nameOfFieldError = 'imdbUrlError';
        break;

      default:
        return false;
    }

    const out = !value.match(patternURL);

    this.setStateToField(nameOfFieldError, out);

    // eslint-disable-next-line consistent-return
    return out;
  };

  setIsEmptyError = (name: string, value: string) => {
    let nameOfFieldError: keyof State;

    switch (name) {
      case 'title':
        nameOfFieldError = 'titleIsRequiredError';
        break;

      case 'imgUrl':
        nameOfFieldError = 'imgUrlIsRequiredError';
        break;

      case 'imdbUrl':
        nameOfFieldError = 'imdbUrlIsRequiredError';
        break;

      case 'imdbId':
        nameOfFieldError = 'imdbIdRequiredError';
        break;

      default:
        return;
    }

    const out = !value.trim().length;

    this.setStateToField(nameOfFieldError, out);

    // eslint-disable-next-line consistent-return
    return out;
  };

  setStateToField = (name: string, value: string | boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,

      titleIsRequiredError,
      imgUrlIsRequiredError,
      imdbUrlIsRequiredError,
      imdbIdRequiredError,

      imgUrlError,
      imdbUrlError,

      isCanSubmit,
    } = this.state;

    return (
      <form
        onSubmit={this.submit}
        className="newMovie"
      >
        <h2 className="newMovie__title">
          Add new movie title
        </h2>
        <div>
          <label className="newMovie__form-label">
            * Title:
            <input
              className={
                classNames(
                  'newMovie__form_input',
                  {
                    newMovie__form_input_error: titleIsRequiredError,
                  },
                )
              }
              name="title"
              type="text"
              value={title}
              onChange={this.onChangeHandler}
              onBlur={this.onBlurHandler}
            />
          </label>
          {titleIsRequiredError
          && (
            <p className="newMovie__exception_description">
              Title is required
            </p>
          )}
        </div>

        <div>
          <label className="newMovie__form-label">
            Description:
            <input
              className={
                classNames(
                  'newMovie__form_input',
                )
              }
              name="description"
              type="text"
              value={description}
              onChange={this.onChangeHandler}
            />
          </label>
        </div>

        <div>
          <label className="newMovie__form-label">
            * Image Url:
            <input
              className={
                classNames(
                  'newMovie__form_input',
                  {
                    newMovie__form_input_error:
                      imgUrlIsRequiredError || imgUrlError,
                  },
                )
              }
              name="imgUrl"
              type="text"
              value={imgUrl}
              onChange={this.onChangeHandler}
              onBlur={this.onBlurHandler}
            />
          </label>
          {(imgUrlIsRequiredError
          && (
            <p className="newMovie__exception_description">
              ImgUrl is required
            </p>
          ))
          || (imgUrlError
          && (
            <p className="newMovie__exception_description">
              ImgUrl is incorrect
            </p>
          ))}
        </div>

        <div>
          <label className="newMovie__form-label">
            * IMDB Url:
            <input
              className={
                classNames(
                  'newMovie__form_input',
                  {
                    newMovie__form_input_error:
                      imdbUrlIsRequiredError || imdbUrlError,
                  },
                )
              }
              name="imdbUrl"
              type="text"
              value={imdbUrl}
              onChange={this.onChangeHandler}
              onBlur={this.onBlurHandler}
            />
          </label>
          {(imdbUrlIsRequiredError
            && (
              <p className="newMovie__exception_description">
                ImdbUrl is required
              </p>
            ))
            || (imdbUrlError
            && (
              <p className="newMovie__exception_description">
                ImdbUrl is incorrect
              </p>
            ))}
        </div>

        <div>
          <label className="newMovie__form-label">
            * IMDB Id:
            <input
              className={
                classNames(
                  'newMovie__form_input',
                  {
                    newMovie__form_input_error: imdbIdRequiredError,
                  },
                )
              }
              name="imdbId"
              type="text"
              value={imdbId}
              onChange={this.onChangeHandler}
              onBlur={this.onBlurHandler}
            />
          </label>
          {imdbIdRequiredError
          && (
            <p className="newMovie__exception_description">
              ImdbId is required
            </p>
          )}
        </div>

        <div>
          <button
            className={
              classNames(
                'newMovie__form_submit_btn',
                {
                  newMovie__form_submit_btn__disabled: !isCanSubmit,
                },
              )
            }
            type="submit"
          >
            Create movie Title
          </button>
        </div>
      </form>
    );
  }
}
