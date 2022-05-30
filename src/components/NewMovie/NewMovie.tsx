import React, { Component } from 'react';
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
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.trim() !== '') {
      this.setState(state => ({ ...state, [name]: value }));
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="ImgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="ImdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="imdbId"
          placeholder="ImdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
          required
        />
        <button type="submit">Add new movie</button>
      </form>
    );
  }
}
