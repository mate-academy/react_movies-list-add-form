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

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    } as Pick<State, keyof State>);
  };

  onMovieSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.values(this.state).some(value => value === '')) {
      return;
    }

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
      <div className="container">
        <h2 className="title">
          Add movie below
        </h2>
        <form
          onSubmit={this.onMovieSend}
          className="form"
        >
          {Object.keys(this.state).map((key) => (
            <label key={key} htmlFor={key}>
              <p>{`${key[0].toUpperCase()}${key.slice(1)}`}</p>
              <input
                name={key}
                type="text"
                id={key}
                value={this.state[key as keyof State]}
                onChange={this.onInputChange}
              />
            </label>
          ))}

          <button
            type="submit"
            className="btn"
          >
            Add movie
          </button>
        </form>
      </div>
    );
  }
}
