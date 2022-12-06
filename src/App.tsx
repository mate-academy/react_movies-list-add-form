import './App.scss';
import { MoviesList } from './components/MoviesList';
import { movie, NewMovie } from './components/NewMovie';

export const App = () => {
  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movie} />
      </div>
      <div className="sidebar">
        <NewMovie />
      </div>
    </div>
  );
};
