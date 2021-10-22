import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { onAdd } = this.props;

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
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
        onSubmit={this.handleFormSubmit}
        className="form-field"
      >
        <input
          value={title}
          type="text"
          className="field field-1"
          placeholder="enter title"
          required
          onChange={(event) => {
            this.setState({
              title: event.currentTarget.value,
            });
          }}
        />
        <textarea
          value={description}
          className="field field-2"
          placeholder="enter description"
          onChange={(event) => {
            this.setState({
              description: event.currentTarget.value,
            });
          }}
        />
        <input
          value={imgUrl}
          type="text"
          className="field field-3"
          placeholder="enter url image"
          required
          onChange={(event) => {
            this.setState({
              imgUrl: event.currentTarget.value,
            });
          }}
        />
        <input
          value={imdbUrl}
          type="text"
          className="field field-4"
          placeholder="enter url imbd"
          required
          onChange={(event) => {
            this.setState({
              imdbUrl: event.currentTarget.value,
            });
          }}
        />
        <input
          value={imdbId}
          type="text"
          className="field field-5"
          placeholder="enter id url"
          required
          onChange={(event) => {
            this.setState({
              imdbId: event.currentTarget.value,
            });
          }}
        />
        <button
          type="submit"
          className="field button-add"
        >
          Add
        </button>
      </form>
    );
  }
}
