import { useState } from 'react';
import { TextField } from '../TextField';

const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i;

function validateUrl(value: string) {
  if (!value) {
    return null;
  }

  return urlRegex.test(value) ? null : 'Please enter a valid URL';
}

interface NewMovieProps {
  onAdd: (movie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = formData.title.trim();
    const trimmedImgUrl = formData.imgUrl.trim();
    const trimmedImdbUrl = formData.imdbUrl.trim();
    const trimmedImdbId = formData.imdbId.trim();
    const trimmedDescription = formData.description.trim();

    // Validate required fields
    if (!trimmedTitle || !trimmedImgUrl || !trimmedImdbUrl || !trimmedImdbId) {
      return; // Do not submit if any required field is empty
    }

    onAdd({
      title: trimmedTitle,
      description: trimmedDescription,
      imgUrl: trimmedImgUrl,
      imdbUrl: trimmedImdbUrl,
      imdbId: trimmedImdbId,
    });

    // Clear the form after successful submission
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prev => prev + 1);
  };

  const isSubmitDisabled =
    !formData.title.trim() ||
    !formData.imgUrl.trim() ||
    !formData.imdbUrl.trim() ||
    !formData.imdbId.trim();

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={newValue =>
          setFormData(prev => ({ ...prev, title: newValue }))
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={newValue =>
          setFormData(prev => ({ ...prev, description: newValue }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={newValue =>
          setFormData(prev => ({ ...prev, imgUrl: newValue }))
        }
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={newValue =>
          setFormData(prev => ({ ...prev, imdbUrl: newValue }))
        }
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={newValue =>
          setFormData(prev => ({ ...prev, imdbId: newValue }))
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
