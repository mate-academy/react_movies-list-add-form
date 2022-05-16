import { Component } from 'react';
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
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!this.state.title
        || !this.state.description
        || !this.state.imgUrl
        || !this.state.imdbUrl
        || !this.state.imdbId) {
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
