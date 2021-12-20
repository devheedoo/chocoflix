import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { IMovie } from '../api';
import MovieSliderBox from './MovieSliderBox';

interface IMovieSliderProps {
  title: string;
  pageOffset: number;
  movies: IMovie[];
  onClickMovie: (movieId: number) => void;
}

export default function MovieSlider({
  title,
  pageOffset,
  movies,
  onClickMovie,
}: IMovieSliderProps) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isExitingSlide, setExitingSlide] = useState(false);
  const [movesForward, setMovingForward] = useState(true);

  const showNextSlide = () => {
    if (isExitingSlide) return; // Disable while slide animtion playing
    const maxIndex = Math.ceil(movies.length / pageOffset) - 1;
    setExitingSlide(true);
    setMovingForward(true);
    setSliderIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const showPrevSlide = () => {
    if (isExitingSlide) return; // Disable while slide animtion playing
    const maxIndex = Math.ceil(movies.length / pageOffset) - 1;
    setExitingSlide(true);
    setMovingForward(false);
    setSliderIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleExitComplete = () => setExitingSlide(false);

  const moviesOnSlide = movies.slice(
    pageOffset * sliderIndex,
    pageOffset * (sliderIndex + 1)
  );

  return (
    <Slider>
      <SliderTitle>{title}</SliderTitle>
      <AnimatePresence initial={false} onExitComplete={handleExitComplete}>
        <Row
          key={sliderIndex}
          offset={pageOffset}
          variants={rowVariants}
          initial={movesForward ? 'initial' : 'exit'}
          animate="animate"
          transition={{ type: 'tween', duration: 0.5 }}
          exit={movesForward ? 'exit' : 'initial'}
        >
          {moviesOnSlide.map((movie) => (
            <MovieSliderBox
              key={movie.id}
              movie={movie}
              onClick={onClickMovie}
            />
          ))}
        </Row>
      </AnimatePresence>
      <Prev onClick={showPrevSlide} pageOffset={pageOffset}>
        <span>{'<'}</span>
      </Prev>
      <Next onClick={showNextSlide} pageOffset={pageOffset}>
        <span>{'>'}</span>
      </Next>
    </Slider>
  );
}

// styled components
const Slider = styled.div`
  position: relative;
`;

const Row = styled(motion.div)<{ offset: number }>`
  position: absolute;
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(${(props) => props.offset}, 1fr);
`;

const SliderTitle = styled.h2`
  font-size: 24px;
  padding: 10px;
  color: ${(props) => props.theme.white.darker};
`;

const Navigator = styled.div<{ pageOffset: number }>`
  position: absolute;
  top: 44px;
  width: 60px;
  height: ${(props) => window.innerWidth / props.pageOffset / 1.58}px;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  span {
    color: ${(props) => props.theme.white.darker};
    font-size: 40px;
  }
`;

const Next = styled(Navigator)`
  right: 0;
`;

const Prev = styled(Navigator)`
  left: 0;
`;

// variants
const rowVariants: Variants = {
  initial: { x: window.outerWidth + 10 },
  animate: { x: 0 },
  exit: { x: -window.outerWidth - 10 },
};
