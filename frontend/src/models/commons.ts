export interface Paginated<T>{
    items: T[]
    pageSize: number
    pageNumber: number
    totalPages: number
    totalItemsCount: number
}

export interface PaginationQuery {
    pageSize: number
    pageNumber: number
}