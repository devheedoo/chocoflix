import { AnimatePresence, motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import { IMovieNowPlaying } from '../api';
import MovieSliderBox from './MovieSliderBox';

interface IMovieSliderProps {
  pageIndex: number;
  pageOffset: number;
  movies: IMovieNowPlaying[];
  onClickMovie: (movieId: number) => void;
  onExitComplete: () => void;
}

export default function MovieSlider({
  pageIndex,
  pageOffset,
  movies,
  onClickMovie,
  onExitComplete,
}: IMovieSliderProps) {
  return (
    <Slider>
      <AnimatePresence initial={false} onExitComplete={onExitComplete}>
        {' '}
        <Row
          key={pageIndex}
          offset={pageOffset}
          variants={rowVariants}
          initial="initial"
          animate="animate"
          transition={{ type: 'tween', duration: 0.5 }}
          exit="exit"
        >
          {movies.map((movie) => (
            <MovieSliderBox
              key={movie.id}
              movie={movie}
              onClick={onClickMovie}
            />
          ))}
        </Row>
      </AnimatePresence>
    </Slider>
  );
}

// styled components
const Slider = styled.div`
  background-color: red;
`;

const Row = styled(motion.div)<{ offset: number }>`
  position: absolute;
  display: grid;
  width: 100%;
  bottom: -100px;
  gap: 10px;
  grid-template-columns: repeat(${(props) => props.offset}, 1fr);
`;

// variants
const rowVariants: Variants = {
  initial: { x: window.outerWidth + 10 },
  animate: { x: 0 },
  exit: { x: -window.outerWidth - 10 },
};
