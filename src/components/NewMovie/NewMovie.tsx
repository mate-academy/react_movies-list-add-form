import { Component } from 'react';

type Props = {
  onAdd: (newMovie: Movie) => void,
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

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
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
      <form onSubmit={this.handleSubmit} className="form">
        <p className="form__title">Put the form here</p>
        <input
          className="form__input"
          type="title"
          name="title"
          placeholder="Enter a title"
          value={title}
          onChange={this.changeHandler}
          required
        />
        <input
          className="form__input"
          type="description"
          name="description"
          placeholder="Enter a description"
          value={description}
          onChange={this.changeHandler}
        />
        <input
          className="form__input"
          type="imgUrl"
          name="imgUrl"
          placeholder="Enter a imgUrl"
          value={imgUrl}
          onChange={this.changeHandler}
          required
        />
        <input
          className="form__input"
          type="imdbUrl"
          name="imdbUrl"
          placeholder="Enter a imdbUrl"
          value={imdbUrl}
          onChange={this.changeHandler}
          required
        />
        <input
          className="form__input"
          type="imdbId"
          name="imdbId"
          placeholder="Enter a imdbId"
          value={imdbId}
          onChange={this.changeHandler}
          required
        />
        <button type="submit" className="form__button">
          Add
        </button>
      </form>
    );
  }
}
