import { useContext } from "react";

import { AuthContext } from "./providers/account-provider";

export default function useAccount() {
  const { account } = useContext(AuthContext);

  return {
    account,
  };
}
