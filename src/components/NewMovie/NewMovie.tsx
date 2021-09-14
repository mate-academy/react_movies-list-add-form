import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  id = ['title', 'description', 'imgUrl', 'imdbUrl', 'imdbId'];

  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
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

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.clearState();
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <fieldset>
          <legend>Add film</legend>
          <div className="mb-3">
            <label
              className="form-label"
              htmlFor={this.id[0]}
            >
              Title
              <input
                type="text"
                id={this.id[0]}
                className="form-control"
                placeholder="Title"
                value={this.state.title}
                onChange={(event) => {
                  this.setState({
                    title: event.target.value,
                  });
                }}
              />
            </label>
            <label
              className="form-label"
              htmlFor={this.id[1]}
            >
              DescriptionId
              <input
                type="text"
                id={this.id[1]}
                className="form-control"
                placeholder="DescriptionId"
                value={this.state.description}
                onChange={(event) => {
                  this.setState({
                    description: event.target.value,
                  });
                }}
              />
            </label>
            <label
              className="form-label"
              htmlFor={this.id[2]}
            >
              ImgUrl
              <input
                type="text"
                id={this.id[2]}
                className="form-control"
                placeholder="ImgUrl"
                value={this.state.imgUrl}
                onChange={(event) => {
                  this.setState({
                    imgUrl: event.target.value,
                  });
                }}
              />
            </label>
            <label
              className="form-label"
              htmlFor={this.id[3]}
            >
              ImdbUrl
              <input
                type="text"
                id={this.id[3]}
                className="form-control"
                placeholder="ImdbUrl"
                value={this.state.imdbUrl}
                onChange={(event) => {
                  this.setState({
                    imdbUrl: event.target.value,
                  });
                }}
              />
            </label>
            <label
              className="form-label"
              htmlFor={this.id[4]}
            >
              ImdbId
              <input
                type="text"
                id={this.id[4]}
                className="form-control"
                placeholder="ImdbId"
                value={this.state.imdbId}
                onChange={(event) => {
                  this.setState({
                    imdbId: event.target.value,
                  });
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </fieldset>
      </form>
    );
  }
}
