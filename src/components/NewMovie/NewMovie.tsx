import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: any;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (title && description && imgUrl && imdbUrl && imdbId) {
      this.props.onAdd(
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      );

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
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="input"
          name="title"
          type="text"
          placeholder="Enter the title"
          value={title}
          onChange={this.handleInputChange}
        />
        <textarea
          className="textarea"
          name="description"
          placeholder="Enter the description"
          value={description}
          onChange={this.handleInputChange}
        />
        <input
          className="input"
          name="imgUrl"
          type="text"
          placeholder="Enter the imgUrl"
          value={imgUrl}
          onChange={this.handleInputChange}
        />
        <input
          className="input"
          name="imdbUrl"
          type="text"
          placeholder="Enter the imdbUrl"
          value={imdbUrl}
          onChange={this.handleInputChange}
        />
        <input
          className="input"
          name="imdbId"
          type="text"
          placeholder="Enter the imdbId"
          value={imdbId}
          onChange={this.handleInputChange}
        />
        <button type="submit">Add Movie</button>
      </form>
    );
  }
}
