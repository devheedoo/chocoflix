import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import { makeMovieImageUrl } from '../utils';
import { IMovie } from '../api';

/* styled components */
const Box = styled(motion.div)<{ backgroundImageUrl: string }>`
  aspect-ratio: 1.58;
  position: relative;
  flex: 1;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  background-size: cover;
  background-image: url(${(props) => props.backgroundImageUrl});
`;

const BoxDescription = styled(motion.div)`
  height: 50px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    text-align: center;
    color: ${(props) => props.theme.white.darker};
  }
`;

/* variants */
const boxVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.2,
    y: -80,
    zIndex: 99,
    transition: { delay: 0.3, duration: 0.3 },
  },
};

const boxDescriptionVariants: Variants = {
  hover: { opacity: 1, transition: { delay: 0.3, duration: 0.3 } },
};

interface IMovieSliderBoxProps {
  movie: IMovie;
  onClick: Function;
}

export default function MovieSliderBox({
  movie,
  onClick,
}: IMovieSliderBoxProps) {
  return (
    <Box
      key={movie.id}
      layoutId={'' + movie.id}
      onClick={() => onClick(movie.id)}
      backgroundImageUrl={makeMovieImageUrl(movie.backdrop_path, 300)}
      variants={boxVariants}
      initial="initial"
      whileHover="hover"
      transition={{ type: 'tween' }}
    >
      <BoxDescription
        variants={boxDescriptionVariants}
        transition={{ type: 'tween' }}
      >
        <h4>{movie.title}</h4>
      </BoxDescription>
    </Box>
  );
}
