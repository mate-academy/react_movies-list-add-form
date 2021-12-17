import { Component } from 'react';

type Props = {
  addMovie (
    title: string,
    description: string,
    imdbId: string,
    imdbUrl: string,
    imgUrl: string,
  ): void;
};

type State = {
  title?: string,
  description?: string,
  imgUrl?: string,
  imdbUrl?: string,
  imdbId?: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleCHange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
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

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    event.preventDefault();
    if (title && description && imdbId && imdbUrl && imgUrl) {
      this.props.addMovie(title, description, imdbId, imdbUrl, imgUrl);
    }

    this.clearForm();
  };

  render() {
    return (
      <form
        className="NewMovie"
        onSubmit={this.handleSubmit}
      >
        <div>
          title
        </div>
        <input
          required
          className="NewMovie__title"
          name="title"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleCHange}
        />

        <div>
          description
        </div>
        <textarea
          required
          name="description"
          placeholder="description"
          value={this.state.description}
          onChange={this.handleCHange}
          className="NewMovie__description"
        />

        <div>
          imgUrl
        </div>
        <input
          required
          name="imgUrl"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleCHange}
          className="NewMovie__imgUrl"
        />

        <div>
          imdbUrl
        </div>
        <input
          required
          name="imdbUrl"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleCHange}
          className="NewMovie__imdbUrl"
        />

        <div>
          imdbId
        </div>

        <input
          required
          name="imdbId"
          placeholder="imdbId"
          value={this.state.imdbId}
          onChange={this.handleCHange}
          className="NewMovie__imdbId"
        />

        <button
          type="submit"
          className="NewMovie__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}
