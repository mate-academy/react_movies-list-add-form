import { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void,
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.setState((prev: State) => ({
      ...prev,
      [name]: value,
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.addMovie(this.state);

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
      <form onSubmit={this.handleSubmit}>
        {Object.keys(this.state).map(item => (
          <input
            key={item}
            type="text"
            name={item}
            value={this.state[item as keyof State]}
            placeholder={item}
            onChange={this.handleChange}
          />
        ))}
        <button type="submit">Add movie</button>
      </form>
    );
  }
}
