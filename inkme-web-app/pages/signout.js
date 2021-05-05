import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignOut() {
  const { signOut } = useAuth();
  const { push } = useRouter();
  useEffect(() => signOut().then(() => push("/sign-in")));
  return <></>;
}
