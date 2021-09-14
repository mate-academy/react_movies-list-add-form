import React from 'react';
import './NewMovie.scss';

type Props = {
  addNewFilm: (movie: Movie) => void;
};
type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  isValidImgUrl: boolean,
  isValidImdbUrl: boolean,
};

export class NewMovie extends React.Component<Props, State> {
  validUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isValidImgUrl: true,
    isValidImdbUrl: true,
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, 'title' | 'description' | 'imdbId'>);
  };

  validatadeImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (this.validUrl.test(value)) {
      this.setState({
        imgUrl: value,
        isValidImgUrl: true,
      });
    } else {
      this.setState(currentState => ({
        isValidImgUrl: !currentState.isValidImgUrl,
      }));
    }
  };

  validatadeImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (this.validUrl.test(value)) {
      this.setState({
        imdbUrl: value,
        isValidImdbUrl: true,
      });
    } else {
      this.setState(currentState => ({
        isValidImdbUrl: !currentState.isValidImdbUrl,
      }));
    }
  };

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imdbUrl: '',
      imgUrl: '',
      imdbId: '',
    });
  };

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    } = this.state;

    const newFilm = {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    };

    this.props.addNewFilm(newFilm);
    this.resetForm();
  };

  render() {
    const {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
      isValidImgUrl,
      isValidImdbUrl,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            className="form-control mb-3"
            placeholder="title"
            value={title}
            onChange={this.handleChange}
            required
          />
          <textarea
            name="description"
            className="form-control mb-3"
            placeholder="description"
            value={description}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="imgUrl"
            className="form-control mb-3"
            placeholder="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            onBlur={this.validatadeImgUrl}
            required
          />
          {!isValidImgUrl
            && <span className="error">Please enter correct url</span>}
          <input
            type="text"
            name="imdbUrl"
            className="form-control mb-3"
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            onBlur={this.validatadeImdbUrl}
            required
          />
          {!isValidImdbUrl
            && <span className="error">Please enter correct url</span>}
          <input
            type="text"
            name="imdbId"
            className="form-control mb-3"
            placeholder="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="btn-group d-flex">
          <button
            type="submit"
            className="btn btn-success"
            disabled={!title || !imgUrl || !imdbId || !imdbUrl || !isValidImgUrl || !isValidImdbUrl}
          >
            Add film
          </button>
        </div>
      </form>
    );
  }
}
