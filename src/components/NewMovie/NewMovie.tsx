import { Component, ChangeEvent, FormEvent } from 'react';
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

  changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
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

  submitHandler = (event: FormEvent) => {
    event.preventDefault();
    this.props.onAdd(this.state);
    this.clearForm();
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
        className="form"
        autoComplete="off"
        onSubmit={this.submitHandler}
      >
        <div className="form__container">
          <label className="form__label" htmlFor="title">
            Title *
            <input
              type="text"
              name="title"
              className="form__input"
              id="title"
              required
              value={title}
              onChange={this.changeHandler}
            />
          </label>
          <label className="form__label" htmlFor="imgUrl">
            ImgUrl *
            <input
              type="text"
              name="imgUrl"
              className="form__input"
              id="imgUrl"
              required
              value={imgUrl}
              onChange={this.changeHandler}
            />
          </label>
          <label className="form__label" htmlFor="imdbUrl">
            ImdbUrl *
            <input
              type="text"
              name="imdbUrl"
              className="form__input"
              id="imdbUrl"
              required
              value={imdbUrl}
              onChange={this.changeHandler}
            />
          </label>
          <label className="form__label" htmlFor="imdbId">
            ImdbId*
            <input
              type="text"
              name="imdbId"
              className="form__input"
              id="imdbId"
              required
              value={imdbId}
              onChange={this.changeHandler}
            />
          </label>
          <label className="form__label" htmlFor="description">
            Description
            <textarea
              name="description"
              className="form__textarea"
              id="description"
              value={description}
              placeholder="Enter description"
              onChange={this.changeHandler}
            />
          </label>
        </div>
        <button type="submit" className="form__button">Add movie</button>
      </form>
    );
  }
}
