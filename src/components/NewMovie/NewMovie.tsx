import React, { Component } from 'react';

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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.addMovie(this.state);
    this.clearState();
  };

  clearState = () => {
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
        onSubmit={this.handleSubmit}
      >
        <p>Title</p>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          className="form-control"
        />
        <p>Description</p>
        <input
          type="text"
          name="description"
          value={description}
          onChange={this.handleChange}
          className="form-control"
        />
        <p>ImgUrl</p>
        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          className="form-control"
        />
        <p>ImdbUrl</p>
        <input
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          className="form-control"
        />
        <p>ImdbId</p>
        <input
          type="text"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          className="form-control"
        />
        <br />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Movie
        </button>
      </form>
    );
  }
}
