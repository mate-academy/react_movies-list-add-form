/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
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

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    // this.setState({[name]: value}) - doesn't work

    if (name === 'title') {
      this.setState({
        title: value,
      });
    } else if (name === 'description') {
      this.setState({
        description: value,
      });
    } else if (name === 'imgUrl') {
      this.setState({
        imgUrl: value,
      });
    } else if (name === 'imdbUrl') {
      this.setState({
        imdbUrl: value,
      });
    } else if (name === 'imdbId') {
      this.setState({
        imdbId: value,
      });
    }
  };

  createMovie = () => {
    return ({
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    });
  };

  onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      this.state.title
      && this.state.description
      && this.state.imgUrl
      && this.state.imdbUrl
      && this.state.imdbId) {
      const newMovie = this.createMovie();

      this.props.onAdd(newMovie);
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
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
      <form className="row" onSubmit={this.onSubmitHandler}>
        <h3 className="text-center mb-3">Add a movie Form</h3>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingTitle"
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <label htmlFor="floatingTitle">Title</label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="floatingDescription"
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <label htmlFor="floatingDescription">Description</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="ImgUrl"
            id="floatingImgUrl"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="floatingImgUrl">ImgUrl</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingImdbUrl"
            placeholder="ImdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="floatingImdbUrl">ImdbUrl</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingImdbId"
            placeholder="ImdbId"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
          <label htmlFor="floatingImdbId" className="pe-2">ImdbId</label>
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-primary mt-3 w-50 align-self-center">Add!</button>
        </div>
      </form>
    );
  }
}
