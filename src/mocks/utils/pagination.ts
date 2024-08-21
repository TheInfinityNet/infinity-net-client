import { Pagination } from "@/types/api.type";
import _ from "lodash";

export function paginate<T>(
  totalCount: number,
  offset: number,
  limit: number,
  generateFn: () => T,
): { items: T[]; pagination: Pagination } {
  const items = _.times(Math.min(limit, totalCount - offset), generateFn);
  const nextOffset = offset + limit < totalCount ? offset + limit : null;
  const previousOffset = offset - limit >= 0 ? offset - limit : null;

  return {
    items,
    pagination: {
      offset,
      limit,
      nextOffset,
      previousOffset,
      totalCount,
      pageCount: Math.ceil(totalCount / limit),
      currentPage: Math.floor(offset / limit) + 1,
    },
  };
}
