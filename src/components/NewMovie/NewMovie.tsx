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

    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title) {
      this.state.titleError = true;
    }

    if (!imgUrl) {
      this.state.imgUrlError = true;
    }

    if (!imdbUrl) {
      this.state.imdbUrlError = true;
    }

    if (!imdbId) {
      this.state.imdbIdError = true;
    }

    if (title
      && imgUrl
      && imdbUrl
      && imdbId) {
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));

    switch (name) {
      case 'title':
        this.setState({
          titleError: false,
        });
        break;

      case 'imgUrl':
        this.setState({
          imgUrlError: false,
        });
        break;

      case 'imdbUrl':
        this.setState({
          imdbUrlError: false,
        });
        break;

      case 'imdbId':
        this.setState({
          imdbIdError: false,
        });
        break;

      default:
        break;
    }
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
          onChange={this.handleChange}
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
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imgUrl"
          value={this.state.imgUrl}
          className="form-imgUrl form-input"
          placeholder="ImgUrl"
          onChange={this.handleChange}
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
          onChange={this.handleChange}
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
          onChange={this.handleChange}
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
