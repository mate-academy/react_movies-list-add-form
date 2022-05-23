import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,

  isError: boolean,
  errorText: string,
};
export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',

    isError: false,
    errorText: '',
  };

  onSubmited = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.state.title.trim()
      || !this.state.imdbUrl.trim()
      || !this.state.imdbId.trim()) {
      this.setState((state) => ({
        ...state,
        isError: true,
        errorText: 'fill again',
      }));

      return;
    }

    this.props.onAdd(this.state);

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
      <form onSubmit={this.onSubmited} className="form">
        <p className="form__new">add new movie</p>
        {this.state.isError && (
          <p>{this.state.errorText}</p>
        )}
        <label htmlFor="text__field">
          <input
            className="form__title"
            id="text__field"
            type="text"
            placeholder="Title..."
            value={this.state.title}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
              });
            }}
            required
          />
        </label>
        <textarea
          className="form__text"
          name="Description..."
          cols={23}
          rows={2}
          placeholder="Description"
          value={this.state.description}
          onChange={(event) => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <label htmlFor="imgUrl__field">
          <input
            className="form__imgUrl"
            id="imgUrl__field"
            type="text"
            placeholder="imgUrl..."
            value={this.state.imgUrl}
            onChange={(event) => {
              this.setState({
                imgUrl: event.target.value,
              });
            }}
          />
        </label>
        <label htmlFor="imdbUrl__field">
          <input
            className="form__imdbUrl"
            id="imdbUrl__field"
            type="text"
            placeholder="imdbUrl..."
            value={this.state.imdbUrl}
            onChange={(event) => {
              this.setState({
                imdbUrl: event.target.value,
              });
            }}
            required
          />
        </label>
        <label htmlFor="imdbId__field">
          <input
            className="form__imdbId"
            id="imdbId__field"
            type="text"
            placeholder="imdbId... "
            value={this.state.imdbId}
            onChange={(event) => {
              this.setState({
                imdbId: event.target.value,
              });
            }}
            required
          />
        </label>
        <button
          type="submit"
          className="form__btn"
        >
          submit
        </button>
      </form>
    );
  }
}
