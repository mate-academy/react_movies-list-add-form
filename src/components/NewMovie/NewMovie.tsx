import { useState } from 'react';
import { TextField } from '../TextField';
import { InputEvent, Movie, InputValues } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [inputValues, setInputValues] = useState<InputValues>({
    title: false,
    imdbId: false,
    imgUrl: false,
    imdbUrl: false,
  });

  const formFields = {
    title: '',
    description: '',
    imdbId: '',
    imgUrl: '',
    imdbUrl: '',
  };

  const [movie, setMovie] = useState({ ...formFields });

  const reset = () => {
    setMovie({ ...formFields });
    setInputValues({
      title: false,
      imdbId: false,
      imgUrl: false,
      imdbUrl: false,
    });
    setCount(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (movie.title
      && movie.imgUrl
      && movie.imdbUrl
      && movie.imdbId
    ) {
      onAdd(movie);
      setCount(count + 1);
      reset();
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = event.target;

    switch (name) {
      case 'title':
        if (!movie.title.trim()) {
          setInputValues({
            ...inputValues,
            title: true,
          });
        }

        break;

      case 'imgUrl':
        if (!movie.imgUrl.trim()) {
          setInputValues({
            ...inputValues,
            imgUrl: true,
          });
        }

        break;

      case 'imdbUrl':
        if (!movie.imdbUrl.trim()) {
          setInputValues({
            ...inputValues,
            imdbUrl: true,
          });
        }

        break;

      case 'imdbId':
        if (!movie.imdbId.trim()) {
          setInputValues({
            ...inputValues,
            imdbId: true,
          });
        }

        break;
      default:
        break;
    }
  };

  const handleInputChange = (event: InputEvent) => {
    const { name, value } = event.target;

    setMovie(prevState => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
      case (movie.title):
        setInputValues({
          ...inputValues,
          title: false,
        });

        break;

      case (movie.imgUrl):

        setInputValues({
          ...inputValues, imgUrl: false,
        });

        break;

      case (movie.imdbUrl):
        setInputValues({
          ...inputValues,
          imdbUrl: false,
        });

        break;

      case (movie.imdbId):
        setInputValues({
          ...inputValues,
          imdbId: false,
        });

        break;

      default:
        break;
    }
  };

  const disableButton = (
    !movie.title.trim()
    || !movie.imgUrl.trim()
    || !movie.imdbUrl.trim()
    || !movie.imdbId.trim()
  );

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleInputChange}
        onBlur={handleBlur}
        required
        isError={inputValues.title}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleInputChange}
        onBlur={handleBlur}
        required
        isError={inputValues.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputChange}
        onBlur={handleBlur}
        required
        isError={inputValues.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputChange}
        onBlur={handleBlur}
        required
        isError={inputValues.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disableButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
