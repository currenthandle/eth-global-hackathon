export type SignUpData = {
  email: string;
  password: string;
};

export type State = {
  signUpData: SignUpData | null;
};
