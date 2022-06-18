import { IComparator, TArticles } from '../types';

const makeTopFeed = (
  articles: TArticles,
  qty: number,
) : TArticles => articles.slice(0, qty ?? 5);

export default makeTopFeed;
