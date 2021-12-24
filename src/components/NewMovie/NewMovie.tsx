import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
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

  handleChange = (value: string, key: string) => {
    this.setState(state => ({
      ...state,
      [key]: value,
    }));
  };

  render() {
    const { addMovie } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form className="new-movie">
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={(event) => {
            this.handleChange(event.target.value, event.target.name);
          }}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(event) => {
            this.handleChange(event.target.value, 'description');
          }}
        />
        <input
          type="text"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={(event) => {
            this.handleChange(event.target.value, 'imgUrl');
          }}
        />
        <input
          type="text"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={(event) => {
            this.handleChange(event.target.value, 'imdbUrl');
          }}
        />
        <input
          type="text"
          placeholder="imdbId"
          value={imdbId}
          onChange={(event) => {
            this.handleChange(event.target.value, 'imdbId');
          }}
        />
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            addMovie({
              title,
              description,
              imgUrl,
              imdbUrl,
              imdbId,
            });
            this.setState({
              title: '',
              description: '',
              imgUrl: '',
              imdbUrl: '',
              imdbId: '',
            });
          }}
        >
          Add
        </button>
      </form>
    );
  }
}
