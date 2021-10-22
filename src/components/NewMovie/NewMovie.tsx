import { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void,
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onAdd(this.state);
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

    const {
      handleChange,
      handleSubmit,
    } = this;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="title"
            required
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="description"
            required
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="imgUrl"
            required
            name="imgUrl"
            value={imgUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="imdbUrl"
            required
            name="imdbUrl"
            value={imdbUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="imdbId"
            required
            name="imdbId"
            value={imdbId}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="App__button"
        >
          Add
        </button>
      </form>
    );
  }
}
