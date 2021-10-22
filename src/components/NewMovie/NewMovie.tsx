import { Component } from 'react';

type Props = {
  onAdd: (state: State) => void;
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

  handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value,
    } as Pick<State, keyof State>));
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
        className="movie-form"
        onSubmit={(event) => {
          event.preventDefault();

          this.props.onAdd({
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          });

          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }}
      >
        <div className="movie-form__field">
          <label htmlFor="title">
            Title:
            <input
              name="title"
              type="text"
              id="title"
              placeholder="Enter the film title"
              value={title}
              onChange={this.handleChangeInput}
              required
            />
            *
          </label>

        </div>
        <div className="movie-form__field">
          <label htmlFor="description">
            Description:
            <input
              name="description"
              type="text"
              id="description"
              placeholder="Enter the film description"
              value={description}
              onChange={this.handleChangeInput}
            />
          </label>
        </div>
        <div className="movie-form__field">
          <label htmlFor="imgUrl">
            Image Url:
            <input
              name="imgUrl"
              type="url"
              id="imgUrl"
              placeholder="Enter the film image URL"
              value={imgUrl}
              onChange={this.handleChangeInput}
              required
            />
            *
          </label>
        </div>
        <div className="movie-form__field">
          <label htmlFor="imdbUrl">
            IMDb Url:
            <input
              name="imdbUrl"
              type="url"
              id="imdbUrl"
              placeholder="Enter the film IMDb URL"
              value={imdbUrl}
              onChange={this.handleChangeInput}
              required
            />
            *
          </label>
        </div>
        <div className="movie-form__field">
          <label htmlFor="imdbId">
            IMDb Id:
            <input
              name="imdbId"
              type="text"
              id="imdbId"
              placeholder="Enter an IMDb id..."
              value={imdbId}
              onChange={this.handleChangeInput}
              required
            />
            *
          </label>

        </div>
        <div className="movie-form__button">
          <button type="submit">
            Add
          </button>
        </div>
      </form>
    );
  }
}
