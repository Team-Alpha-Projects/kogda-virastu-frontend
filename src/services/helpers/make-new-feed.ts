import { IComparator, TArticles } from '../types';

const makeNewFeed = (
  articles: TArticles,
  compareFunction: IComparator,
  qty: number,
) : TArticles => articles.slice().sort(compareFunction).slice(0, qty ?? 5);

export default makeNewFeed;
