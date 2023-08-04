export enum WorkplaceStatus {
    "ON",
    "OFF",
    "UPCOMING"
}

export interface UpdateWorkplaceDto {
    name?: string,
    address?: string,
    status?: WorkplaceStatus,
    workplace_code?: string,
}

export interface FindWorkplaceDto {
    _id?: string,
    name?: string,
    address?: string,
    status?: WorkplaceStatus,
    workplace_code?: string,
}