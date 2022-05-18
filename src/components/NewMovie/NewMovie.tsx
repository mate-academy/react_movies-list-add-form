/* eslint-disable max-len */
import { ChangeEvent, Component, FormEvent } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: CallableFunction,
};

type ClickedValues = {
  title: boolean,
  imgUrl: boolean,
  imdbUrl: boolean,
  imdbId: boolean,
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

  isClicked = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    this.setState(state => ({
      clicked: {
        ...state.clicked,
        [name]: true,
      },
    }));
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  resetState = () => {
    this.setState({
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
    });
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    this.props.onAdd(this.state);
    this.resetState();
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

    const isValid = (value: string, isUrl: boolean) => {
      if (isUrl) {
        return value.length > 0
        && value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);
      }

      return value.length > 0;
    };

    const handleButton
    = isValid(title, false)
    && isValid(imgUrl, true)
    && isValid(imdbUrl, true)
    && isValid(imdbId, false);

    return (
      <div className="form__container">
        <div className="form__title">
          <h1>Add movie</h1>
        </div>

        <form
          className="form__body"
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              name="title"
              className={classNames(
                'input',
                { error: clicked.title && !isValid(title, false) },
              )}
              placeholder="Enter title"
              value={title}
              onChange={this.handleChange}
              onBlur={this.isClicked}
            />
            {
              !isValid(title, false)
            && clicked.title
            && <p className="form__error">Enter a valid title</p>
            }
          </label>

          <label htmlFor="description">
            Description:
            <input
              type="text"
              id="description"
              name="description"
              className="input"
              placeholder="Enter description"
              value={description}
              onChange={this.handleChange}
              onBlur={this.isClicked}
            />
          </label>

          <label htmlFor="imgUrl">
            Image URL:
            <input
              type="text"
              id="imgUrl"
              name="imgUrl"
              className={classNames(
                'input',
                { error: clicked.imgUrl && !isValid(imgUrl, true) },
              )}
              placeholder="Enter image URL"
              value={imgUrl}
              onChange={this.handleChange}
              onBlur={this.isClicked}
            />
            {
              !isValid(imgUrl, true)
            && clicked.imgUrl
            && <p className="form__error">Enter a valid image URL</p>
            }
          </label>

          <label htmlFor="imdbUrl">
            IMDB URL:
            <input
              type="text"
              id="imdbUrl"
              name="imdbUrl"
              className={classNames(
                'input',
                { error: clicked.imdbUrl && !isValid(imdbUrl, true) },
              )}
              placeholder="Enter IMDB URL"
              value={imdbUrl}
              onChange={this.handleChange}
              onBlur={this.isClicked}
            />
            {
              !isValid(imdbUrl, true)
            && clicked.imdbUrl
            && <p className="form__error">Enter a valid IMDB URL</p>
            }
          </label>

          <label htmlFor="imdbId">
            IMDB ID:
            <input
              type="text"
              id="imdbId"
              name="imdbId"
              className={classNames(
                'input',
                { error: clicked.imdbId && !isValid(imdbId, false) },
              )}
              placeholder="Enter IMDB ID"
              value={imdbId}
              onChange={this.handleChange}
              onBlur={this.isClicked}
            />
            {
              !isValid(imdbId, false)
            && clicked.imdbId
            && <p className="form__error">Enter a valid IMDB ID</p>
            }
          </label>

          <button
            type="submit"
            disabled={!handleButton}
          >
            Add movie
          </button>
        </form>
      </div>
    );
  }
}
