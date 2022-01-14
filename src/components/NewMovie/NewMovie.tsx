import { Component } from 'react';
import cn from 'classnames';
import './NewMovie.scss';

type Props = {
  addFilm: (newMovie: Movie) => void,
};

type State = {
  newMovie: Movie,
  titleError: boolean,
  descriptionError: boolean,
  imgUrlError: boolean,
  imdbUrlError: boolean,
  imdbIdError: boolean,
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
    titleError: false,
    descriptionError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,

  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
      titleError: false,
      descriptionError: false,
      imdbIdError: false,
    }));
  };

  checkFormTitle = () => {
    this.setState((state) => ({
      titleError: !state.newMovie.title.trim(),
    }));
  };

  checkFormDescription = () => {
    if (!this.state.newMovie.description.trim()) {
      this.setState((state) => ({
        descriptionError: !state.newMovie.description.trim(),
      }));
    }
  };

  isValidUrl = (imgUrl: string) => {
    // eslint-disable-next-line
    const reg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return reg.test(imgUrl);
  };

  checkFormImgUrl = () => {
    const { imgUrl } = this.state.newMovie;

    this.setState(() => ({
      imgUrlError: !this.isValidUrl(imgUrl),
    }));
  };

  checkFormImdbUrl = () => {
    const { imdbUrl } = this.state.newMovie;

    this.setState(() => ({
      imdbUrlError: !this.isValidUrl(imdbUrl),
    }));
  };

  checkFormImdbId = () => {
    if (!this.state.newMovie.imdbId.trim()) {
      this.setState(() => ({
        imdbIdError: true,
      }));
    }
  };

  handleSubmitForm = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const { imdbUrlError, imgUrlError } = this.state;

    if (imdbUrlError || imgUrlError) {
      return;
    }

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

  isButtonDisabled = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    switch (true) {
      case !title.length:
      case !description.length:
      case !imgUrl.length:
      case !imdbUrl.length:
      case !imdbId.length:
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
      <form className="form" onSubmit={this.handleSubmitForm}>
        <h2 className="form__title">Add film</h2>
        <input
          className={cn('form__input',
            { 'form__input--error': this.state.titleError })}
          type="text"
          placeholder="Enter title"
          name="title"
          value={title}
          onChange={this.handleChange}
          onBlur={this.checkFormTitle}
        />
        {this.state.titleError && (
          <div className="errorContainer">
            <p className="error">
              Title must contains at least one letter
              <br />
              <span className="error--example">For example: Angels and Demons</span>
            </p>
          </div>
        )}

        <input
          className={cn('form__input',
            { 'form__input--error': this.state.descriptionError })}
          type="text"
          placeholder="Enter description"
          name="description"
          value={description}
          onChange={this.handleChange}
          onBlur={this.checkFormDescription}
        />
        {this.state.descriptionError && (
          <div className="errorContainer">
            <p className="error">
              Description must contains at least one word
              <br />
              <span className="error--example">For example: Harvard symbologist Robert Langdon</span>
            </p>
          </div>
        )}

        <input
          className={cn('form__input',
            { 'form__input--error': this.state.imgUrlError })}
          type="text"
          placeholder="Enter imgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          onBlur={this.checkFormImgUrl}
        />
        {this.state.imgUrlError && (
          <div className="errorContainer">
            <p className="error">
              Image Url must be filled with URL
              <br />
              <span className="error--example">
                For example: http://surl.li/bcsiz
              </span>
            </p>
          </div>
        )}

        <input
          className={cn('form__input',
            { 'form__input--error': this.state.imdbUrlError })}
          type="text"
          placeholder="Enter imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          onBlur={this.checkFormImdbUrl}
        />
        {this.state.imdbUrlError && (
          <div className="errorContainer">
            <p className="error">
              Imdb Url must be filled with URL
              <br />
              <span className="error--example">For example: https://www.imdb.com/title/tt0808151</span>
            </p>
          </div>
        )}

        <input
          className={cn('form__input',
            { 'form__input--error': this.state.imdbIdError })}
          type="text"
          placeholder="Enter imdbId"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          onBlur={this.checkFormImdbId}
        />
        {this.state.imdbIdError && (
          <div className="errorContainer">
            <p className="error">
              ImdbId must be filled with URL
              <br />
              <span className="error--example">For example: tt0808151</span>
            </p>
          </div>
        )}

        <button
          type="submit"
          className="form__input form__btn"
          disabled={this.isButtonDisabled()}
        >
          Add new film
        </button>
        <span>* all fields are required</span>
      </form>
    );
  }
}
