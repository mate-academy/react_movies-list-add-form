import React from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};
interface State {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
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
      imdbId,
      imdbUrl,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">
            Title
            <br />
            <input
              type="text"
              id="title"
              value={title}
              name="title"
              onChange={this.handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <br />
            <input
              type="text"
              id="description"
              value={description}
              name="description"
              onChange={this.handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="imgUrl">
            imgUrl
            <br />
            <input
              type="email"
              id="imgUrl"
              value={imgUrl}
              name="imgUrl"
              onChange={this.handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="imdbUrl">
            imdbUrl
            <br />
            <input
              type="email"
              value={imdbUrl}
              id="imdbUrl"
              name="imdbUrl"
              onChange={this.handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="imdbId">
            imdbId
            <br />
            <input
              type="text"
              value={imdbId}
              id="imdbId"
              name="imdbId"
              onChange={this.handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Movie</button>
      </form>
    );
  }
}
