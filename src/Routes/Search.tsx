import { motion, useViewportScroll } from 'framer-motion';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  fetchSearchResults,
  IMovie,
  ISearchResults,
  ITVShow,
  SearchResultMediaType,
} from '../api';
import MovieSlider from '../Components/MovieSlider';
import { makeMovieImageUrl } from '../utils';

const sliderOffset = Math.floor(window.innerWidth / 300);

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
  padding-top: 100px;
  width: 100%;
`;

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword') ?? '';

  const { data: searchResults, isLoading } = useQuery<ISearchResults>(
    ['movie', 'now_playing'],
    () => fetchSearchResults(keyword)
  );

  const movies = (searchResults?.results.filter(
    (r) => r.media_type === SearchResultMediaType.MOVIE
  ) ?? []) as unknown as IMovie[];

  const tvShows = (searchResults?.results.filter(
    (r) => r.media_type === SearchResultMediaType.TV
  ) ?? []) as unknown as ITVShow[];

  const history = useHistory();

  const handleClickMovie = (movieId: number) => {
    history.push(`/movie/${movieId}`);
  };

  const handleClickTVShow = (tvShowId: number) => {
    history.push(`/tv_show/${tvShowId}`);
  };

  const { scrollY } = useViewportScroll();
  const handleClickOverlay = () => history.push(`/search?keyword=${keyword}`);

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
          <SliderWrapper>
            <MovieSlider
              title={'MOVIES'}
              movies={movies}
              pageOffset={sliderOffset}
              onClickMovie={handleClickMovie}
            />
            <MovieSlider
              title={'TV SHOWS'}
              movies={tvShows}
              pageOffset={sliderOffset}
              onClickMovie={handleClickTVShow}
            />
          </SliderWrapper>
        </div>
      )}
    </Wrapper>
  );
}
