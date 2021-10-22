import React from 'react';
import ClassNames from 'classnames';

type Props = {
  onAdd: (newMovie: Movie) => void;
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  inputErr: boolean,
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    inputErr: false,
  };

  formInputChanger = (value: string, key: string) => {
    this.setState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  submitNewMovie = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      this.setState({
        inputErr: true,
      });

      return;
    }

    onAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      inputErr: false,
    });
  };

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId, inputErr,
    } = this.state;

    return (
      <div>
        <h1>Add Movie Form</h1>

        <form className="form" onSubmit={this.submitNewMovie}>
          <input
            type="text"
            placeholder="title"
            className={ClassNames(
              'form__field',
              { 'form__field--error': inputErr },
            )}
            value={title}
            onChange={(event) => this.formInputChanger(event.target.value, 'title')}
          />
          <input
            type="text"
            placeholder="description"
            className="form__field"
            value={description}
            onChange={(event) => this.formInputChanger(event.target.value, 'description')}
          />
          <input
            type="text"
            placeholder="imgUrl"
            className={ClassNames(
              'form__field',
              { 'form__field--error': inputErr },
            )}
            value={imgUrl}
            onChange={(event) => this.formInputChanger(event.target.value, 'imgUrl')}
          />
          <input
            type="text"
            placeholder="imdbUrl"
            className={ClassNames(
              'form__field',
              { 'form__field--error': inputErr },
            )}
            value={imdbUrl}
            onChange={(event) => this.formInputChanger(event.target.value, 'imdbUrl')}
          />
          <input
            type="number"
            min="1"
            max="99999"
            placeholder="imdbId"
            className={ClassNames(
              'form__field',
              { 'form__field--error': inputErr },
            )}
            value={imdbId}
            onChange={(event) => this.formInputChanger(event.target.value, 'imdbId')}
          />
          <button type="submit">
            Submit
          </button>
          <p
            className={ClassNames(
              'error-message',
              { 'error-message--active': inputErr },
            )}
          >
            Нужно заполнить обязательные поля
          </p>
        </form>
      </div>
    );
  };
};
