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

  handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imgUrl: event.target.value,
    });
  };

  handleImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbUrl: event.target.value,
    });
  };

  handleImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbId: event.target.value,
    });
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
          required
          value={title}
          onChange={this.handleTitle}
        />

        <label htmlFor="description">{'Description '}</label>
        <textarea
          className="Form__input"
          id="description"
          value={description}
          onChange={this.handleDescription}
        />

        <label htmlFor="imgUrl">{'imgUrl '}</label>
        <input
          className="Form__input"
          id="imgUrl"
          type="text"
          required
          value={imgUrl}
          onChange={this.handleImgUrl}
        />

        <label htmlFor="imdbUrl">{'imdbUrl '}</label>
        <input
          className="Form__input"
          id="imdbUrl"
          type="text"
          required
          value={imdbUrl}
          onChange={this.handleImdbUrl}
        />

        <label htmlFor="imdbId">{'imdbId '}</label>
        <input
          className="Form__input"
          id="imdbId"
          type="text"
          required
          value={imdbId}
          onChange={this.handleImdbId}
        />

        <button className="Form__button" type="submit">Add movie</button>
      </form>
    );
  }
}
