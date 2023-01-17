export interface DefaultInterface {
    standard: string;
}

export interface UserInterface {
    id: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    created_at: string;
}

export interface PlaceData {
    place_id: string;
    user_id: string;
    description: string;
    longitude: string;
    latitude: string;
    created_at: string;
    deleted_at?: string;
}
