/* eslint-disable jsx-a11y/label-has-associated-control */
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
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  reset() {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title, description, imdbId, imdbUrl, imgUrl,
    } = this.state;

    return (
      <form
        className="NewMovie"
        onSubmit={event => {
          event.preventDefault();
          this.props.onAdd(this.state);
          this.reset();
        }}
      >
        {/* // eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="lable">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="title"
            placeholder="title"
            data-cy="form-title"
            value={title}
            required
            onChange={(event) => {
              this.setState({ title: event.target.value });
            }}
          />
        </div>

        <label className="lable">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            name="description"
            placeholder="description"
            data-cy="form-description"
            value={description}
            onChange={(event) => {
              this.setState({ description: event.target.value });
            }}
          />
        </div>

        <label className="lable">IMG</label>
        <div className="control">
          <input
            className="input"
            type="url"
            name="imgUrl"
            placeholder="imgUrl"
            data-cy="form-imgUrl"
            required
            value={imgUrl}
            onChange={(event) => {
              this.setState({ imgUrl: event.target.value });
            }}
          />
        </div>

        <label className="lable">ImdbUrl</label>
        <div className="control">
          <input
            className="input"
            type="url"
            name="imdbUrl"
            placeholder="imdbUrl"
            data-cy="form-imdbUrl"
            required
            value={imdbUrl}
            onChange={(event) => {
              this.setState({ imdbUrl: event.target.value });
            }}
          />
        </div>

        <label className="lable">IMDB</label>
        <div className="control">
          <input
            className="input"
            type="url"
            name="imdbId"
            placeholder="imdbId"
            data-cy="form-imdbId"
            required
            value={imdbId}
            onChange={(event) => {
              this.setState({ imdbId: event.target.value });
            }}
          />
        </div>

        <button
          type="submit"
          className="button is-ghost is-light"
          data-cy="form-submit-button"
        >
          Add
        </button>
      </form>
    );
  }
}
