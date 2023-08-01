enum StatusWP {
    "ON", "OFF", "UPCOMING"
}

export interface UpdateWorkplaceDto {
    name?: string,
    address?: string,
    status?: StatusWP,
    workplace_code?: string
}