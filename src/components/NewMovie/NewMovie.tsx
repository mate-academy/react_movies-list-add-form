import React, { Component } from 'react';
import './NewMovie.scss';

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

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  resetState = () => {
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
    const { onAdd } = this.props;

    return (
      <form
        className="Form"
        onSubmit={(event => {
          event.preventDefault();
          onAdd(this.state);
          this.resetState();
        }
        )}
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          rows={5}
          value={description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Image url"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="IMDB url"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="IMDB id"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />
        <button
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}
