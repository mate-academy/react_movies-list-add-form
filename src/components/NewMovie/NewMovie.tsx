import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  errorTitle: boolean,
  errorDescription: boolean,
  errorImdbId: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errorTitle: false,
    errorDescription: false,
    errorImdbId: false,
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.title.trim() === '') {
      this.setState({
        title: '',
        errorTitle: true,
      });
    }

    if (this.state.description.trim() === '') {
      this.setState({
        description: '',
        errorDescription: true,
      });
    }

    if (this.state.imdbId.trim() === '') {
      this.setState({
        imdbId: '',
        errorImdbId: true,
      });
    }

    if (this.state.title.trim() !== ''
      && this.state.description.trim() !== ''
      && this.state.imdbId.trim() !== '') {
      this.props.onAdd(this.state);

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        errorTitle: false,
        errorDescription: false,
        errorImdbId: false,
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
      errorTitle,
      errorDescription,
      errorImdbId,
    } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div>
          <input
            className="form__input"
            placeholder="title"
            type="text"
            value={title}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
                errorTitle: false,
              });
            }}
          />
          {errorTitle && (
            <span className="error">enter a valid title</span>
          )}
        </div>
        <div>
          <input
            className="form__input"
            placeholder="description"
            type="text"
            value={description}
            onChange={(event) => {
              this.setState({
                description: event.target.value,
                errorDescription: false,
              });
            }}
          />
          {errorDescription && (
            <span className="error">enter a valid description</span>
          )}
        </div>
        <div>
          <input
            className="form__input"
            placeholder="imgUrl"
            type="url"
            value={imgUrl}
            onChange={(event) => {
              this.setState({
                imgUrl: event.target.value,
              });
            }}
          />
        </div>
        <div>
          <input
            className="form__input"
            placeholder="imdbUrl"
            type="url"
            value={imdbUrl}
            onChange={(event) => {
              this.setState({
                imdbUrl: event.target.value,
              });
            }}
          />
        </div>
        <div>
          <input
            className="form__input"
            placeholder="imdbId"
            type="text"
            value={imdbId}
            onChange={(event) => {
              this.setState({
                imdbId: event.target.value,
                errorImdbId: false,
              });
            }}
          />
          {errorImdbId && (
            <span className="error">enter a valid imdbId</span>
          )}
        </div>
        <button className="button__add" type="submit">Add</button>
      </form>
    );
  }
}
