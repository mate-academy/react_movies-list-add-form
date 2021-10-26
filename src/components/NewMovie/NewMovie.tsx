import React, { Component } from 'react';

type Props = {
  addMovie: (movies: Movie) => void
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

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    this.props.addMovie(newMovie);
  };

  render() {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    return (
      <div>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(event => {
              this.setState({ title: event.target.value });
            })}
          />
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(event => {
              this.setState({ description: event.target.value });
            })}
          />
          <input
            type="text"
            placeholder="imgUrl"
            value={imgUrl}
            onChange={(event => {
              this.setState({ imgUrl: event.target.value });
            })}
          />
          <input
            type="text"
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={(event => {
              this.setState({ imdbUrl: event.target.value });
            })}
          />
          <input
            type="text"
            placeholder="imdbId"
            value={imdbId}
            onChange={(event => {
              this.setState({ imdbId: event.target.value });
            })}
          />
          <button type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}
