"use client";
import { toast } from "sonner";

import { ApiError } from "../api/api-client";

/**
 * Handles errors from API mutations, normalizing and displaying user-friendly messages.
 */
export const handleMutationError = (error: unknown) => {
  console.error("Mutation Error", error);
  // If error is already an instance of ApiError, handle it normally
  if (error instanceof ApiError) {
    const apiError = error instanceof ApiError ? error : new ApiError(error);
    processApiError(apiError);
    return;
  }
  //   // If error is an object with a statusCode, transform it into an ApiError
  //   if (typeof error === "object" && error !== null && "statusCode" in error) {
  //     const apiErrorLike = error as any;
  //     console.log("Converting error-like object to ApiError:", apiErrorLike);

  //     // Create proper ApiError with all available properties
  //     const apiError = new ApiError({
  //       statusCode: apiErrorLike.statusCode || 500,
  //       messages:
  //         apiErrorLike.message || apiErrorLike.messages || "Unknown error",
  //       errorType: apiErrorLike.errorType || "API_ERROR",
  //       rawErrors: apiErrorLike.rawErrors,
  //     });

  //     processApiError(apiError);
  //     return;
  //   }

  // Handle generic JavaScript errors (e.g., network failures)
  if (error instanceof Error) {
    toast.error(error.message || "An unexpected error occurred.");
    return;
  }
  // Handle unknown errors
  toast.error("An unknown error occurred.");
};

// Helper function to process ApiError instances
const processApiError = (error: ApiError) => {
  const { statusCode, message, rawErrors, errorType } = error;
  console.log("Processing ApiError:", {
    statusCode,
    message,
    errorType,
    rawErrors,
  });

  // Ensure message is typed as string or string[]
  const errorMessage: string =
    typeof message === "string"
      ? message
      : Array.isArray(message)
        ? (message as string[]).join("; ")
        : "An error occurred";

  switch (statusCode) {
    case 400:
      toast.error(errorMessage || "Invalid request.");
      break;
    case 401:
      toast.error(errorMessage || "Invalid credentials. Please try again.");
      break;
    case 403:
      toast.error(
        errorMessage || "You do not have permission to perform this action."
      );
      break;
    case 404:
      toast.error(errorMessage || "Resource not found.");
      break;
    case 408:
      toast.error(
        errorMessage || "Request timed out. Please try again-client."
      );
      break;
    case 422:
      if (rawErrors && typeof rawErrors === "object") {
        // Better handling of raw validation errors
        try {
          Object.entries(rawErrors).forEach(([field, errorMessages]) => {
            if (Array.isArray(errorMessages)) {
              errorMessages
                .filter((msg) => typeof msg === "string")
                .forEach((msg: string) => {
                  toast.error(`${field}: ${msg}`);
                });
            } else if (typeof errorMessages === "string") {
              toast.error(`${field}: ${errorMessages}`);
            }
          });
        } catch (error) {
          console.error("Error processing rawErrors", error);
          // Fallback if raw errors processing fails
          toast.error(
            errorMessage || "Validation failed. Please check your input."
          );
        }
      } else {
        toast.error(
          errorMessage || "Validation failed. Please check your input."
        );
      }
      break;
    case 429:
      toast.error(errorMessage || "Too many requests. Please try again later.");
      break;
    case 500:
      toast.error(errorMessage || "Server error. Please try again later.");
      break;
    default:
      toast.error(errorMessage || "An unexpected error occurred.");
  }
};
