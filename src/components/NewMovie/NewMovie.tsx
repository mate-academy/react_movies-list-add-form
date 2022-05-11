import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  title: string,
  titleError: boolean,
  description: string,
  imgUrl: string,
  imgUrlError: boolean,
  imdbUrl: string,
  imdbUrlError: boolean,
  imdbId: string,
  imdbIdError: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    titleError: false,
    description: '',
    imgUrl: '',
    imgUrlError: false,
    imdbUrl: '',
    imdbUrlError: false,
    imdbId: '',
    imdbIdError: false,
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.state.title) {
      this.state.titleError = true;
    }

    if (!this.state.imgUrl) {
      this.state.imgUrlError = true;
    }

    if (!this.state.imdbUrl) {
      this.state.imdbUrlError = true;
    }

    if (!this.state.imdbId) {
      this.state.imdbIdError = true;
    }

    if (this.state.title) {
      const film = {
        title: this.state.title,
        description: this.state.description,
        imgUrl: this.state.imgUrl,
        imdbUrl: this.state.imdbUrl,
        imdbId: this.state.imdbId,
      };

      this.props.onAdd(film);
    }

    this.reset();
  };

  reset = () => {
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
      <form className="form" onSubmit={this.handleSubmit}>
        <h2 className="form-name">Add a movie</h2>
        <input
          type="text"
          name="title"
          value={this.state.title}
          className="form-title form-input"
          placeholder="Title"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
              title: event.target.value,
              titleError: false,
            });
          }}
        />

        {this.state.titleError && (
          <div className="error">
            Please enter a title
          </div>
        )}

        <input
          type="text"
          name="description"
          value={this.state.description}
          className="form-description form-input"
          placeholder="Description"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
              description: event.target.value,
            });
          }}
        />

        <input
          type="text"
          name="imgUrl"
          value={this.state.imgUrl}
          className="form-imgUrl form-input"
          placeholder="ImgUrl"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
              imgUrl: event.target.value,
              imgUrlError: false,
            });
          }}
        />

        {this.state.imgUrlError && (
          <div className="error">
            Please enter a value
          </div>
        )}

        <input
          type="text"
          name="imdbUrl"
          value={this.state.imdbUrl}
          className="form-imdbUrl form-input"
          placeholder="ImdbUrl"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
              imdbUrl: event.target.value,
              imdbUrlError: false,
            });
          }}
        />

        {this.state.imdbUrlError && (
          <div className="error">
            Please enter a value
          </div>
        )}

        <input
          type="text"
          name="imdbId"
          value={this.state.imdbId}
          className="form-imdbId form-input"
          placeholder="ImdbId"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
              imdbId: event.target.value,
              imdbIdError: false,
            });
          }}
        />

        {this.state.imdbIdError && (
          <div className="error">
            Please enter a value
          </div>
        )}

        <button type="submit" className="form-button">
          Add a movie
        </button>
      </form>
    );
  }
}
