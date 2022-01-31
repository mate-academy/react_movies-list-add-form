import React, { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void,
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

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      ...state,
      [event.target.id]: event.target.value,
    }));
  };

  handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.addMovie(this.state);
    this.clear();
  };

  clear = () => {
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
      imgUrl,
      imdbUrl,
      imdbId,
      description,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <div className="control">
            <label htmlFor="title" className="label">
              Title
              <input
                type="text"
                className="input"
                placeholder="title"
                id="title"
                value={title}
                onChange={this.handleInput}
              />
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label htmlFor="imgUrl" className="label">
              ImgUrl
              <input
                type="text"
                className="input"
                placeholder="imgUrl"
                id="imgUrl"
                value={imgUrl}
                onChange={this.handleInput}
              />
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label htmlFor="imdbUrl" className="label">
              ImdbUrl
              <input
                type="text"
                className="input"
                placeholder="imdbUrl"
                id="imdbUrl"
                value={imdbUrl}
                onChange={this.handleInput}
              />
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label htmlFor="imdbId" className="label">
              ImdbId
              <input
                type="text"
                className="input"
                placeholder="imdbId"
                id="imdbId"
                value={imdbId}
                onChange={this.handleInput}
              />
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label htmlFor="description" className="label">
              Description
              <textarea
                placeholder="description"
                value={description}
                id="description"
                onChange={this.handleDescription}
                className="textarea"
              />
            </label>
          </div>
        </div>
        <button className="button is-link" type="submit">Add</button>
      </form>
    );
  }
}
