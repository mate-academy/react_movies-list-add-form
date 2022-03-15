import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  isValidImgUrl: boolean;
  isValidImdbUrl: boolean;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isValidImgUrl: true,
    isValidImdbUrl: true,
  };

  validUrl = (str: string) => {
    const regex = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    return regex.test(str);
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

    if (!title
      || !description
      || !this.validUrl(imgUrl)
      || !this.validUrl(imdbUrl)
      || !imdbId) {
      return;
    }

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(movie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  blurHandlerImgUrl = () => {
    if (this.validUrl(this.state.imgUrl)) {
      this.setState({ isValidImgUrl: true });
    } else {
      this.setState({ isValidImgUrl: false });
    }
  };

  blurHandlerImdbUrl = () => {
    if (this.validUrl(this.state.imdbUrl)) {
      this.setState({ isValidImdbUrl: true });
    } else {
      this.setState({ isValidImdbUrl: false });
    }
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label className="form__input" htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            placeholder="Title"
            required
            value={this.state.title}
            onChange={(event) => this.setState({
              title: event.target.value,
            })}
          />
        </label>
        <label className="form__input" htmlFor="imgUrl">
          Img URL:
          <input
            id="imgUrl"
            type="text"
            placeholder="imgUrl"
            required
            value={this.state.imgUrl}
            onChange={(event) => this.setState({
              imgUrl: event.target.value,
            })}
            onBlur={this.blurHandlerImgUrl}
          />
          {!this.state.isValidImgUrl && <span className="error">Enter valid URL!</span>}
        </label>
        <label className="form__input" htmlFor="imdbUrl">
          Imdb URL:
          <input
            id="imdbUrl"
            type="text"
            placeholder="imdbUrl"
            required
            value={this.state.imdbUrl}
            onChange={(event) => this.setState({
              imdbUrl: event.target.value,
            })}
            onBlur={this.blurHandlerImdbUrl}
          />
          {!this.state.isValidImdbUrl && <span className="error">Enter valid URL!</span>}
        </label>
        <label className="form__input" htmlFor="imdbId">
          Imdb ID:
          <input
            id="imdbId"
            type="text"
            placeholder="imdbId"
            required
            value={this.state.imdbId}
            onChange={(event) => this.setState({
              imdbId: event.target.value,
            })}
          />
        </label>
        <label className="form__input" htmlFor="Description">
          Description:
          <input
            id="Description"
            placeholder="Description"
            required
            value={this.state.description}
            onChange={(event) => this.setState({
              description: event.target.value,
            })}
          />
        </label>
        <button
          type="submit"
          disabled={!this.state.title
            || !this.state.description
            || !this.state.imdbId
            || !this.state.imdbUrl
            || !this.state.imgUrl}
        >
          Add
        </button>
      </form>
    );
  }
}
