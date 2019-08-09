export interface IUser{
    _id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export interface IMyUser {
    exp?: number;
    iat?: number;
    id?: string;
    email?:string;
    name?: string;
}