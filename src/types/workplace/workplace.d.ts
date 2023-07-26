export enum WorkplaceStatus {
    "ON",
    "OFF",
    "UPCOMING"
}

export interface WorkplaceBody {
    name: string,
    address: string,
    status: WorkplaceBody,
    workplace_code: string,
    image: string
}