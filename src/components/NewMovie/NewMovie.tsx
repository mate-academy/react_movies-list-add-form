import { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

interface Event {
  target: { name: string; value: string }
}

type Props = { addMovie: any };
type State = { [key:string]: string };

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onChange = (event: Event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  urlValidation = (value: string) => {
    return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(value);
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

  sendAndClear = () => {
    const { imgUrl, imdbUrl } = this.state;
    const isImgValid = this.urlValidation(imgUrl);
    const isImdbValid = this.urlValidation(imdbUrl);

    if (isImgValid && isImdbValid) {
      this.props.addMovie(this.state);
      this.clearForm();
    }
  };

  render() {
    const isValid = this.urlValidation;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        method="post"
        onSubmit={event => {
          event.preventDefault();
          this.sendAndClear();
        }}
      >
        <p>Form to add new movie</p>
        <input
          placeholder="Title"
          onChange={this.onChange}
          value={title}
          name="title"
          type="text"
          className="input"
          required
        />
        <input
          placeholder="Description"
          onChange={this.onChange}
          value={description}
          name="description"
          type="text"
          className="input"
        />

        <input
          placeholder="ImgUrl"
          onChange={this.onChange}
          value={imgUrl}
          name="imgUrl"
          type="text"
          className={classNames('input', { error: (!isValid(imgUrl) && imgUrl) })}
          required
        />
        {!isValid(imgUrl) && imgUrl && (
          <div className="notification">
            <span>Please, enter valid imgURL</span>
          </div>
        )}
        <input
          placeholder="ImdbUrl"
          onChange={this.onChange}
          value={imdbUrl}
          name="imdbUrl"
          type="text"
          className={classNames('input', { error: (!isValid(imdbUrl) && imdbUrl) })}
          required
        />
        {!isValid(imdbUrl) && imdbUrl && (
          <div className="notification">
            <span>Please, enter valid imdbURL</span>
          </div>
        )}
        <input
          placeholder="ImdbId"
          onChange={this.onChange}
          value={imdbId}
          name="imdbId"
          type="text"
          className="input"
          required
        />

        <button
          type="submit"
          className="button"
        >
          Submit
        </button>
      </form>
    );
  }
}
