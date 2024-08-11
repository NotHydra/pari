import { QueryOptionsInterface } from "source/common/interface/query-options.interface";

export const queryOptions = (count: number, page: number, sortBy: string, sortOrder: string): QueryOptionsInterface => {
    const queryOptions: QueryOptionsInterface = {};

    if (count !== 0) {
        queryOptions.take = count;
    }

    if (page !== 0 && count !== 0) {
        queryOptions.skip = (page - 1) * count;
    }

    queryOptions.orderBy = {
        [sortBy]: sortOrder === "desc" ? "desc" : "asc",
    };

    return queryOptions;
};
