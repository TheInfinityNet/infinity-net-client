export type ValidationErrors<T> = {
  [K in keyof T]?: string[];
};

export type Metadata = {
  pagination: {
    offset: number;
    limit: number;
    previousOffset: number;
    nextOffset: number;
    currentPage: number;
    pageCount: number;
    totalCount: number;
  };
};
