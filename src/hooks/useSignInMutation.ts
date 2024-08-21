import { useApiClient } from "@/contexts/api-client.context";
import { useAuth } from "@/contexts/auth.context";
import { useToken } from "@/contexts/token.context";
import { SignInInput } from "@/types/auth.type";
import { useMutation } from "react-query";

export function useSignInMutation() {
  const { authService } = useApiClient();
  const { setAccessToken, setRefreshToken } = useToken();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (data: SignInInput) => authService().signIn(data),
    mutationKey: "signIn",
    onSuccess(data) {
      const { tokens, user } = data.data;
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      setUser(user);
    },
  });
}
