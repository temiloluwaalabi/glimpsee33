import { mockAuthors } from "@/config/constants/mockdata";
import { User } from "@/types";

export const findUserByEmail = (email: string): User | undefined => {
  return mockAuthors.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

export const findUserById = (id: string): User | undefined => {
  return mockAuthors.find((user) => user.id === id);
};
export const validatePassword = (
  plainPassword: string,
  userPassword: string
): boolean => {
  // In a real app, you'd use bcrypt.compare()
  return plainPassword === userPassword;
};
