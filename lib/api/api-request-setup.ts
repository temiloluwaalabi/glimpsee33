/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from "axios";

import { ApiResponse } from "@/types";

import { apiClient, ApiError } from "./api-client";
import logger from "../logger";

export interface ErrorResponse {
  data?: {
    message?: string | string[];
    error?: Record<string, string[]> | string;
  };
  message?: string | string[];
  error?: string;
  statusCode?: number;
  status?: number;
  details?: Record<string, string[] | string>;
}

/**
 * Handles API errors and converts them to ApiError instances
 * @param error Any type of error that needs to be processed
 * @returns ApiError instance with normalized error information
 */
export const handleApiBackendError = (error: unknown): ApiError => {
  // Already an ApiError
  if (error instanceof ApiError) {
    return error;
  }

  // Axios error
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const status = axiosError.response?.status ?? 500;
    const responseData = axiosError.response?.data;

    // Validation errors in data.error
    if (responseData?.data?.error) {
      const invalidFields = responseData.data.error;
      const invalidMessages: string[] = [];
      let rawErrors: Record<string, unknown> = {};

      if (typeof invalidFields === "object" && invalidFields !== null) {
        rawErrors = invalidFields;
        for (const [field, messages] of Object.entries(invalidFields)) {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => invalidMessages.push(`${field}: ${msg}`));
          } else if (typeof messages === "string") {
            invalidMessages.push(`${field}: ${messages}`);
          }
        }
      } else if (typeof invalidFields === "string") {
        invalidMessages.push(invalidFields);
      }

      return new ApiError({
        statusCode: status,
        messages:
          invalidMessages.length > 0 ? invalidMessages : ["Validation failed"],
        errorType: "VALIDATION_ERROR",
        rawErrors,
        cause: error,
        context: { responseData },
      });
    }

    // Validation errors in details
    if (responseData?.details && typeof responseData.details === "object") {
      const invalidMessages: string[] = [];
      Object.entries(responseData.details).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg) => invalidMessages.push(`${field}: ${msg}`));
        } else if (typeof messages === "string") {
          invalidMessages.push(`${field}: ${messages}`);
        }
      });
      if (invalidMessages.length > 0) {
        return new ApiError({
          statusCode: status,
          messages: invalidMessages,
          errorType: "VALIDATION_ERROR",
          rawErrors: responseData.details,
          cause: error,
          context: { responseData },
        });
      }
    }

    // Standard error message
    const errorMessage = responseData?.message
      ? Array.isArray(responseData.message)
        ? responseData.message
        : [responseData.message]
      : [`Failed to process request. Status: ${status}`];

    // Error type by status
    let errorType = "API_ERROR";
    if (status === 400) errorType = "VALIDATION_ERROR";
    else if (status === 401) errorType = "AUTH_ERROR";
    else if (status === 403) errorType = "FORBIDDEN_ERROR";
    else if (status === 404) errorType = "NOT_FOUND_ERROR";
    else if (status === 429) errorType = "RATE_LIMIT_ERROR";
    else if (status >= 500) errorType = "SERVER_ERROR";

    return new ApiError({
      statusCode: responseData?.statusCode ?? status,
      messages: errorMessage,
      errorType,
      rawErrors: responseData as Record<string, unknown>,
      cause: error,
      context: { responseData },
    });
  }

  // Error-like object (possibly backend error)
  if (typeof error === "object" && error !== null) {
    const errorObj = error as Record<string, any>;
    const statusCode = errorObj.statusCode ?? errorObj.status ?? 500;

    // Try to extract messages
    let messages: string[] = [];
    if (errorObj.message) {
      messages = Array.isArray(errorObj.message)
        ? errorObj.message
        : [errorObj.message];
    } else if (errorObj.error && typeof errorObj.error === "string") {
      messages = [errorObj.error];
    } else {
      messages = ["An error occurred"];
    }

    // Error type by status
    let errorType = "API_ERROR";
    if (statusCode === 400) errorType = "VALIDATION_ERROR";
    else if (statusCode === 401) errorType = "AUTH_ERROR";
    else if (statusCode === 403) errorType = "FORBIDDEN_ERROR";
    else if (statusCode === 404) errorType = "NOT_FOUND_ERROR";
    else if (statusCode === 429) errorType = "RATE_LIMIT_ERROR";
    else if (statusCode >= 500) errorType = "SERVER_ERROR";

    // Validation errors in details
    if (errorObj.details && typeof errorObj.details === "object") {
      const invalidMessages: string[] = [];
      Object.entries(errorObj.details).forEach(([field, fieldMessages]) => {
        if (Array.isArray(fieldMessages)) {
          fieldMessages.forEach((msg) =>
            invalidMessages.push(`${field}: ${msg}`)
          );
        } else if (typeof fieldMessages === "string") {
          invalidMessages.push(`${field}: ${fieldMessages}`);
        }
      });
      if (invalidMessages.length > 0) {
        return new ApiError({
          statusCode,
          messages: invalidMessages,
          errorType: "VALIDATION_ERROR",
          rawErrors: errorObj.details,
          context: { errorObj },
        });
      }
    }

    // Compose rawErrors
    const rawErrors: Record<string, unknown> = {};
    if (errorObj.details) rawErrors.details = errorObj.details;
    if (errorObj.rawErrors) Object.assign(rawErrors, errorObj.rawErrors);

    return new ApiError({
      statusCode,
      messages,
      errorType,
      rawErrors: Object.keys(rawErrors).length > 0 ? rawErrors : undefined,
      context: { errorObj },
    });
  }

  // Standard JS Error
  if (error instanceof Error) {
    return new ApiError({
      statusCode: 500,
      messages: error.message || "An unknown error occurred",
      errorType: "GENERIC_ERROR",
      cause: error,
    });
  }

  // Unknown error
  return new ApiError({
    statusCode: 500,
    messages: "An unknown error occurred",
    errorType: "UNKNOWN_ERROR",
  });
};

type ApiRequestBody = FormData | Record<string, any> | undefined;

interface MakeApiRequestOptions {
  params?: Record<string, string | number | boolean>;
  pathname?: string;
  body?: ApiRequestBody;
  dataKey?: string | string[]; // optional
}
// Helper function to safely extract nested data
const extractNestedData = (obj: any, path: string | string[]): any => {
  if (typeof path === "string") {
    return obj?.[path];
  }

  return path.reduce((current, key) => current?.[key], obj);
};
export const makeApiRequest = async <T>(
  endpoint: string,
  method: "POST" | "GET",
  options: MakeApiRequestOptions = {}
): Promise<
  | {
      success: boolean;
      status: number;
      message?: string;
      data?: T;
      rawResponse?: any;
    }
  | ApiError
> => {
  const { body, params, dataKey = "data" } = options;

  try {
    logger.info(`Making purchase request to ${endpoint}`, {
      endpoint,
      method,
      bodyType: body instanceof FormData ? "FormData" : typeof body,
      bodyKeys:
        body instanceof FormData ? [...body.keys()] : Object.keys(body || {}),
      params: params || {},
    });

    let response: AxiosResponse<ApiResponse<T>>;

    if (method === "GET") {
      response = await apiClient.get(endpoint, {
        params,
      });
    } else {
      const isFormData = body instanceof FormData;

      if (isFormData) {
        // Check if FormData contains files
        let hasFiles = false;
        body.forEach((value: any) => {
          if (
            typeof value === "object" &&
            value !== null &&
            (value instanceof File || value instanceof Blob)
          ) {
            hasFiles = true;
          }
        });

        if (!hasFiles) {
          // Convert FormData to object for specific endpoints when no files
          const formDataObj: Record<string, any> = {};
          body.forEach((value, key) => {
            // // Special handling for recipient field - parse JSON string into object
            // if (
            //   key === "recipient" &&
            //   typeof value === "string" &&
            //   value.startsWith("{")
            // ) {
            //   try {
            //     formDataObj[key] = JSON.parse(value);
            //   } catch {
            //     formDataObj[key] = value; // Keep as string if parsing fails
            //   }
            // } else {
            //   formDataObj[key] = value;
            // }
            formDataObj[key] = value;
          });
          console.log(
            "Converted FormData to object with parsed fields:",
            formDataObj
          );

          response = await apiClient.post<ApiResponse<T>>(
            endpoint,
            formDataObj,
            {
              headers: { "Content-Type": "application/json" },
              params,
            }
          );
        } else {
          // For FormData with files or other endpoints - keep as multipart/form-data
          response = await apiClient.post<ApiResponse<T>>(endpoint, body, {
            headers: { "Content-Type": "multipart/form-data" },
            params,
          });
        }
      } else {
        // Regular JSON data
        response = await apiClient.post<ApiResponse<T>>(endpoint, body, {
          params,
        });
      }
    }

    const data = response.data;

    if (data.success === false) {
      return new ApiError({
        statusCode: response.status || 500,
        messages: Array.isArray(data.message)
          ? data.message
          : [data.message || "Unknown error occurred"],
        errorType: "API_ERROR",
        rawErrors: data as unknown as Record<string, unknown>,
      });
    }

    const extractedData = extractNestedData(data, dataKey);

    return {
      success: true,
      status: response.status || 200,
      message: data.message || "Request Completed Successfully",
      data: extractedData as T,
      rawResponse: data,
    };
  } catch (error) {
    logger.error(`Error in ${endpoint}:`, error);
    return handleApiBackendError(error);
  }
};
