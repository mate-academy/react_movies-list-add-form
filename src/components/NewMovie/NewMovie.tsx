import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // для генерації ключа форми

interface NewMovieProps {
  onAddMovie: (movie: {
    title: string;
    imgUrl: string;
    imdbUrl: string;
    description?: string;
  }) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formKey, setFormKey] = useState(uuidv4()); // новий ключ

  const validateField = (name: string, value: string) => {
    if (value.trim() === '') {
      setErrors(prev => ({ ...prev, [name]: 'Field is required' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };

        delete newErrors[name];

        return newErrors;
      });
    }
  };

  const handleBlur = (name: string, value: string) => {
    validateField(name, value);
  };

  const isFormValid = () => {
    return title.trim() !== '' && imgUrl.trim() !== '' && imdbUrl.trim() !== '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Перевірити перед сабмітом
    validateField('title', title);
    validateField('imgUrl', imgUrl);
    validateField('imdbUrl', imdbUrl);

    if (!isFormValid()) {
      return;
    }

    onAddMovie({
      title: title.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      description: description.trim(),
    });

    // ✅ Повне скидання форми
    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setDescription('');
    setErrors({});
    setFormKey(uuidv4());
  };

  return (
    <form onSubmit={handleSubmit} key={formKey}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => handleBlur('title', title)}
          style={{ borderColor: errors.title ? 'red' : undefined }}
        />
        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="imgUrl">Image URL</label>
        <input
          id="imgUrl"
          type="text"
          value={imgUrl}
          onChange={e => setImgUrl(e.target.value)}
          onBlur={() => handleBlur('imgUrl', imgUrl)}
          style={{ borderColor: errors.imgUrl ? 'red' : undefined }}
        />
        {errors.imgUrl && <p style={{ color: 'red' }}>{errors.imgUrl}</p>}
      </div>

      <div>
        <label htmlFor="imdbUrl">IMDB URL</label>
        <input
          id="imdbUrl"
          type="text"
          value={imdbUrl}
          onChange={e => setImdbUrl(e.target.value)}
          onBlur={() => handleBlur('imdbUrl', imdbUrl)}
          style={{ borderColor: errors.imdbUrl ? 'red' : undefined }}
        />
        {errors.imdbUrl && <p style={{ color: 'red' }}>{errors.imdbUrl}</p>}
      </div>

      <div>
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <button type="submit" disabled={!isFormValid()}>
        Submit
      </button>
    </form>
  );
};
