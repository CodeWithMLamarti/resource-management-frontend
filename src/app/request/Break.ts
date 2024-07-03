import {UserDto} from "../response/UserDto";

export class Break {
    id?: number;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
    user: UserDto;
    breakType: string;
    hrApproved: boolean = false;
    managerApproved: boolean = false;

    constructor(startDate: string, endDate: string, reason: string, status: string, user: UserDto, breakType: string) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
        this.status = status;
        this.user = user;
        this.breakType = breakType;
    }
}
