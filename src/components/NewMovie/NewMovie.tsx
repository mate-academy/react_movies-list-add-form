import { ChangeEvent, Component, FormEvent } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';

type Props = {
  onAdd: (e: Movie) => void;
};
type State = {
  newMovie: Movie,
  isImdbUrl: boolean;
  isTitle : boolean;
  isImdbId : boolean;
  isImgUrl : boolean;
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
    isImdbUrl: true,
    isImdbId: true,
    isImgUrl: true,
    isTitle: true,
  };

  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.onAdd(this.state.newMovie);
    this.clearForm();
  };

  clearForm = () => this.setState({
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  });

  validateControl = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const validation = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const transformedName = `is${name[0].toUpperCase()}${name.slice(1)}`;
    const isValid = (fieldName: string) => {
      if (
        (fieldName === 'imgUrl' || fieldName === 'imdbUrl')
        && !value.match(validation)
      ) {
        return false;
      }

      return value !== '';
    };

    this.setState(state => ({
      ...state,
      [transformedName]: isValid(name),
    }));
  };

  isValidForm = () => {
    const {
      isImdbId,
      isImdbUrl,
      isImgUrl,
      isTitle,
    } = this.state;

    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    return isImdbId && isImdbUrl && isImgUrl && isTitle
      && title && imgUrl && imdbUrl && imdbId;
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    const {
      isImdbId,
      isImdbUrl,
      isImgUrl,
      isTitle,
    } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label htmlFor="title">
          <span className="form-item__title">Title:</span>
          <input
            className={classNames({
              'form-item--error': !isTitle,
            })}
            value={title}
            name="title"
            type="text"
            onChange={this.handleChange}
            onBlur={this.validateControl}
            required
          />

          {!isTitle && (
            <p className="error__text">
              Title required
            </p>
          )}
        </label>

        <label htmlFor="description">
          <span className="form-item__title">Description:</span>
          <textarea
            value={description}
            name="description"
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imgUrl">
          <span className="form-item__title">imgUrl:</span>
          <input
            className={classNames({
              'form-item--error': !isImgUrl,
            })}
            value={imgUrl}
            name="imgUrl"
            type="text"
            onChange={this.handleChange}
            onBlur={this.validateControl}
            required
          />

          {!isImgUrl && (
            <p className="error__text">
              { imgUrl ? 'Incorrect imgUrl' : 'imgUrl is required' }
            </p>
          )}
        </label>

        <label htmlFor="imdbUrl">
          <span className="form-item__title">imdbUrl:</span>
          <input
            className={classNames({
              'form-item--error': !isImdbUrl,
            })}
            value={imdbUrl}
            onChange={this.handleChange}
            onBlur={this.validateControl}
            name="imdbUrl"
            type="text"
            required
          />

          {!isImdbUrl && (
            <p className="error__text">
              { imdbUrl ? 'Incorrect imdbUrl' : 'imdbUrl is required' }
            </p>
          )}
        </label>

        <label htmlFor="imdbId">
          <span className="form-item__title">imdbId:</span>
          <input
            className={classNames({
              'form-item--error': !isImdbId,
            })}
            value={imdbId}
            onBlur={this.validateControl}
            onChange={this.handleChange}
            name="imdbId"
            type="text"
            required
          />

          {!isImdbId && (
            <p className="error__text">
              imdbId is required
            </p>
          )}
        </label>

        <button
          type="submit"
          disabled={!this.isValidForm()}
        >
          Add movie
        </button>
      </form>
    );
  }
}
