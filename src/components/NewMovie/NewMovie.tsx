import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

export class NewMovie extends Component<Props, Movie> {
  state: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const items = Object.keys(this.state);

    return (
      <form onSubmit={this.handleSubmit}>
        {items.map(item => (
          <input
            type="text"
            key={item}
            name={item}
            value={this.state[item]}
            placeholder={item}
            onChange={this.handleChange}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    );
  }
}
