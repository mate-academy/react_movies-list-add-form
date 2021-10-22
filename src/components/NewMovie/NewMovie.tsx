import { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value,
    } as State));
  };

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.addMovie({ ...this.state });
    this.clearForm();
  };

  render() {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={this.handleChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          placeholder="ImdbId"
          required
        />
        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          placeholder="ImgUrl"
          required
        />
        <input
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          placeholder="ImdbUrl"
          required
        />
        <button
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
