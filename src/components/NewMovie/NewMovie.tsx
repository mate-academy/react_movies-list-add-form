import { Component, FormEvent } from 'react';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  errorTitle: boolean,
  errorImgUrl: boolean,
  errorImdbUrl: boolean,
  errorImdbId: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errorTitle: false,
    errorImgUrl: false,
    errorImdbUrl: false,
    errorImdbId: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ errorTitle: false });
    this.setState({ errorImgUrl: false });
    this.setState({ errorImdbUrl: false });
    this.setState({ errorImdbUrl: false });
    this.setState({ errorImdbId: false });

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    switch ('') {
      case this.state.title:
        this.setState({ errorTitle: true });
        break;
      case this.state.imgUrl:
        this.setState({ errorImgUrl: true });
        break;
      case this.state.imdbUrl:
        this.setState({ errorImdbUrl: true });
        break;
      case this.state.imdbId:
        this.setState({ errorImdbId: true });
        break;
      default:
        this.props.onAdd(this.state);

        this.setState({
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
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
      errorTitle,
      errorImgUrl,
      errorImdbUrl,
      errorImdbId,
    } = this.state;

    return (
      <form
        className="NewMovie__form"
      >
        <div className="NewMovie__errorMessage">
          {errorTitle && (
            <div>Please enter a title</div>
          )}
          {errorImgUrl && (
            <div>Please enter a imgUrl</div>
          )}
          {errorImdbUrl && (
            <div>Please enter a imdbUrl</div>
          )}
          {errorImdbId && (
            <div>Please enter a imdbId</div>
          )}
        </div>

        <div className="NewMovie__inputs">
          <input
            type="text"
            placeholder="Enter a title"
            className={errorTitle
              ? 'NewMovie__input NewMovie__input--invalid'
              : 'NewMovie__input'}
            value={title}
            name="title"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Enter a description"
            value={description}
            name="description"
            onChange={this.handleChange}
            className="NewMovie__input"
          />
          <input
            type="text"
            placeholder="Enter image URL"
            value={imgUrl}
            name="imgUrl"
            onChange={this.handleChange}
            className={errorImgUrl
              ? 'NewMovie__input NewMovie__input--invalid'
              : 'NewMovie__input'}
          />
          <input
            type="text"
            placeholder="Enter IMDb URL"
            value={imdbUrl}
            name="imdbUrl"
            onChange={this.handleChange}
            className={errorImdbUrl
              ? 'NewMovie__input NewMovie__input--invalid'
              : 'NewMovie__input'}
          />
          <input
            type="text"
            placeholder="Enter IMDb id"
            value={imdbId}
            name="imdbId"
            onChange={this.handleChange}
            className={errorImdbId
              ? 'NewMovie__input NewMovie__input--invalid'
              : 'NewMovie__input'}
          />
        </div>

        <button
          type="submit"
          className="NewMovie__button"
          onClick={this.handleSubmit}
        >
          Add new movie
        </button>
      </form>
    );
  }
}
