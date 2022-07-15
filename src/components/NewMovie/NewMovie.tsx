import { useState } from 'react';
import './NewMovie.scss';

interface Props {
  addMovie: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imbdUrl, setImbdUrl] = useState('');
  const [imbdId, setImdbId] = useState('');

  const clearForm = () => {
    setTitle('');
    setDescr('');
    setImageUrl('');
    setImbdUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newObj = {
      title: title,
      description: descr,
      imgUrl: imageUrl,
      imdbUrl: imbdUrl,
      imdbId: imbdId,
    };

    addMovie(newObj);
    clearForm();
  };

  return (
    <>
      <span className='NewMovie__title'>Add a movie</span>

      <form onSubmit={handleSubmit} className="NewMovie">
        <input 
          className="form-control"
          type="text"
          name="title"
          placeholder="Title"
          data-cy="form-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <input 
          type="text"
          className="form-control"
          name="description"
          placeholder="Description"
          data-cy="form-description"
          value={descr}
          onChange={(event) => setDescr(event.target.value)}
        />
        <input 
          type="text"
          className="form-control"
          name="imageUrl"
          placeholder="image url"
          data-cy="form-imgUrl"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          required
        />
        <input 
          type="text"
          className="form-control"
          name="imbdUrl"
          placeholder="IMBD url"
          data-cy="form-imdbUrl"
          value={imbdUrl}
          onChange={(event) => setImbdUrl(event.target.value)}
          required
        />
        <input 
          type="text"
          className="form-control"
          name="imbdId"
          placeholder="IMBD ID"
          data-cy="form-imdbId"
          value={imbdId}
          onChange={(event) => setImdbId(event.target.value)}
          required
        />

        <button 
          type="submit"
          data-cy="form-submit-button"
          className="btn btn-secondary"
        >
          Submit
        </button>
      </form>
    </>
  );
};
