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
