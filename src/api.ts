const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = 'e39a8d93726f02bc3d5a6e1542f7a2f9';

export interface IMovie {
  adult: boolean;
  backdrop_path: string; // "/eENEf62tMXbhyVvdcXlnQz2wcuT.jpg"
  genre_ids: number[]; // [878, 28, 12]
  id: number; // 580489
  original_language: string; // "en"
  original_title: string; // "Venom: Let There Be Carnage"
  overview: string; // "연쇄살인마 클리터스 캐서디(우디 해럴슨)가 사형선고를 받는다. 죽을 생각이 전혀 없는 클리터스는 자신의 집행일을 연기할 목적으로 마지막 증언을 남기겠다며 탐사보도로 유명한 프리랜스 저널리스트 에디를 지목한다. 베놈을 얻는 대신 직장과 연인을 모두 잃고 폐인처럼 생활하던 에디는 클리터스와의 단독 인터뷰를 통해 다시 한번 저널리스트로서 재기할 수 있는 기회를 얻는다. 클리터스가 던져주는 수많은 단서로 인해 미결로 남아 있던 살인사건을 추가로 밝히는 데 성공한 에디는 제일 먼저 앤에게 달려가지만 전편에서 에디의 몸에 베놈이 산다는 것을 알게 된 그녀는 새로운 연인 댄 박사(레이드 스콧)와 결혼을 선언한다. 평정심을 잃은 에디는 클리터스와의 인터뷰 중 실수로 클리터스가 새로운 빌런 카니지로 거듭나는 빌미를 제공하고 마는데..."
  popularity: number; // 9995.218
  poster_path: string; // "/1Lh9LER4xRQ3INFFi2dfS2hpRwv.jpg"
  release_date: string; // "2021-09-30"
  title: string; // "베놈 2: 렛 데어 비 카니지"
  video: boolean; // false
  vote_average: number; // 7.2
  vote_count: number; // 4635
}
export interface IMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function fetchMoviesNowPlaying(): Promise<IMovies> {
  return fetch(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=ko-KR&page=1`
  ).then((res) => res.json());
}

export function fetchMoviesLatest(): Promise<IMovies> {
  return fetch(
    `${TMDB_BASE_URL}/movie/latest?api_key=${TMDB_API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}

export function fetchMoviesTopRated(): Promise<IMovies> {
  return fetch(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=ko-KR&page=1`
  ).then((res) => res.json());
}

export function fetchMoviesUpcoming(): Promise<IMovies> {
  return fetch(
    `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=ko-KR&page=1`
  ).then((res) => res.json());
}

export interface ITVShows {
  page: number; // 1
  results: ITVShow[]; // (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  total_pages: number; // 39
  total_results: number; // 768
}
export interface ITVShow {
  backdrop_path: string; // "/1R68vl3d5s86JsS2NPjl8UoMqIS.jpg"
  first_air_date: string; //j "2021-11-24"
  genre_ids: number[]; // [10759, 18]
  id: number; // 88329
  name: string; // "Hawkeye"
  origin_country: string[]; // ['US']
  original_language: string; // "en"
  original_name: string; //"Hawkeye"
  overview: string; //"Former Avenger Clint Barton has a seemingly simple mission: get back to his family for Christmas. Possible? Maybe with the help of Kate Bishop, a 22-year-old archer with dreams of becoming a superhero. The two are forced to work together when a presence from Barton’s past threatens to derail far more than the festive spirit."
  popularity: number; //3243.761
  poster_path: string; //"/pqzjCxPVc9TkVgGRWeAoMmyqkZV.jpg"
  vote_average: number; //8.5
  vote_count: number; // 912
}

export function fetchTVShowsAiringToday(): Promise<ITVShows> {
  return fetch(
    `${TMDB_BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}&language=ko-KR&page=1`
  ).then((res) => res.json());
}

export function fetchTVShowsLatest(): Promise<ITVShows> {
  return fetch(
    `${TMDB_BASE_URL}/tv/latest?api_key=${TMDB_API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}

export function fetchTVShowsPopular(): Promise<ITVShows> {
  return fetch(
    `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=ko-KR&page=1`
  ).then((res) => res.json());
}

export function fetchTVShowsTopRated(): Promise<ITVShows> {
  return fetch(
    `${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=ko-KR&page=1`
  ).then((res) => res.json());
}

export interface ISearchResults {
  page: number;
  results: ISearchResult[];
  total_pages: number; // 34,
  total_results: number; // 662
}

export enum SearchResultMediaType {
  MOVIE = 'movie',
  TV = 'tv',
  PERSON = 'person',
}

export interface ISearchResult {
  adult: boolean; // false,
  backdrop_path: string; // "/jtVl3nN5bJ4t7pgakLfGJmOrqZm.jpg",
  genre_ids: number[]; // [878, 12]
  id: number; // 438631,
  media_type: 'movie' | 'tv' | 'person';
  original_language: string; // "en",
  original_title: string; // "Dune",
  overview: string; //  "10191년, 아트레이데스 가문의 후계자인 폴은 시간과 공간을 초월해 과거와 미래를 모두 볼 수 있고, 더 나은 미래를 만들 유일한 구원자인 예지된 자의 운명을 타고났다. 그리고 어떤 계시처럼 매일 꿈에서 아라키스의 행성에 있는 한 여인을 만난다. 귀족들이 지지하는 아트레이데스 가문에 대한 황제의 질투는 폴과 그 일족들을 죽음이 기다리는 아라키스로 이끄는데...",
  popularity: number; // 1162.646,
  poster_path: string; // "/Dtwad1HQv3jc2f54QQQHJ1VZ1W.jpg",
  release_date: string; // "2021-09-15",
  title: string; // "듄",
  video: boolean; // false,
  vote_average: number; // 7.9,
  vote_count: number; // 4837
}

export function fetchSearchResults(keyword: string): Promise<ISearchResults> {
  return fetch(
    `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=ko-KR&query=${keyword}&page=1&include_adult=false`
  ).then((res) => res.json());
}

export interface IMovieDetail {
  adult: boolean; // false
  backdrop_path: string; // '/kOJHfBhGCeBjLjAWw2SHLAztlmf.jpg';
  belongs_to_collection: null;
  budget: number; // 2540800;
  genres: {
    id: number; // 35;
    name: string; // '코미디';
  }[];
  homepage: string; // '';
  id: number; // 872;
  imdb_id: string; //  'tt0045152';
  original_language: string; //  'en';
  original_title: string; //  "Singin' in the Rain";
  overview: string; //  '아마츄어 쇼 코미디언인 돈 록우드(진 켈리)와 코스모(도날드 오코너)는 공연을 하며 이곳저곳을 떠돌아다니다 뜻대로 되지않자 새 일자리를 얻기위해 헐리우드로 온다. 그런데 우연찮게 돈 록우드는 마뉴멘탈 영화사의 스턴트맨 역을 따내게 되고, 당시 최고의 인기를 누리고 있던 여배우인 리나 레이먼트(쟌 하겐)와 함께 다수의 영화에 출연함으로써 단연 스타로 급부상하게 된다. 그러나 화려한 영광도 잠시, 헐리웃 영화계가 무성영화에서 유성영화 체제로 전환됨으로써 목소리 연기가 너무나 형편없는 리나 레이먼트 때문에 영화를 완전히 망치게 되는데...';
  popularity: number; // 21.203;
  poster_path: string; // '/w03EiJVHP8Un77boQeE7hg9DVdU.jpg';
  production_companies: {
    id: number; // 21;
    logo_path: string; //  '/aOWKh4gkNrfFZ3Ep7n0ckPhoGb5.png';
    name: string; //  'Metro-Goldwyn-Mayer';
    origin_country: string; // 'US';
  }[];
  production_countries: {
    iso_3166_1: string; //  'US';
    name: string; //  'United States of America';
  }[];
  release_date: string; //  '1952-04-09';
  revenue: number; // 7200000;
  runtime: number; // 102;
  spoken_languages: {
    english_name: string; //  'English';
    iso_639_1: string; //  'en';
    name: string; //  'English';
  }[];
  status: string; //  'Released';
  tagline: string; //  '영화 역사상 가장 유쾌하고 사랑스러운 뮤지컬 영화';
  title: string; //  '사랑은 비를 타고';
  video: boolean; // false;
  vote_average: number; // 8.2;
  vote_count: number; // 2286;
}

export function fetchMovieDetail(movieId: number): Promise<IMovieDetail> {
  return fetch(
    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}

export interface ITVShowDetail {
  backdrop_path: string; // '/36bfPmS0daIxWmFq4amefos5GeP.jpg';
  created_by: {
    id: number; // 3353842;
    credit_id: string; // '61c0db8ba84ff7004180721a';
    name: string; // 'Kreetta Onkeli';
    gender: number; // 0;
    profile_path: null;
  }[];
  episode_run_time: number[]; // [];
  first_air_date: string; // '2006-10-16';
  genres: {
    id: number; // 18;
    name: string; // '드라마';
  }[];
  homepage: string; // '';
  id: number; // 153854;
  in_production: boolean; // true;
  languages: string[]; // ['fi'];
  last_air_date: string; // '2006-10-30';
  last_episode_to_air: {
    air_date: string; // '2006-10-30';
    episode_number: number; // 3;
    id: number; // 3401428;
    name: string; // '';
    overview: string; // '';
    production_code: string; // '';
    season_number: number; // 1;
    still_path: string; // '/qc2qqVDFTmFFS1aqKq2JEne90SW.jpg';
    vote_average: number; // 0;
    vote_count: number; // 0;
  };
  name: string; // 'Ilonen talo';
  next_episode_to_air: null;
  networks: {
    name: string; // 'Yle Areena';
    id: number; // 2594;
    logo_path: string; // '/vxp8LTTXwGFrzNM7zSgzl4DfSad.png';
    origin_country: string; // 'FI';
  }[];
  number_of_episodes: number; // 3;
  number_of_seasons: number; // 1;
  origin_country: string[]; // ['FI'];
  original_language: string; // 'fi';
  original_name: string; // 'Ilonen talo';
  overview: string; // '';
  popularity: number; // 0;
  poster_path: string; // '/dPDruOyrLgcDe9A20yUhF8nir2w.jpg';
  production_companies: {
    id: number; // 440;
    logo_path: string; // '/z10otS2BrUXXlIH5zGBP5dnhTPe.png';
    name: string; // 'Kinoproduction';
    origin_country: string; // 'FI';
  }[];
  production_countries: any[]; // [];
  seasons: {
    air_date: string; // '2006-10-16';
    episode_count: number; // 3;
    id: number; // 236623;
    name: string; // '시즌 1';
    overview: string; // '';
    poster_path: string; // '/dPDruOyrLgcDe9A20yUhF8nir2w.jpg';
    season_number: number; // 1;
  }[];
  spoken_languages: {
    english_name: string; // 'Finnish';
    iso_639_1: string; // 'fi';
    name: string; // 'suomi';
  }[];
  status: string; // 'Returning Series';
  tagline: string; // '';
  type: string; // 'Scripted';
  vote_average: number; // 0;
  vote_count: number; // 0;
}

export function fetchTVShowDetail(tvShowId: number): Promise<ITVShowDetail> {
  return fetch(
    `${TMDB_BASE_URL}/tv/${tvShowId}?api_key=${TMDB_API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}
