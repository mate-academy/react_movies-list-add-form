import { Component } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';

const re = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

type Props = {
  addMovie(movie: Movie): void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  isFormValid: boolean;
  isImgUrlValid: boolean;
  isImdbUrlValid: boolean;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isFormValid: true,
    isImgUrlValid: true,
    isImdbUrlValid: true,
  };

  isUrlValid = (urlType: 'imgUrl' | 'imdbUrl') => {
    const { imgUrl, imdbUrl } = this.state;
    const imgTest = re.test(imgUrl);
    const imdbTest = re.test(imdbUrl);

    switch (urlType) {
      case 'imgUrl':
        this.setState({
          isImgUrlValid: imgTest,
          isFormValid: imgTest,
        });
        break;
      case 'imdbUrl':
        this.setState({
          isImdbUrlValid: imdbTest,
          isFormValid: imdbTest,
        });
        break;
      default:
        break;
    }
  };

  submitForm = () => {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
      isImdbUrlValid,
      isImgUrlValid,
      isFormValid,
    } = this.state;

    this.setState({ isFormValid: isImgUrlValid && isImdbUrlValid });

    if (isFormValid) {
      this.props.addMovie({
        title,
        description,
        imdbId,
        imdbUrl,
        imgUrl,
      });

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        isFormValid: true,
        isImgUrlValid: true,
        isImdbUrlValid: true,
      });
    }
  };

  render() {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
      isFormValid,
      isImgUrlValid,
      isImdbUrlValid,
    } = this.state;

    return (
      <form
        className="newMovie-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.submitForm();
        }}
      >
        <input
          className="newMovie-form__element newMovie-form__input"
          required
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => this.setState({ title: e.target.value })}
        />
        <textarea
          className="newMovie-form__textarea newMovie-form__element"
          placeholder="Enter description"
          value={description}
          onChange={(e) => this.setState({ description: e.target.value })}
        />
        <div className="input-set">
          <input
            className={classNames({
              'newMovie-form__input': true,
              'newMovie-form__element': true,
              'newMovie-form__input--error': !isImgUrlValid,
            })}
            required
            type="text"
            placeholder="Enter URL of image"
            value={imgUrl}
            onChange={event => this.setState({ imgUrl: event.target.value })}
            onBlur={() => this.isUrlValid('imgUrl')}
          />
          {!isImgUrlValid && (<span className="error-message">Wrong format!</span>)}
        </div>
        <div className="input-set">
          <input
            className={classNames({
              'newMovie-form__input': true,
              'newMovie-form__element': true,
              'newMovie-form__input--error': !isImdbUrlValid,
            })}
            required
            type="text"
            placeholder="Enter URL of IMDB"
            value={imdbUrl}
            onChange={event => this.setState({ imdbUrl: event.target.value })}
            onBlur={() => this.isUrlValid('imdbUrl')}
          />
          {!isImdbUrlValid && (<span className="error-message">Wrong format!</span>)}
        </div>
        <input
          className="newMovie-form__input newMovie-form__element"
          required
          type="text"
          placeholder="Enter IMDB ID"
          value={imdbId}
          onChange={(e) => this.setState({ imdbId: e.target.value })}
        />
        <button
          className="submit-button"
          disabled={!isFormValid}
          type="submit"
        >
          Add new movie
        </button>
      </form>
    );
  }
}
