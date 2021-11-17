import { ChangeEvent, Component, FormEvent } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void
};

type State = {
  title: string
  description: string
  imgUrl: string
  imdbUrl: string
  imdbId: string
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
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

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
        className="NewMovie--form"
        onSubmit={this.handleSubmit}
      >
        <div className="NewMovie--input">
          Title*:
          <br />
          <input
            value={title}
            type="text"
            name="title"
            placeholder="title"
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="NewMovie--input">
          Description:
          <br />
          <textarea
            value={description}
            name="description"
            placeholder="description"
            onChange={this.handleChange}
          />
        </div>

        <div className="NewMovie--input">
          imgUrl*:
          <br />
          <input
            value={imgUrl}
            type="text"
            name="imgUrl"
            placeholder="imgUrl"
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="NewMovie--input">
          imdbUrl*:
          <br />
          <input
            value={imdbUrl}
            type="text"
            name="imdbUrl"
            placeholder="imdbUrl"
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="NewMovie--input">
          imdbId*:
          <br />
          <input
            value={imdbId}
            type="text"
            name="imdbId"
            placeholder="imdbId"
            onChange={this.handleChange}
            required
          />
        </div>

        <button type="submit">
          onAdd
        </button>
      </form>
    );
  }
}
