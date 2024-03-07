export interface AutoCompleteSearchDataProps {
  id: number;
  summary: string;
}

export interface cardListItemProps {
  id: number;
  book_title: string;
  book_summary: string;
  book_author: string;
}

export interface AuthorDataProps {
  book_id: number;
  author: string;
}

interface SummariesProps {
  id: number;
  summary: string;
}
interface AuthorProps {
  book_id: number;
  author: string;
}

export interface RootState {
  search: {
    payload: {
      titles: string[];
      queries: string[];
      summaries: Array<SummariesProps>;
      authors: Array<AuthorProps>;
    };
  };
}
