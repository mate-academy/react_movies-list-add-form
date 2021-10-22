import React, { Component } from 'react';

type Props = {
  onAddMovie: (movie: Movie) => void,
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

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onAddMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (value: string, key: string) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          required
          onChange={(event) => this.handleChange(event.target.value, 'title')}
        />
        <textarea
          placeholder="Description"
          name="description"
          value={description}
          required
          onChange={(event) => this.handleChange(event.target.value, 'description')}
        />
        <input
          type="text"
          placeholder="ImgUrl"
          name="imgurl"
          value={imgUrl}
          required
          onChange={(event) => this.handleChange(event.target.value, 'imgUrl')}
        />
        <input
          type="text"
          placeholder="ImbdUrl"
          name="imbdUrl"
          value={imdbUrl}
          required
          onChange={(event) => this.handleChange(event.target.value, 'imdbUrl')}
        />
        <input
          type="text"
          placeholder="ImdbId"
          name="imdbId"
          value={imdbId}
          required
          onChange={(event) => this.handleChange(event.target.value, 'imdbId')}
        />
        <button
          type="submit"
        >
          add
        </button>
      </form>
    );
  }
}
