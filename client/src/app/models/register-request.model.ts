export class RegisterRequest {
  Name: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Role: Role;
  Image: string;
  Address: string;
}

enum Role {
  Buyer,
  Freelancer,
  Market,
}
