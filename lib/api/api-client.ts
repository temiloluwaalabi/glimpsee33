import axios, { AxiosError, AxiosInstance } from "axios";

const isDevelopment = process.env.NODE_ENV === "development";

export class ApiError extends Error {
  readonly statusCode: number;
  readonly errorType: string;
  readonly rawErrors?: Record<string, unknown>;
  readonly isError: boolean = true;
  readonly timestamp: string;
  readonly cause?: Error;
  readonly context?: Record<string, unknown>;

  constructor(response: {
    statusCode: number;
    messages: string | string[];
    errorType?: string;
    rawErrors?: Record<string, unknown>;
    cause?: Error;
    context?: Record<string, unknown>;
  }) {
    const messages = Array.isArray(response.messages)
      ? response.messages
      : [response.messages];
    const finalMessage = messages.join("; ");
    super(
      finalMessage ||
        `API Error: ${response.statusCode} - ${response.errorType}`
    );
    this.name = "ApiError";
    this.statusCode = response.statusCode;
    this.errorType = response.errorType || "API_ERROR";
    this.rawErrors = response.rawErrors;
    this.timestamp = new Date().toISOString();
    this.cause = response.cause;
    this.context = response.context;

    Object.defineProperty(this, "message", {
      value: finalMessage,
      enumerable: true,
      writable: true,
      configurable: true,
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      errorType: this.errorType,
      rawErrors: this.rawErrors,
      isError: true,
      timestamp: this.timestamp,
      cause: this.cause
        ? { message: this.cause.message, name: this.cause.name }
        : undefined,
      context: this.context,
    };
  }

  log() {
    // Simple standardized logging
    console.error(
      `[${this.timestamp}] [${this.statusCode}] ${this.errorType}: ${this.message}`
    );
  }

  static isApiError(obj: unknown): boolean {
    return (
      obj instanceof ApiError ||
      (typeof obj === "object" &&
        obj !== null &&
        "isError" in obj &&
        (obj as any).isError === true)
    );
  }

  static markAsError(error: unknown): Record<string, any> {
    if (error instanceof ApiError) {
      return {
        ...error,
        isError: true,
        statusCode: error.statusCode,
        errorType: error.errorType,
        message: error.message,
        rawErrors: error.rawErrors,
        timestamp: error.timestamp,
        context: error.context,
      };
    }
    if (error instanceof Error) {
      return {
        isError: true,
        name: "ApiError",
        message: error.message,
        statusCode: 500,
        errorType: "GENERIC_ERROR",
        stack: error.stack,
        timestamp: new Date().toISOString(),
      };
    }
    return {
      isError: true,
      name: "ApiError",
      message: String(error || "Unknown error occurred"),
      statusCode: 500,
      errorType: "UNKNOWN_ERROR",
      timestamp: new Date().toISOString(),
    };
  }
}

export interface ApiErrorResponse {
  name: string;
  message: string;
  statusCode: number;
  errorType: string;
  rawErrors?: Record<string, unknown>;
  isError: true;
  timestamp: string;
  cause?: { message: string; name: string };
  context?: Record<string, unknown>;
}

const BASE_CONFIG = {
  timeout: 15000, // 15 seconds
  headers: {
    // "Content-Type": "application/json",
    Accept: "*/*",
  },
  withCredentials: true,
  maxBodyLength: 20 * 1024 * 1024, // 20MB
  maxContentLength: 20 * 1024 * 1024, // 20MB
};

export const apiClient: AxiosInstance = axios.create({
  ...BASE_CONFIG,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const setAuthToken = (token: string | null): void => {
  const bearerToken = token ? `Bearer ${token}` : null;

  if (bearerToken) {
    apiClient.defaults.headers.common.Authorization = bearerToken;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

// Error handler
const handleApiError = (error: AxiosError<unknown>) => {
  // Handle cases where there is no response (e.g., network errors)
  if (!error.response) {
    let statusCode = 500;
    let message = "An unknown error occurred. Please try again later.";

    if (error.code === "ECONNABORTED") {
      statusCode = 408;
      message = "Request timed out. Please try again.";
    } else if (error.message.includes("Network Error")) {
      message = "Network error. Please check your connection.";
    }

    return Promise.reject(
      new ApiError({
        statusCode,
        messages: message,
        errorType: "NETWORK_ERROR",
        cause: error,
        context: { code: error.code, config: error.config },
      })
    );
  }

  // Extract response details
  const { status, data } = error.response as {
    status: number;
    data: Partial<ApiErrorResponse> & Record<string, any>;
  };

  // Try to extract messages from known fields
  let errorMessages: string[] = [];
  if (data?.message) {
    errorMessages = Array.isArray(data.message)
      ? data.message.filter((msg: unknown) => typeof msg === "string")
      : [typeof data.message === "string" ? data.message : "An error occurred"];
  } else if (data?.error) {
    errorMessages = Array.isArray(data.error)
      ? data.error.filter((err: unknown) => typeof err === "string")
      : [typeof data.error === "string" ? data.error : "An error occurred"];
  } else {
    errorMessages = ["An unexpected error occurred"];
  }

  // Build ApiError using all available fields from ApiErrorResponse
  return Promise.reject(
    new ApiError({
      statusCode: data?.statusCode ?? status,
      messages: errorMessages,
      errorType: data?.errorType || "API_ERROR",
      rawErrors: data?.rawErrors,
      cause: error,
      context: {
        responseData: data,
        headers: error.response?.headers,
        config: error.config,
      },
    })
  );
};

/**
 * Handles successful API responses.
 * Returns the response data directly, or wraps it if needed.
 */
const handleApiSuccess = <T = any>(response: { data: T }) => {
  return response.data;
};

apiClient.interceptors.request.use(
  (config) => {
    if (isDevelopment) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(config), 800);
      });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  handleApiSuccess,
  async (error: AxiosError<ApiError>) => {
    return handleApiError(error);
  }
);
