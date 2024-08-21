export type ValidationErrors<T> = {
  [K in keyof T]?: string[];
};

export type Pagination = {
  offset: number;
  limit: number;
  previousOffset: number | null;
  nextOffset: number | null;
  currentPage: number;
  pageCount: number;
  totalCount: number;
};

export type Metadata = {
  pagination: Pagination;
};
