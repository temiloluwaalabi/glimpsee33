"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authService, UserQuery } from "@/lib/api/api";
import { ApiError } from "@/lib/api/api-client";
import { handleMutationError } from "@/lib/query/handle-mutation-error";
import { LoginSchemaType, RegisterSchemaType } from "@/lib/validations";
import { useAppStore } from "@/store/use-app-store";
import { User } from "@/types";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    login: LoginStore,
    logout: LogoutStore,
  } = useAppStore();

  //   Check is user is isAuthenticated
  const { isLoading: isCheckingAuth } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.getCurrentUser,
    enabled: !user && isAuthenticated,
  });

  const useLoginMutation = () => {
    const router = useRouter();

    return useMutation({
      mutationKey: ["auth", "login"],
      mutationFn: async (credentials: LoginSchemaType) => {
        const result = await authService.login(credentials);
        if (ApiError.isApiError(result)) {
          console.log("Error detected in mutation, throwing:", result);
          throw result; // Throw the error so React Query will catch it in onError
        }
        return result;
      },
      onSuccess: (response) => {
        const user = response.rawResponse?.user as Partial<User>;

        LoginStore(user);
        queryClient.setQueryData(["auth", "me"], user);

        toast.success(
          typeof response?.message === "string"
            ? response.message
            : "Login successful!"
        );
        router.push("/");
      },
      onError: handleMutationError,
    });
  };

  // Registration mutation
  const useRegisterMutation = () => {
    const router = useRouter();
    return useMutation({
      mutationKey: ["auth", "register"],
      mutationFn: async (credentials: RegisterSchemaType) => {
        const result = await authService.register(credentials);
        if (ApiError.isApiError(result)) {
          console.log("Error detected in mutation, throwing:", result);
          throw result; // Throw the error so React Query will catch it in onError
        }
        return result;
      },
      onSuccess: (response) => {
        const user = response.rawResponse?.user as Partial<User>;
        LoginStore(user);
        queryClient.setQueryData(["auth", "me"], user);
        toast.success(
          typeof response?.message === "string"
            ? response.message
            : "Login successful!"
        );
        router.push("/");
      },
      onError: handleMutationError,
    });
  };

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      LogoutStore();
      queryClient.clear();
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: () => {
      // Force logout even if API call fails
      LogoutStore();
      queryClient.clear();
      router.push("/login");
    },
  });

  const useUsers = (query: Partial<UserQuery> = {}) => {
    return useQuery({
      queryKey: ["users", query],
      queryFn: async () => {
        const result = await authService.getUsers(query);

        if (ApiError.isApiError(result)) {
          console.log("Error detected in query, throwing", result);
          throw result;
        }

        return result;
      },
      staleTime: 5 * 60 * 1000,
    });
  };
  return {
    user,
    useUsers,
    isAuthenticated,
    useLoginMutation,
    isLoading: isCheckingAuth || logoutMutation.isPending,
    logout: logoutMutation.mutate,
    useRegisterMutation,
  };
};
