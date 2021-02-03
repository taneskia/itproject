export class RegisterRequest {
    Name: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Role: Role;
    ImageUrl: string;
    Address: string;
}

enum Role {
    Buyer,
    Freelancer,
    Market,
}
