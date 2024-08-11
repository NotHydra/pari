export interface QueryOptionsInterface {
    take?: number;
    skip?: number;
    orderBy?: {
        [key: string]: "asc" | "desc";
    };
}
