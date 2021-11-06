import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = Movie;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onAdd({ ...this.state });

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
      <>
        <h1>
          Add new movie
        </h1>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            className="form__input"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
            required
          />

          <textarea
            className="form__input form__input--description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            className="form__input"
            name="imgUrl"
            placeholder="ImgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            className="form__input"
            name="imdbUrl"
            placeholder="ImdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />

          <input
            className="form__input"
            type="text"
            name="imdbId"
            placeholder="ImdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
          <button
            type="submit"
            className="form__button"
          >
            Add new movie
          </button>
        </form>
      </>
    );
  }
}
