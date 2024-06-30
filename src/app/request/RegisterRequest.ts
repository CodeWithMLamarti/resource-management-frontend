export class RegisterRequest {
    private firstName: string;

    private lastName: string;

    private serialNumber: number;

    private email: string;

    private password: string;

    private phone: string;

    private job: string;

    private role: string;

    constructor(firstName: string, lastName: string, serialNumber: number, email: string, password: string, phone: string, job: string, role: string) {
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