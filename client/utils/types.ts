export type SignUpData = {
  email: string;
};

export type State = {
  signUpData: SignUpData | null;
};

export type UserSsr = {
  userSsr: {
    email: string;
    role: 'hacker' | 'partner' | 'mentor';
    firstName?: string;
    lastName?: string;
    website?: string;
    github?: string;
    linkedin?: string;
    rules?: boolean;
    yearsOfExp?: number;
    ethExp?: 'beginner' | 'intermediate' | 'expert';
    motivation: (
      | 'workshop'
      | 'resume'
      | 'improve'
      | 'jobOps'
      | 'meetPpl'
      | 'launchProduct'
      | 'winPrize'
      | 'other'
    )[];
    builtBefore?: string;
    lookingToBuild?: string;
    organization?: string;
    telegram?: string;
    twitter?: string;
    otherEvents?: string;
    reasonForSupporting?: string;
    reasonForMentoring?: string;
    applicationStatus: boolean;
  };
};
