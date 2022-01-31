import { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  clearForm = () => {
    this.setState(({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));
  };

  getNewMovie = () => {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    return {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = this.getNewMovie();

    this.props.onAdd(newMovie);
    this.clearForm();
  };

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    return (
      <form
        className="Form"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="title">{'Title '}</label>
        <input
          className="Form__input"
          id="title"
          type="text"
          name="title"
          required
          value={title}
          onChange={this.handleChange}
        />

        <label htmlFor="description">{'Description '}</label>
        <textarea
          className="Form__input"
          id="description"
          name="description"
          value={description}
          onChange={this.handleChange}
        />

        <label htmlFor="imgUrl">{'imgUrl '}</label>
        <input
          className="Form__input"
          id="imgUrl"
          type="text"
          name="imgUrl"
          required
          value={imgUrl}
          onChange={this.handleChange}
        />

        <label htmlFor="imdbUrl">{'imdbUrl '}</label>
        <input
          className="Form__input"
          id="imdbUrl"
          type="text"
          name="imdbUrl"
          required
          value={imdbUrl}
          onChange={this.handleChange}
        />

        <label htmlFor="imdbId">{'imdbId '}</label>
        <input
          className="Form__input"
          id="imdbId"
          type="text"
          name="imdbId"
          required
          value={imdbId}
          onChange={this.handleChange}
        />

        <button className="Form__button" type="submit">Add movie</button>
      </form>
    );
  }
}
