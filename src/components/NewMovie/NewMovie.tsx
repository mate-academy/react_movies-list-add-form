/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import classNames from 'classnames';
import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: CallableFunction,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  clicked: ClickedValues,
  [key: string]: unknown,
};

type ClickedValues = {
  title: boolean,
  imgUrl: boolean,
  imdbUrl: boolean,
  imdbId: boolean,
  [key: string]: boolean;
};

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  clicked: {
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  },
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    clicked: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  handleSubmit = () => {
    this.props.onAdd(this.state);

    this.setState({
      ...initialState,
    });
  };

  updateStateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    return this.setState({
      [name]: value,
    });
  };

  isClicked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    this.setState((state) => ({
      clicked: {
        ...state.clicked,
        [name]: true,
      },
    }));
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      clicked,
    } = this.state;

    const isValid = (value: string, isURL: boolean) => {
      if (isURL) {
        return value.length > 0
          && value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);
      }

      return value.length > 0;
    };

    const validButton = (
      isValid(title, false)
      && isValid(imgUrl, true)
      && isValid(imdbUrl, true)
      && isValid(imdbId, false)
    );

    return (
      <>
        <div className="container">
          <div className="title">
            <h1>Add Movie</h1>
          </div>
          <form
            className="newMovie__form"
            onSubmit={(event) => {
              event.preventDefault();
              this.handleSubmit();
            }}
          >
            <label htmlFor="title">
              Title:
              {' '}
              <input
                className={classNames(
                  'input',
                  { error: clicked.title && !isValid(title, false) },
                )}
                type="text"
                id="title"
                value={title}
                name="title"
                required
                placeholder="Enter title"
                onChange={this.updateStateValue}
                onBlur={this.isClicked}
              />
              {(!isValid(title, false) && clicked.title) && <p>Please, enter title</p>}
            </label>

            <label htmlFor="description">
              Description:
              {' '}
              <input
                className="input"
                type="text"
                id="description"
                value={description}
                name="description"
                placeholder="Enter description"
                onChange={this.updateStateValue}
              />
            </label>

            <label htmlFor="imgUrl">
              Image URL:
              {' '}
              <input
                className={classNames(
                  'input',
                  { error: clicked.imgUrl && !isValid(imgUrl, true) },
                )}
                type="text"
                id="imgUrl"
                value={imgUrl}
                name="imgUrl"
                required
                placeholder="Enter Img URL"
                onChange={this.updateStateValue}
                onBlur={this.isClicked}
              />
              {(!isValid(imgUrl, false) && clicked.imgUrl)
                ? <p>Please, enter Img URL</p>
                : (!isValid(imgUrl, true) && clicked.imgUrl) && <p>URL is not correct</p>}
            </label>

            <label htmlFor="imdbUrl">
              IMDB URL:
              {' '}
              <input
                className={classNames(
                  'input',
                  { error: clicked.imdbUrl && !isValid(imdbUrl, true) },
                )}
                type="text"
                id="imdbUrl"
                value={imdbUrl}
                name="imdbUrl"
                required
                placeholder="Enter IMDB URL"
                onChange={this.updateStateValue}
                onBlur={this.isClicked}
              />
              {(!isValid(imdbUrl, false) && clicked.imdbUrl)
                ? <p>Please, enter IMDB URL</p>
                : (!isValid(imdbUrl, true) && clicked.imdbUrl) && <p>URL is not correct</p>}
            </label>

            <label htmlFor="imdbId">
              IMDB ID:
              {' '}
              <input
                className={classNames(
                  'input',
                  { error: clicked.imdbId && !isValid(imdbId, false) },
                )}
                type="text"
                id="imdbId"
                value={imdbId}
                name="imdbId"
                required
                placeholder="Enter IMDB ID"
                onChange={this.updateStateValue}
                onBlur={this.isClicked}
              />
              {(!isValid(imdbId, false) && clicked.imdbId) && <p>Please, enter IMDB ID</p>}
            </label>
            <div className="submit">
              <button
                className="submit_button"
                type="submit"
                disabled={!validButton}
              >
                Add movie
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
