import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import { useQuery } from 'react-query';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import {
  fetchTVShowsAiringToday,
  fetchTVShowsLatest,
  fetchTVShowsPopular,
  fetchTVShowsTopRated,
  ITVShows,
  SearchResultMediaType,
} from '../api';
import DetailModal from '../Components/DetailModal';
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
  position: absolute;
  width: 100%;
  height: 100vh;
  bottom: 200px;
`;

export default function TVShows() {
  const history = useHistory();
  const matchesTVShowId =
    useRouteMatch<{ tvShowId: string }>('/tv_show/:tvShowId');
  const matchedTVShowId = matchesTVShowId?.params.tvShowId;

  const { data: tvShowsAiringToday, isLoading: isLoadingTVShowsAiringToday } =
    useQuery<ITVShows>(['tv_show', 'airing_today'], fetchTVShowsAiringToday);
  const { data: tvShowsLatest, isLoading: isLoadingTVShowsLatest } =
    useQuery<ITVShows>(['tv_show', 'latest'], fetchTVShowsLatest);
  const { data: tvShowsPopular, isLoading: isLoadingTVShowsPopular } =
    useQuery<ITVShows>(['tv_show', 'popular'], fetchTVShowsPopular);
  const { data: tvShowsTopRated, isLoading: isLoadingTVShowsTopRated } =
    useQuery<ITVShows>(['tv_show', 'top_rated'], fetchTVShowsTopRated);
  const [tvShowOfBanner, ...tvShowsOfSlider] =
    tvShowsAiringToday?.results ?? [];

  const isLoading =
    isLoadingTVShowsAiringToday ||
    isLoadingTVShowsLatest ||
    isLoadingTVShowsPopular ||
    isLoadingTVShowsTopRated;

  const handleClickTVShow = (tvShowId: number) => {
    history.push(`/tv_show/${tvShowId}`);
  };

  const { scrollY } = useViewportScroll();
  const handleClickOverlay = () => history.push('/tv_show');

  const clickedTVShow =
    matchedTVShowId &&
    tvShowsOfSlider.find((tvShow) => tvShow.id === +matchedTVShowId);

  console.log(tvShowsAiringToday);

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
          <Banner fileNameWithExtension={tvShowOfBanner?.backdrop_path ?? ''}>
            <Title>{tvShowOfBanner?.name ?? ''}</Title>
            <Overview>{tvShowOfBanner?.overview ?? ''}</Overview>
          </Banner>
          <SliderWrapper>
            <MovieSlider
              title={'NOW PLAYING'}
              movies={tvShowsOfSlider}
              pageOffset={sliderOffset}
              onClickMovie={handleClickTVShow}
            />
            <MovieSlider
              title={'LATEST'}
              movies={tvShowsLatest?.results ?? []}
              pageOffset={sliderOffset}
              onClickMovie={handleClickTVShow}
            />
            <MovieSlider
              title={'POPULAR'}
              movies={tvShowsPopular?.results ?? []}
              pageOffset={sliderOffset}
              onClickMovie={handleClickTVShow}
            />
            <MovieSlider
              title={'TOP RATED'}
              movies={tvShowsTopRated?.results ?? []}
              pageOffset={sliderOffset}
              onClickMovie={handleClickTVShow}
            />
          </SliderWrapper>
          <AnimatePresence>
            {matchesTVShowId ? (
              <>
                <Overlay
                  onClick={handleClickOverlay}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <MovieDetailModal
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={matchesTVShowId?.params.tvShowId}
                >
                  {clickedTVShow ? (
                    <DetailModal
                      contentId={clickedTVShow.id}
                      contentType={SearchResultMediaType.TV}
                    />
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
