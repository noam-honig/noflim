export interface Monumentlist {
    uuid: string;
    legacy_id: string;
    name: string;
    place: string;
}

export interface Data {
    unit: string;
    unit_code: number;
    cemetery_name: string;
    age: string;
    uuid: string;
    full_name: string;
    first_name: string;
    last_name: string;
    has_life_story: boolean;
    decorations: any[];
    decorations_content?: any;
    rank: string;
    gender: string;
    mother_name: string;
    father_name: string;
    legacy_id: string;
    death_date_year: number;
    death_date_month: number;
    death_date: string;
    death_date_hebrew: string;
    death_date_day_and_month_hebrew: string;
    religion: string;
    life_story: string;
    grave_number?: any;
    grave_row_number?: any;
    grave_plot?: any;
    grave_area?: any;
    monumentlist: Monumentlist[];
    life_story_html: string;
    is_mia: boolean;
    is_last_of_kin: boolean;
    is_short_life_story: boolean;
    service_type: string;
    service_org: string;
    has_image: boolean;
    has_gvilim: boolean;
    has_monument: boolean;
    cemetery_code: string;
    cemetery_type: string;
    cemetery_hierarchy?: any;
    grave_location_image: string;
    path_to_helka_img_filename?: any;
    parchments?: any;
    name_image: string;
}

export interface RootObject {
    data: Data;
}
