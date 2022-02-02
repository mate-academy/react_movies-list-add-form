import React, { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  title?: string,
  description?: string,
  imgUrl?: string,
  imdbUrl?: string,
  imdbId?: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.addMovie(this.state);
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
      <div>
        <form
          onSubmit={this.handleSubmit}
        >
          <h1>{title}</h1>
          <input
            name="title"
            type="text"
            placeholder="Please input title"
            value={title}
            onChange={(event) => this.handlerChange(event)}
          />
          <h1>{description}</h1>
          <input
            name="description"
            type="text"
            placeholder="Please input description"
            value={description}
            onChange={this.handlerChange}
          />
          <h1>{imgUrl}</h1>
          <input
            name="imgUrl"
            type="text"
            placeholder="input smth"
            value={imgUrl}
            onChange={this.handlerChange}
          />
          <h1>{imdbUrl}</h1>
          <input
            name="imdbUrl"
            type="text"
            placeholder="input smth"
            value={imdbUrl}
            onChange={this.handlerChange}
          />
          <h1>{imdbId}</h1>
          <input
            name="imdbId"
            type="text"
            placeholder="input smth"
            value={imdbId}
            onChange={this.handlerChange}
          />
          <button
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
