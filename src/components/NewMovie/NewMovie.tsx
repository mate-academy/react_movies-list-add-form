import { Component } from 'react';
import { Input } from '../Input/Input';

type Props = {
  add: (movie: Movie) => void;
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

  handleAddTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleAddDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleAddImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imgUrl: event.target.value,
    });
  };

  handleAddImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbUrl: event.target.value,
    });
  };

  handleAddImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbId: event.target.value,
    });
  };

  onAdd = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.add(this.state);

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
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    return (
      <form className="form-group" onSubmit={this.onAdd}>
        <Input
          label="Enter title of the film:"
          title={title}
          type="title"
          onChange={this.handleAddTitle}
          required
        />

        <Input
          label="Enter description of the film:"
          title={description}
          type="description"
          onChange={this.handleAddDescription}
          required={false}
        />

        <Input
          label="Enter url image of the film:"
          title={imgUrl}
          type="imgUrl"
          onChange={this.handleAddImgUrl}
          required
        />

        <Input
          label="Enter imdbUrl"
          title={imdbUrl}
          type="imdbUrl"
          onChange={this.handleAddImdbUrl}
          required
        />

        <Input
          label="Enter imdbId:"
          title={imdbId}
          type="imdbId"
          onChange={this.handleAddImdbId}
          required
        />

        <button
          type="submit"
          className="btn btn-outline-secondary"
        >
          Add film
        </button>
      </form>
    );
  }
}
