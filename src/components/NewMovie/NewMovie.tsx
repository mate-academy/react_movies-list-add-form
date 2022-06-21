import { ChangeEvent, Component } from 'react';

type Props = {
  onAdd: (x:Movie) => void,
};
type State = {
  movie:Movie
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  onSubmit = (event:React.SyntheticEvent) => {
    event.preventDefault();
    this.props.onAdd(this.state.movie);
    this.setState({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  onChange = (event:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      movie: {
        ...state.movie,
        [name]: value,
      },
    }));
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.movie;

    return (
      <>
        <h1>Add movie</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.onChange}
              required
            />
          </label>
          <br />
          <label>
            description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.onChange}
              required
            />
          </label>
          <br />
          <label>
            imgUrl:
            <input
              type="text"
              name="imgUrl"
              value={imgUrl}
              onChange={this.onChange}
              required
            />
          </label>
          <br />
          <label>
            imdbUrl:
            <input
              type="text"
              name="imdbUrl"
              value={imdbUrl}
              onChange={this.onChange}
              required
            />
          </label>
          <br />
          <label>
            imdbId:
            <input
              type="text"
              name="imdbId"
              value={imdbId}
              onChange={this.onChange}
              required
            />
          </label>

          <p>
            <button type="submit">
              Add movie
            </button>
          </p>
        </form>
      </>
    );
  }
}
