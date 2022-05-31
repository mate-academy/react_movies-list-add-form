import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imgUrlError: boolean,
  imgUrlErrorMessage: string,
  imdbUrl: string,
  imdbUrlError: boolean,
  imdbUrlErrorMessage: string,
  imdbId: string,
  formError: boolean,
  formErrorMessage: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imgUrlError: false,
    imgUrlErrorMessage: '',
    imdbUrl: '',
    imdbUrlError: false,
    imdbUrlErrorMessage: '',
    imdbId: '',
    formError: false,
    formErrorMessage: '',
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!this.state.title.trim()
        || !this.state.description.trim()
        || !this.state.imgUrl.trim()
        || this.state.imgUrlError
        || !this.state.imdbUrl.trim()
        || this.state.imdbUrlError
        || !this.state.imdbId.trim()) {
      this.setState((state) => ({
        ...state,
        formError: true,
        formErrorMessage:
        'All this fields are required',
      }));

      return;
    }

    this.props.onAdd(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imgUrlError: false,
      imgUrlErrorMessage: '',
      imdbUrl: '',
      imdbUrlError: false,
      imdbUrlErrorMessage: '',
      imdbId: '',
      formError: false,
      formErrorMessage: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="Form"
      >
        <h1 className="Form__title">
          Add a new movie
        </h1>

        <label>
          <input
            type="text"
            name="title"
            className="Form__input"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
              });
            }}
          />
        </label>

        <textarea
          name="description"
          className="Form__textarea"
          placeholder="Enter a description"
          value={description}
          onChange={(event) => {
            this.setState({
              description: event.target.value,
            });
          }}
        />

        <label>
          <input
            type="text"
            name="imgUrl"
            className="Form__input"
            placeholder="Add an imgUrl"
            value={imgUrl}
            onChange={(event) => {
              this.setState({
                imgUrl: event.target.value,
              });
            }}
          />
        </label>

        {this.state.imgUrlError && (
          <p className="Form__urlError">
            {this.state.imgUrlErrorMessage}
          </p>
        )}

        <label>
          <input
            type="text"
            name="imdbUrl"
            className="Form__input"
            placeholder="Add an imdbUrl"
            value={imdbUrl}
            onChange={(event) => {
              this.setState({
                imdbUrl: event.target.value,
              });
            }}
          />
        </label>

        {this.state.imdbUrlError && (
          <p className="Form__urlError">
            {this.state.imdbUrlErrorMessage}
          </p>
        )}

        <label>
          <input
            type="text"
            name="imdbId"
            className="Form__input"
            placeholder="Add an imdbId"
            value={imdbId}
            onChange={(event) => {
              this.setState({
                imdbId: event.target.value,
              });
            }}
          />
        </label>

        {this.state.formError && (
          <p className="Form__error">
            {this.state.formErrorMessage}
          </p>
        )}

        <button
          type="submit"
          className="Form__button"
        >
          Add
        </button>
      </form>
    );
  }
}
