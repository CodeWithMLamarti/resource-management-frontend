export class UserUpdateDto {
    id: number;
    firstName: string;
    lastName: string;
    serialNumber: number;
    email: string;
    password: string;
    phone: string;
    job: string;
    role: string;


    constructor(id: number, firstName: string, lastName: string, serialNumber: number, email: string, password: string, phone: string, job: string, role: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.serialNumber = serialNumber;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.job = job;
        this.role = role;
    }
}