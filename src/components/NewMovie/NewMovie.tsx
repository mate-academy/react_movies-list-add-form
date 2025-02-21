import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, addCount] = useState(0);
  const [nameFilm, setNameFilm] = useState('');
  const [description, setDescription] = useState('');
  const [urlImg, setUrlImg] = useState('');
  const [urlIMDB, setUrlIMDB] = useState('');
  const [idIMDB, setIdIMDB] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    onAdd({
      title: nameFilm,
      imgUrl: urlImg,
      imdbUrl: urlIMDB,
      imdbId: idIMDB,
      description: description,
    });

    setNameFilm('');
    setDescription('');
    setUrlImg('');
    setUrlIMDB('');
    setIdIMDB('');

    addCount(count + 1);
  }

  function checkImputs(): boolean {
    if (nameFilm && urlImg && urlIMDB && idIMDB) {
      return false;
    }

    return true;
  }

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={nameFilm}
        onChange={setNameFilm}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={urlImg}
        onChange={setUrlImg}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={urlIMDB}
        onChange={setUrlIMDB}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={idIMDB}
        onChange={setIdIMDB}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkImputs()}
            onClick={onSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
