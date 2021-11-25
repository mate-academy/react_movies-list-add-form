import { Component } from 'react';

type Props = {
  add: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends Component<Props> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleInputChange = (event: { target: { name: string; value: string; }; }) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.add({
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
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <label
          htmlFor="title"
        >
          <h3>Title:</h3>
          <input
            name="title"
            id="title"
            type="text"
            placeholder="Enter title"
            value={this.state.title}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <br />

        <label htmlFor="description">
          <h3>Description:</h3>
          <textarea
            name="description"
            id="description"
            placeholder="Enter description"
            value={this.state.description}
            onChange={(event) => {
              this.setState({
                description: event.target.value,
              });
            }}
            required
          />
        </label>
        <br />

        <label htmlFor="imgUrl">
          <h3>ImgUrl:</h3>
          <input
            type="text"
            placeholder="Enter title"
            name="imgUrl"
            id="imgUrl"
            value={this.state.imgUrl}
            onChange={(event) => {
              this.setState({
                imgUrl: event.target.value,
              });
            }}
            required
          />
        </label>

        <br />

        <label htmlFor="imdbUrl">
          <h3>ImdbUrl:</h3>
          <input
            type="text"
            placeholder="Enter title"
            name="imdbUrl"
            id="imdbUrl"
            value={this.state.imdbUrl}
            onChange={(event) => {
              this.setState({
                imdbUrl: event.target.value,
              });
            }}
            required
          />
        </label>
        <br />

        <label htmlFor="imdbId">
          <h3>ImdbId:</h3>
          <input
            type="text"
            placeholder="Enter title"
            name="imdbId"
            id="imdbId"
            value={this.state.imdbId}
            onChange={(event) => {
              this.setState({
                imdbId: event.target.value,
              });
            }}
            required
          />
        </label>
        <div>
          <button type="submit">
            Add
          </button>
        </div>
      </form>
    );
  }
}
