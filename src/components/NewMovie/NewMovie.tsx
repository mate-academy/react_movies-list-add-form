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

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({ title: event.target.value })
  );

  handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => (
    this.setState({ description: event.target.value })
  );

  handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({ imgUrl: event.target.value })
  );

  handleImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({ imdbUrl: event.target.value })
  );

  handleImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({ imdbId: event.target.value })
  );

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
    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        this.props.onAdd(newMovie);
        this.clearForm();
      }}
      >
        <input
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleTitleChange}
          type="text"
          className="input m-1"
        />

        <textarea
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          className="textarea m-1"
        />

        <input
          placeholder="Image URL"
          value={this.state.imgUrl}
          onChange={this.handleImgUrlChange}
          type="text"
          className="input m-1"
        />

        <input
          placeholder="IMDB URL"
          value={this.state.imdbUrl}
          onChange={this.handleImdbUrlChange}
          type="text"
          className="input m-1"
        />

        <input
          placeholder="IMDB ID"
          value={this.state.imdbId}
          onChange={this.handleImdbIdChange}
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
