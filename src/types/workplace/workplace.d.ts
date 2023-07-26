export enum WorkplaceStatus {
    "ON",
    "OFF",
    "UPCOMING"
}

export interface WorkplaceBody {
    name: string,
    address: string,
    status: WorkplaceStatus,
    workplace_code: string,
    image: string
}