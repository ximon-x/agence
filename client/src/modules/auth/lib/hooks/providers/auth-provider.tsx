"use client";

import { GetUserParams, GetUserResponse, User } from "@/lib/types";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user?: User;
};

export const AuthContext = createContext<AuthContextType>({});

type Props = {
  getUser: (params: GetUserParams) => Promise<Error | GetUserResponse>;
  children: React.ReactNode;
  userId: string;
};

export function AuthProvider(props: Props) {
  const { userId, getUser, children } = props;

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => await getUser({ id: userId });
    fetchUser().then((user) => {
      if (user instanceof Error) {
        console.error(user.message);
        return;
      }

      setUser(user.data);
    });
  }, [userId, getUser]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
