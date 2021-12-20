import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchMovieDetail, SearchResultMediaType } from '../api';
import { makeMovieImageUrl } from '../utils';

interface IDetailModalProps {
  contentId: number;
  contentType: SearchResultMediaType;
}

export default function DetailModal({
  contentId,
  contentType,
}: IDetailModalProps) {
  // get content by content id
  if (contentType === SearchResultMediaType.MOVIE) {
    return <DetailModalMovie contentId={contentId} />;
  } else if (contentType === SearchResultMediaType.TV) {
    return null;
  } else {
    return null;
  }
}
interface IDetailModalMovieProps {
  contentId: number;
}

function DetailModalMovie({ contentId }: IDetailModalMovieProps) {
  const { data: movie, isLoading } = useQuery('movie_detail', () =>
    fetchMovieDetail(contentId)
  );
  if (isLoading) return null;
  return movie === undefined ? null : (
    <>
      <MovieCover backgroundImageUrl={makeMovieImageUrl(movie.backdrop_path)} />
      <MovieDetailContainer>
        <MovieTitle>{movie.title}</MovieTitle>
        <Tagline>"{movie.tagline}"</Tagline>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
          <Genres>
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </Genres>
          <Runtime>{movie.runtime}분</Runtime>
          <Vote>
            {movie.vote_average}점 ({movie.vote_count}명)
          </Vote>
        </div>
        <MovieOverview>{movie.overview}</MovieOverview>
      </MovieDetailContainer>
    </>
  );
}

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
  padding: 10px;
`;
const Tagline = styled.div`
  font-size: 24px;
  font-style: oblique;
  margin-bottom: 15px;
`;

const Genres = styled.div`
  height: 30px;
  span {
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.black.lighter};
  }
`;

const Runtime = styled.div`
  height: 30px;
  margin-right: 5px;
`;

const Vote = styled.div``;
