import React from 'react';

interface State {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
}

interface Props {
  addMovie : (newMovie: Movie) => void
}

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  sendMovie = () => {
    const {
      title, imdbId, imdbUrl, imgUrl,
    } = this.state;

    if (title !== '' && imdbId !== '' && imdbUrl !== '' && imgUrl !== '') {
      this.props.addMovie(this.state);
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
      title, description, imdbId, imdbUrl, imgUrl,
    } = this.state;

    return (
      <form>
        <label htmlFor="title" className="input">
          Title
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            required
            onChange={(event) => {
              this.setState({ title: event.target.value });
            }}
          />
        </label>

        <label htmlFor="description" className="input">
          Description
          <input
            type="text"
            name="description"
            value={description}
            id="description"
            onChange={(event) => {
              this.setState({ description: event.target.value });
            }}
          />
        </label>

        <label htmlFor="imgUrl" className="input">
          Img Url
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={imgUrl}
            required
            onChange={(event) => {
              this.setState({ imgUrl: event.target.value });
            }}
          />
        </label>

        <label htmlFor="imdbUrl" className="input">
          IMBD Url
          <input
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            value={imdbUrl}
            required
            onChange={(event) => {
              this.setState({ imdbUrl: event.target.value });
            }}
          />
        </label>

        <label htmlFor="imdbId" className="input">
          IMBD Id
          <input
            type="text"
            name="imdbId"
            id="imdbId"
            value={imdbId}
            required
            onChange={(event) => {
              this.setState({ imdbId: event.target.value });
            }}
          />
        </label>

        <button
          type="submit"
          onClick={() => {
            this.sendMovie();
          }}
        >
          Add movie
        </button>
      </form>

    );
  }
}
