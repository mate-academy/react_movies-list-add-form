import React from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};
type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends React.PureComponent<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
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
      || !imgUrl
      || !imdbUrl
      || !imdbId
    ) {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);
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
      <form
        onSubmit={this.handleSubmit}
        className="NewMovie"
      >
        <h2 className="NewMovie-Title">
          Add movie to the collection
        </h2>
        <input
          type="text"
          placeholder="title"
          className="NewMovie-Input"
          value={title}
          onChange={event => {
            this.setState({
              title: event.target.value,
            });
          }}
        />
        <textarea
          placeholder="description"
          className="NewMovie-Textarea"
          value={description}
          onChange={event => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="imgUrl"
          className="NewMovie-Input"
          value={imgUrl}
          onChange={event => {
            this.setState({
              imgUrl: event.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="imdbUrl"
          className="NewMovie-Input"
          value={imdbUrl}
          onChange={event => {
            this.setState({
              imdbUrl: event.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="imdbId"
          className="NewMovie-Input"
          value={imdbId}
          onChange={event => {
            this.setState({
              imdbId: event.target.value,
            });
          }}
        />
        <button
          type="submit"
          className="NewMovie-Button"
        >
          Add movie
        </button>
      </form>
    );
  }
}
