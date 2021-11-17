import './NewMovie.scss';

import { Component } from 'react';
import classnames from 'classnames';

interface Props {
  onAdd: (movie: Movie) => void
}

interface State {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  isTitleEntered: boolean,
  isImgUrlValid: boolean,
  isImdbUrlValid: boolean,
  isImdbIdEntered: boolean,
}

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleEntered: true,
    isImgUrlValid: true,
    isImdbUrlValid: true,
    isImdbIdEntered: true,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'imgUrl':
        this.setState({ isImgUrlValid: this.isUrlValid(value) });
        break;

      case 'imdbUrl':
        this.setState({ isImdbUrlValid: this.isUrlValid(value) });
        break;
      case 'title':
        this.setState({ isTitleEntered: value !== '' });
        break;

      case 'imdbId':
        this.setState({ isImdbIdEntered: value !== '' });
        break;

      default:
        throw new Error('Unknown HTML element name');
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  isFormValid = () => {
    return Object.entries(this.state).every(prop => {
      const [key, value] = prop;

      if (key !== 'description') {
        return value;
      }

      return true;
    });
  };

  isUrlValid = (URL: string) => {
    const regex = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    return regex.test(URL);
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleEntered,
      isImgUrlValid,
      isImdbUrlValid,
      isImdbIdEntered,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <div className="mb-4">
          <label className="form__label" htmlFor="title">
            Title:
            <br />

            <input
              className={classnames(
                'mt-2 form-control',
                { 'form__field--invalid': !isTitleEntered },
              )}
              type="text"
              placeholder="Enter movie title"
              name="title"
              value={title}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              required
            />
          </label>
          {!isTitleEntered && (
            <div className="error-msg">
              *Please enter a movie title
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form__label" htmlFor="description">
            Description
            <br />

            <textarea
              className="form-control"
              name="description"
              placeholder="Enter movie description"
              rows={5}
              value={description}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="form__label" htmlFor="imgUrl">
            Image url:
            <br />

            <input
              className={classnames(
                'mt-2 form-control',
                { 'form__field--invalid': !isImgUrlValid },
              )}
              type="text"
              placeholder="Enter movie cover-img url"
              name="imgUrl"
              value={imgUrl}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              required
            />
          </label>
          {!isImgUrlValid && (
            <div className="error-msg">
              *URL is not valid
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form__label" htmlFor="imdbUrl">
            Imdb url:
            <br />

            <input
              className={classnames(
                'mt-2 form-control',
                { 'form__field--invalid': !isImdbUrlValid },
              )}
              type="text"
              placeholder="Enter imdb url"
              name="imdbUrl"
              value={imdbUrl}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              required
            />
          </label>
          {!isImdbUrlValid && (
            <div className="error-msg">
              *URL is not valid
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form__label" htmlFor="imdbId">
            Imdb id:
            <br />

            <input
              className={classnames(
                'mt-2 form-control',
                { 'form__field--invalid': !isImdbIdEntered },
              )}
              type="text"
              placeholder="Enter imdb id"
              name="imdbId"
              value={imdbId}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              required
            />
          </label>
          {!isImdbIdEntered && (
            <div className="error-msg">
              *Please enter a imdb id
            </div>
          )}
        </div>

        <button
          className="btn btn-outline-success btn-lg"
          type="submit"
          disabled={!this.isFormValid()}
        >
          Submit
        </button>
      </form>
    );
  }
}
