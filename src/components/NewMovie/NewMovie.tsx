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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<State, keyof State>)
  }

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    })
  }

  render() {
    const { onAdd } = this.props;
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(this.state);
          this.clearForm()
        }}
        className="form"
      >
        <input
          className="form__input"
          name="title"
          placeholder="Enter title"
          value={this.state.title}
          type="text"
          onChange={this.handleChange}
        />
        <input
          name="description"
          className="form__input"
          value={this.state.description}
          type="text"
          placeholder="Enter description"
          onChange={this.handleChange}
        />
        <input
          name="imgUrl"
          className="form__input"
          value={this.state.imgUrl}
          type="text"
          placeholder="Enter imgUrl"
          onChange={this.handleChange}
        />
        <input
          name="imdbUrl"
          className="form__input"
          value={this.state.imdbUrl}
          type="text"
          placeholder="Enter imdbUrl"
          onChange={this.handleChange}
        />
        <input
        className="form__input"
          name="imdbId"
          value={this.state.imdbId}
          type="text"
          placeholder="Enter imdbId"
          onChange={this.handleChange}
        />
        <button
          className="form__button"
          type="submit"
        >
          ADD MOVIE
        </button>
      </form>
    );
  }
}
