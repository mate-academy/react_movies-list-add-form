import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string
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
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Omit<State, ''>);
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

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onAdd(this.state);
    this.clearForm();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {Object.keys(this.state).map(item => (
          <div key={item}>
            {item.toUpperCase()}
            <label htmlFor={item} key={item}>
              <div>
                <input
                  className="ui focus input"
                  key={item}
                  id={item}
                  name={item}
                  type="text"
                  value={this.state[item as keyof State]}
                  placeholder={`Enter ${item}`}
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </div>
            </label>
          </div>
        ))}
        <button
          type="submit"
          className="ui black basic button"
        >
          Add Movie
        </button>
      </form>
    );
  }
}
