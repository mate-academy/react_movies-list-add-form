import { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = Movie;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trimLeft(),
    } as Pick<State, keyof State>);
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
      changeHandler,
      submitHandler,
    } = this;

    return (
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            placeholder="title"
            required
            name="title"
            value={title}
            onChange={changeHandler}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="description"
            name="description"
            value={description}
            onChange={changeHandler}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="imgUrl"
            required
            name="imgUrl"
            value={imgUrl}
            onChange={changeHandler}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="imdbUrl"
            required
            name="imdbUrl"
            value={imdbUrl}
            onChange={changeHandler}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="imdbId"
            required
            name="imdbId"
            value={imdbId}
            onChange={changeHandler}
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
