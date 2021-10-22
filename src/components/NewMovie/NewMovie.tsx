import { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
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

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  handleSubmit: React.FormEventHandler = (event) => {
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

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          className="input is-normal mt-4"
          placeholder="Title"
          value={title}
          onChange={this.handleChangeInput}
          required
        />
        <input
          type="text"
          name="description"
          className="input is-normal mt-4"
          placeholder="Description"
          value={description}
          onChange={this.handleChangeInput}
          required
        />
        <input
          type="text"
          name="imgUrl"
          className="input is-normal mt-4"
          placeholder="Image URL-address"
          value={imgUrl}
          onChange={this.handleChangeInput}
          required
        />
        <input
          type="text"
          name="imdbUrl"
          className="input is-normal mt-4"
          placeholder="URL-address on movie"
          value={imdbUrl}
          onChange={this.handleChangeInput}
          required
        />
        <input
          type="text"
          name="imdbId"
          className="input is-normal mt-4"
          placeholder="ImdbId"
          value={imdbId}
          onChange={this.handleChangeInput}
          required
        />
        <button
          type="submit"
          className="button is-primary is-medium is-fullwidth mt-5"
        >
          Add movie
        </button>
      </form>
    );
  }
}
