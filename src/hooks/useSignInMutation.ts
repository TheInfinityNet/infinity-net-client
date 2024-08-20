import { useApiClient } from "@/contexts/api-client.context";
import { useToken } from "@/contexts/token.context";
import { SignInInput } from "@/types/auth.type";
import { useMutation } from "react-query";

export function useSignInMutation() {
  const { authService } = useApiClient();
  const { setAccessToken, setRefreshToken } = useToken();

  return useMutation({
    mutationFn: (data: SignInInput) => authService().signIn(data),
    mutationKey: "signIn",
    onSuccess(data) {
      const { tokens } = data.data;
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
    },
  });
}
