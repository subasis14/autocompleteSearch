export interface AutoCompleteSearchDataProps {
  id: string;
  summary: string;
}

export interface SuggestionListItemProps {
  book_title?: string;
  book_summary?: string;
  book_author?: string;
}

export interface AuthorDataProps {
  book_id: string;
  author: string;
}
