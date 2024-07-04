import {UserDto} from "../response/UserDto";

export class DocDto {
    id?: number;
    docType: string;
    user: UserDto;
    requestedAt: string;

    constructor(docType: string, user: UserDto) {
        this.docType = docType;
        this.user = user;
    }
}