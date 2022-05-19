import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  toAdd: (movie: Movie) => void,
};
type State = {
  title: string,
  description: string,

  imgUrl: string,
  imdbUrl: string,
  imdbId: string,

  isError: boolean,
  errorMessage: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',

    imgUrl: '',
    imdbUrl: '',
    imdbId: '',

    isError: false,
    errorMessage: '',
  };

  onSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.state.title.trim()
      || !this.state.imdbUrl.trim()
      || !this.state.imdbId.trim()) {
      this.setState((state) => ({
        ...state,
        isError: true,
        errorMessage: 'Please, fill required fields correct',
      }));

      return;
    }

    this.props.toAdd(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmitted} className="form">
        <h2 className="form__title">Add new movie</h2>
        {this.state.isError && (
          <p>{this.state.errorMessage}</p>
        )}
        <label className="form__field">
          <span className="form__required">*</span>
          <input
            type="text"
            className="form__input"
            placeholder="Enter a movie title"
            value={this.state.title}
            onChange={event => {
              this.setState({
                title: event.target.value,
              });
            }}
            required
          />
        </label>
        <label className="form__field">
          <span className="form__required form__required--not">*</span>
          <textarea
            className="form__input form__textfield"
            placeholder="Enter a movie description"
            value={this.state.description}
            onChange={event => {
              this.setState({
                description: event.target.value,
              });
            }}
          />
        </label>
        <label className="form__field">
          <span className="form__required">*</span>
          <input
            type="text"
            className="form__input"
            placeholder="Enter a movie ImgUrl"
            value={this.state.imgUrl}
            onChange={event => {
              this.setState({
                imgUrl: event.target.value,
              });
            }}
            required
          />
        </label>
        <label className="form__field">
          <span className="form__required">*</span>
          <input
            type="text"
            className="form__input"
            placeholder="Enter a movie ImdbUrl"
            value={this.state.imdbUrl}
            onChange={event => {
              this.setState({
                imdbUrl: event.target.value,
              });
            }}
            required
          />
        </label>
        <label className="form__field">
          <span className="form__required">*</span>
          <input
            type="text"
            className="form__input"
            placeholder="Enter a movie ImdbId"
            value={this.state.imdbId}
            onChange={event => {
              this.setState({
                imdbId: event.target.value,
              });
            }}
            required
          />
        </label>

        <button
          className="form__button"
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}
