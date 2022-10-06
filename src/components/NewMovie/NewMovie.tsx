// import { Settings } from 'http2';
import { useState } from 'react';
// import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

// type Movie = {
//   title: string;
//   description: string;
//   imgUrl: string;
//   imdbUrl: string;
//   imdbId: string;
// };

type Props = {

  // onAdd: (movie: Movie) => {},
  // disabled: boolean,
  // count: number,
  // fieldValue: string,
  // fillInput: (event: string) => void;
};

export const NewMovie: React.FC<Props> = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [inputValue, setFieldValue] = useState('');

  // const handleBnpm
  // setTitle

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!inputValue) {
      return;
    }

    // props.onAdd(inputValue);
    setFieldValue('');
  };

  const changeValue = (event: any) => {
    setFieldValue(event.target.value);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        // value=""
        value={inputValue}
        onChange={changeValue}
        // onChange={fillInput}
        // onChange={() => {
        //   fillInput(fieldValue);
        // }}
        // onChange={fillInput}
        required
      />

      <TextField
        name="description"
        label="Description"
        // onChange={() => {}}
        onChange={changeValue}
        value={inputValue}
        // value={inputValue}
        // value=""
        // value={description}
        // value=""
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        onChange={changeValue}
        // value=""
        // value={imgUrl}
        value={inputValue}
        // required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        onChange={changeValue}
        value={inputValue}
        // value={inputValue}
        // value={imdbUrl}
        // value=""
        // required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        onChange={changeValue}
        value={inputValue}
        // value={imdbId}
        // value=""
        // required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
          {/* <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled
          >
            Add
          </button> */}
        </div>
      </div>
    </form>
  );
};

// const [title, setTitle] = useState('');
// const [description, setDescription] = useState('');
// const [imgUrl, setImgUrl] = useState('');
// const [imdbUrl, setImdbUrl] = useState('');
// const [imdbId, setImdbId] = useState('');
// const [disabled, setDisabled] = useState(true);
