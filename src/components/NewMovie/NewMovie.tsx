import { Component } from 'react';

type Props = {
  onAdd: (newMovie: Movie) => void
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

  handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as { [K in keyof State]: State[K] });
  };

  formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    event.preventDefault();
    this.props.onAdd(newMovie);
    this.clearForm();
  };

  clearForm = () => (
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    })
  );

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <input
          placeholder="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleFieldChange}
          type="text"
          className="input m-1"
        />

        <textarea
          placeholder="Description"
          name="description"
          value={this.state.description}
          onChange={this.handleFieldChange}
          className="textarea m-1"
        />

        <input
          placeholder="Image URL"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleFieldChange}
          type="text"
          className="input m-1"
        />

        <input
          placeholder="IMDB URL"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleFieldChange}
          type="text"
          className="input m-1"
        />

        <input
          placeholder="IMDB ID"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.handleFieldChange}
          type="text"
          className="input m-1"
        />

        <button
          type="submit"
          className="button is-primary m-1"
        >
          Add movie
        </button>
      </form>
    );
  }
}
