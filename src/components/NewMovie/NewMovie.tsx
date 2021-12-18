import { Component } from 'react';
import './NewMovie.scss';

type OnAdd = (movie: Movie) => void;

type Props = {
  onAdd: OnAdd,
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

  titleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  descriptionChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      description: event.target.value,
    });
  };

  imgUrlChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imgUrl: event.target.value,
    });
  };

  imdbUrlChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbUrl: event.target.value,
    });
  };

  imdbIdChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbId: event.target.value,
    });
  };

  add = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      <form onSubmit={this.add}>
        <input
          className="input"
          type="text"
          name="title"
          value={title}
          placeholder="Enter title"
          onChange={this.titleChanged}
        />
        <textarea
          className="input"
          name="description"
          value={description}
          placeholder="Enter description"
          onChange={this.descriptionChanged}
        />
        <input
          type="text"
          className="input"
          name="imgUrl"
          placeholder="Enter URL for image"
          value={imgUrl}
          onChange={this.imgUrlChanged}
        />
        <input
          className="input"
          type="text"
          name="imdbUrl"
          placeholder="Enter URL for IMDB"
          value={imdbUrl}
          onChange={this.imdbUrlChanged}
        />
        <input
          className="input"
          name="imdbId"
          type="text"
          placeholder="Enter IMBD Id"
          value={imdbId}
          onChange={this.imdbIdChanged}
        />
        <button type="submit" className="button">
          Add
        </button>
      </form>
    );
  }
}
