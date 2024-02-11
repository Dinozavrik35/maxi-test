type UserGeo = {
    lat: string;
    lng: string;
};

type UserAddress = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: UserGeo;
};

type UserCompany = {
    name: string;
    catchPhrase: string;
    bs: string;
};

export type UserDTO = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddress;
    phone: string;
    website: string;
    company: UserCompany;
};
