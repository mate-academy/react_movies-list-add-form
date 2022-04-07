import { ChangeEvent, FormEvent, PureComponent } from 'react';
import { Input } from '../Input';

type Props = {
  onAdd: (movie: Movie) => void;
};
type State = Movie;

export class NewMovie extends PureComponent<Props, State> {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
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

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    };

    this.reset();
    this.props.onAdd(newMovie);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          value={title}
          placeholder="Title"
          onChange={handleChange}
        />

        <Input
          name="description"
          value={description}
          placeholder="Description"
          onChange={handleChange}
        />

        <Input
          name="imgUrl"
          value={imgUrl}
          placeholder="Img url"
          onChange={handleChange}
        />

        <Input
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Imdb url"
          onChange={handleChange}
        />

        <Input
          name="imdbId"
          value={imdbId}
          placeholder="Imdb Id"
          onChange={handleChange}
        />

        <button type="submit">Add new movie</button>
      </form>
    );
  }
}
