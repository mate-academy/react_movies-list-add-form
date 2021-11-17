import { Component } from 'react';
import './NewMovie.scss';

interface Props {
  onAdd: (newMovie: Movie) => void,
}

type State = Movie;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  submitHandler = (event:React.FormEvent<HTMLFormElement>) => {
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
      <form
        className="newMovie"
        action=""
        method="post"
        onSubmit={this.submitHandler}
      >
        <label htmlFor="titleMovie">
          <input
            className="newMovie__input"
            type="text"
            name="title"
            id="titleMovie"
            value={title}
            onChange={this.changeHandler}
            placeholder="Title"
          />
        </label>

        <label htmlFor="descriptionMovie">
          <input
            className="newMovie__input"
            type="text"
            name="description"
            id="descriptionMovie"
            value={description}
            onChange={this.changeHandler}
            placeholder="Description"
          />
        </label>

        <label htmlFor="imgUrlMovie">
          <input
            className="newMovie__input"
            type="text"
            name="imgUrl"
            id="imgUrlMovie"
            value={imgUrl}
            onChange={this.changeHandler}
            placeholder="https:"
          />
        </label>

        <label htmlFor="imdbUrlMovie">
          <input
            className="newMovie__input"
            type="text"
            name="imdbUrl"
            id="imdbUrlMovie"
            value={imdbUrl}
            onChange={this.changeHandler}
            placeholder="https:"
          />
        </label>

        <label htmlFor="imdbIdMovie">
          <input
            className="newMovie__input"
            type="text"
            name="imdbId"
            id="imdbIdMovie"
            value={imdbId}
            onChange={this.changeHandler}
            placeholder="Id imdb"
          />
        </label>
        <button type="submit" className="newMovie__button">
          Add new movie
        </button>
      </form>
    );
  }
}
