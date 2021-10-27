import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  submited: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    submited: false,
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.setState({
      submited: true,
    });

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim()) {
      this.props.onAdd(movie);
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        submited: false,
      });
    }
  };

  handleCahnge = (value: string, name: string) => {
    this.setState((state) => ({
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
      submited,
    } = this.state;

    return (
      <>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <input
            className="input"
            type="text"
            name="title"
            placeholder="please write a title"
            value={title}
            onChange={(event: any) => {
              this.handleCahnge(event.currentTarget.value, event.currentTarget.name);
            }}
          />
          {title.trim().length === 0 && submited && (
            <p className="form__error">title too short</p>
          )}
          <input
            className="input"
            type="text"
            name="description"
            placeholder="please write a description"
            value={description}
            onChange={(event: any) => {
              this.handleCahnge(event.currentTarget.value, event.currentTarget.name);
            }}
          />
          <input
            className="input"
            type="text"
            name="imgUrl"
            placeholder="please write a imgUrl"
            value={imgUrl}
            onChange={(event: any) => {
              this.handleCahnge(event.currentTarget.value, event.currentTarget.name);
            }}
          />
          {imgUrl.trim().length === 0 && submited && (
            <p className="form__error">imgUrl too short</p>
          )}
          <input
            className="input"
            type="text"
            name="imdbUrl"
            placeholder="please write a imdbUrl"
            value={imdbUrl}
            onChange={(event: any) => {
              this.handleCahnge(event.currentTarget.value, event.currentTarget.name);
            }}
          />
          {imdbUrl.trim().length === 0 && submited && (
            <p className="form__error">imdbUrl too short</p>
          )}
          <input
            className="input"
            type="text"
            name="imdbId"
            placeholder="please write a imdbId"
            value={imdbId}
            onChange={(event: any) => {
              this.handleCahnge(event.currentTarget.value, event.currentTarget.name);
            }}
          />
          {imdbId.trim().length === 0 && submited && (
            <p className="form__error">imdbId too short</p>
          )}
          <button
            type="submit"
            className="form__button"
          >
            <strong>Add movie</strong>
          </button>
        </form>
      </>
    );
  }
}
