export class RegisterRequest {
    Name : string;
    Email : string;
    Password : string;
    ConfirmPassword : string;
    Role: Role;
}

enum Role {
    Buyer,
    Freelancer, 
    Market
}
