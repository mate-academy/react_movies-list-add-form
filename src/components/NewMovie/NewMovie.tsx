import { Component } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';

type Props = {
  onNewMovie: (movie: Movie) => void
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

  handleTitleChange = (value: string) => {
    this.setState({ title: value });
  };

  handleDescriptionChange = (value: string) => {
    this.setState({ description: value });
  };

  handleImgUrlChange = (value: string) => {
    this.setState({ imgUrl: value });
  };

  handleImdbUrlChange = (value: string) => {
    this.setState({ imdbUrl: value });
  };

  handleImdbIdChange = (value: string) => {
    this.setState({ imdbId: value });
  };

  handleClear = () => {
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

    const { onNewMovie } = this.props;

    return (
      <form>
        <h1><strong>Create a new Movie:</strong></h1>
        Title:
        <input
          placeholder="..."
          value={title}
          onChange={(event) => {
            this.handleTitleChange(event.target.value);
          }}
          type="text"
          name="Title"
        />
        <br />
        description:
        <input
          placeholder="..."
          value={description}
          onChange={(event) => {
            this.handleDescriptionChange(event.target.value);
          }}
          type="text"
          name="description"
        />
        <br />
        imgUrl:
        <input
          placeholder="..."
          value={imgUrl}
          onChange={(event) => {
            this.handleImgUrlChange(event.target.value);
          }}
          type="text"
          name="imgUrl"
        />
        <br />
        imdbUrl:
        <input
          placeholder="..."
          value={imdbUrl}
          onChange={(event) => {
            this.handleImdbUrlChange(event.target.value);
          }}
          type="text"
          name="imdbUrl"
        />
        <br />
        imdbId:
        <input
          placeholder="..."
          value={imdbId}
          onChange={(event) => {
            this.handleImdbIdChange(event.target.value);
          }}
          type="text"
          name="name"
        />
        <br />
        <label htmlFor="button">
          <input
            disabled={title.length === 0
            || description.length === 0
            || imgUrl.length === 0
            || imdbUrl.length === 0
            || imdbId.length === 0}
            id="button"
            type="submit"
            value="Add Movie"
            onClick={(event) => {
              event.preventDefault();
              onNewMovie(this.state);
              this.handleClear();
            }}
          />
          <input
            className={classNames({
              submit: !title.length
                || !description.length
                || !imgUrl.length
                || !imdbUrl.length
                || !imdbId.length,
            })}
            id="button"
            type="submit"
            value="Clear"
            onClick={(event) => {
              event.preventDefault();
              this.handleClear();
            }}
          />
        </label>
      </form>
    );
  }
}
