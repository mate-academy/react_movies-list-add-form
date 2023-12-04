import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesFromServer} />
      </div>
      <div className="sidebar">
        <NewMovie /* onAdd={(movie) => {}} */ />
      </div>
    </div>
  );
};
