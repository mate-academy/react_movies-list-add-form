import { Component } from 'react';
import { FormsField } from '../FormsField';

import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
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

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.addMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <FormsField
          name="title"
          value={this.state.title}
          placeholder="Enter title..."
          onChange={this.onChange}
        />

        <FormsField
          name="description"
          value={this.state.description}
          placeholder="Enter description..."
          onChange={this.onChange}
        />

        <FormsField
          name="imgUrl"
          value={this.state.imgUrl}
          placeholder="Enter link of image..."
          onChange={this.onChange}
        />

        <FormsField
          name="imdbUrl"
          value={this.state.imdbUrl}
          placeholder="Enter link of imdb..."
          onChange={this.onChange}
        />

        <FormsField
          name="imdbId"
          value={this.state.imdbId}
          placeholder="Enter imdb id..."
          onChange={this.onChange}
        />

        <button
          type="submit"
          className="form__button"
        >
          Add
        </button>
      </form>
    );
  }
}
