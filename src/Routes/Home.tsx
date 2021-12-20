import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import { useQuery } from 'react-query';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { fetchMoviesNowPlaying, IMovies } from '../api';
import MovieSlider from '../Components/MovieSlider';
import { makeMovieImageUrl } from '../utils';

const SLIDER_OFFSET = Math.floor(window.innerWidth / 300);

/* styled components */
const Wrapper = styled.div`
  width: 100vw;
  height: 200vh;
  background: linear-gradient(135deg, cyan, lightgreen);
`;

const Loader = styled.div``;
const Banner = styled.div<{ fileNameWithExtension: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => makeMovieImageUrl(props.fileNameWithExtension)});
  background-size: cover;
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 58px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Overview = styled.p`
  font-size: 18px;
  width: 70%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;

const MovieDetailModal = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  min-width: 800px;
  width: 40vw;
  height: 50vh;
  z-index: 101;
`;

const MovieCover = styled.div<{ backgroundImageUrl: string }>`
  width: 100%;
  height: 50vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.backgroundImageUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 20px;
  overflow: hidden;
`;

const MovieDetailContainer = styled.div`
  position: relative;
  top: -100px;
  padding: 20px;
`;

const MovieTitle = styled.h3`
  font-size: 60px;
  margin-bottom: 10px;
`;

const MovieOverview = styled.p`
  line-height: 1.5;
  color: ${(props) => props.theme.white.darker};
`;

const SliderWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  bottom: 200px;
`;

export default function Home() {
  const history = useHistory();
  const matchesMovieId = useRouteMatch<{ movieId: string }>('/movie/:movieId');
  const matchedMovieId = matchesMovieId?.params.movieId;

  const { data, isLoading } = useQuery<IMovies>(
    ['movie', 'now_playing'],
    fetchMoviesNowPlaying
  );
  const [movieOfBanner, ...moviesOfSlider] = data?.results ?? [];

  const handleClickMovie = (movieId: number) => {
    history.push(`/movie/${movieId}`);
  };

  const { scrollY } = useViewportScroll();
  const handleClickOverlay = () => history.push('/');

  const clickedMovie =
    matchedMovieId &&
    moviesOfSlider.find((movie) => movie.id === +matchedMovieId);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div
          style={{
            position: 'relative',
            backgroundColor: 'rgba(0,0,0,1)',
            width: '100%',
            height: '100%',
          }}
        >
          <Banner fileNameWithExtension={movieOfBanner?.backdrop_path ?? ''}>
            <Title>{movieOfBanner?.title ?? ''}</Title>
            <Overview>{movieOfBanner?.overview ?? ''}</Overview>
          </Banner>
          <SliderWrapper>
            <MovieSlider
              title={'NOW PLAYING'}
              movies={moviesOfSlider}
              pageOffset={SLIDER_OFFSET}
              onClickMovie={handleClickMovie}
            />
          </SliderWrapper>
          <AnimatePresence>
            {matchesMovieId ? (
              <>
                <Overlay
                  onClick={handleClickOverlay}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <MovieDetailModal
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={matchesMovieId?.params.movieId}
                >
                  {clickedMovie ? (
                    <>
                      <MovieCover
                        backgroundImageUrl={makeMovieImageUrl(
                          clickedMovie.backdrop_path
                        )}
                      />
                      <MovieDetailContainer>
                        <MovieTitle>{clickedMovie.title}</MovieTitle>
                        <MovieOverview>{clickedMovie.overview}</MovieOverview>
                      </MovieDetailContainer>
                    </>
                  ) : null}
                </MovieDetailModal>
              </>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </Wrapper>
  );
}
