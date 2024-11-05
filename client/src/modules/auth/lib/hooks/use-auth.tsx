import { useContext } from "react";

import { AuthContext } from "./providers/auth-provider";

export default function UseAuth() {
  const { user } = useContext(AuthContext);

  return {
    user,
  };
}
