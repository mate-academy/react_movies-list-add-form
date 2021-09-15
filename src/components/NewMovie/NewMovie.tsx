import React, { Component } from 'react';

type Props = {
  add: (movie: Movie) => void,
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

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    this.props.add({
      ...this.state,
    });

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
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="col">
            Title
          </label>

          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="col">
            Description
          </label>

          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={e => {
              this.setState({ description: e.target.value });
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imgUrl" className="col">
            ImgUrl
          </label>

          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={imgUrl}
            onChange={e => {
              this.setState({ imgUrl: e.target.value });
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imdbUrl" className="col">
            ImdbUrl
          </label>

          <input
            type="text"
            id="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            onChange={e => {
              this.setState({ imdbUrl: e.target.value });
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imdbId" className="col">
            ImdbId
          </label>

          <input
            type="text"
            id="imdbId"
            name="imdbId"
            value={imdbId}
            onChange={e => {
              this.setState({ imdbId: e.target.value });
            }}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
        >
          Add movie
        </button>
      </form>
    );
  }
}
