import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void;
};
type State = Movie;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imdbId: '',
    imdbUrl: '',
    imgUrl: '',
  };

  handlerSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMovie: Movie = {
      title: this.state.title,
      description: this.state.description,
      imdbId: this.state.imdbId,
      imdbUrl: this.state.imdbUrl,
      imgUrl: this.state.imgUrl,
    };

    this.props.onAdd(newMovie);
    this.setState({
      title: '',
      description: '',
      imdbId: '',
      imdbUrl: '',
      imgUrl: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handlerSubmit}>
        <input
          className="Input"
          type="text"
          placeholder="Enter title"
          value={this.state.title}
          onChange={e => {
            this.setState({
              title: e.target.value,
            });
          }}
        />
        <input
          type="text"
          className="Input"
          placeholder="Enter description"
          value={this.state.description}
          onChange={e => {
            this.setState({
              description: e.target.value,
            });
          }}
        />
        <input
          type="text"
          className="Input"
          placeholder="Enter imdbId"
          value={this.state.imdbId}
          onChange={e => {
            this.setState({
              imdbId: e.target.value,
            });
          }}
        />
        <input
          type="text"
          className="Input"
          placeholder="Enter imdbUrl"
          value={this.state.imdbUrl}
          onChange={e => {
            this.setState({
              imdbUrl: e.target.value,
            });
          }}
        />
        <input
          type="text"
          className="Input"
          placeholder="Enter imgUrl"
          value={this.state.imgUrl}
          onChange={e => {
            this.setState({
              imgUrl: e.target.value,
            });
          }}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}
