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
  imgUrlCorrect: boolean,
  imdbUrlCorrect: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgUrlCorrect: true,
    imdbUrlCorrect: true,
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(movie);
  };

  handleCahnge = (value: string, name: string) => {
    this.setState((state) => ({
      ...state,
      [name]: value,
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
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="please write a title"
          value={title}
          onChange={(event: any) => {
            this.handleCahnge(event.currentTarget.value, event.currentTarget.name);
          }}
        />
        <input
          type="text"
          name="description"
          placeholder="please write a description"
          value={description}
          onChange={(event: any) => {
            this.handleCahnge(event.currentTarget.value, event.currentTarget.name);
          }}
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="please write a imgUrl"
          value={imgUrl}
          onChange={(event: any) => {
            this.handleCahnge(event.currentTarget.value, event.currentTarget.name);
          }}
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="please write a imdbUrl"
          value={imdbUrl}
          onChange={(event: any) => {
            this.handleCahnge(event.currentTarget.value, event.currentTarget.name);
          }}
        />
        <input
          type="text"
          name="imdbId"
          placeholder="please write a imdbId"
          value={imdbId}
          onChange={(event: any) => {
            this.handleCahnge(event.currentTarget.value, event.currentTarget.name);
          }}
        />
        <button type="submit">
          <strong>Add movie</strong>
        </button>
      </form>
    );
  }
}
