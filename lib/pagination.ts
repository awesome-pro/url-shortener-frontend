export interface Pagination {
    page: number
    limit: number
    total: number
    total_pages: number
    has_previous: boolean
    has_next: boolean
}

export interface PaginateResponse<T> {
    data: T[]
    pagination: Pagination
}

export interface PaginateQuery {
    page: number
    limit: number
}