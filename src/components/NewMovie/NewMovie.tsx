import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imbdId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imbdId: '',
  };

  changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  changeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      description: event.target.value,
    });
  };

  changeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imgUrl: event.target.value,
    });
  };

  changeImbdUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbUrl: event.target.value,
    });
  };

  changeImbdId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imbdId: event.target.value,
    });
  };

  getNewMovie = () => {
    return ({
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imbdId,
    });
  };

  submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMovie = this.getNewMovie();

    this.props.addMovie(newMovie);
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl: imbdUrl,
      imbdId,
    } = this.state;

    return (
      <form className="form" onSubmit={this.submit}>
        <input
          className="form__input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={this.changeTitle}
        />
        <input
          className="form__input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={this.changeDescription}
        />
        <input
          className="form__input"
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={this.changeImg}
        />
        <input
          className="form__input"
          type="text"
          placeholder="IMDB URL"
          value={imbdUrl}
          onChange={this.changeImbdUrl}
        />
        <input
          className="form__input"
          type="text"
          placeholder="IMDB id"
          value={imbdId}
          onChange={this.changeImbdId}
        />
        <button className="form__button" type="submit">Add</button>
      </form>
    );
  }
}
