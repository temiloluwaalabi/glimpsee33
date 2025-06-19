/* eslint-disable @typescript-eslint/no-explicit-any */
import pino from "pino";

const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    !isEdge && !isProduction
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:standard",
          },
        }
      : undefined,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
  serializers: {
    error: pino.stdSerializers.err,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: ["password", "token", "authorization"],
});

// Add custom methods for different log levels
export const log = {
  debug: (message: string, data?: any) => {
    logger.debug(data, message);
  },
  info: (message: string, data?: any) => {
    logger.info(data, message);
  },
  warn: (message: string, data?: any) => {
    logger.warn(data, message);
  },
  error: (message: string, error?: Error | any) => {
    logger.error(error, message);
  },
  fatal: (message: string, error?: Error | any) => {
    logger.fatal(error, message);
  },
  // Custom analytics logging
  analytics: (event: string, properties?: Record<string, any>) => {
    logger.info({ event, properties, type: "analytics" }, "Analytics Event");
  },
  // Custom API logging
  api: (
    method: string,
    url: string,
    status: number,
    duration: number,
    data?: any
  ) => {
    logger.info(
      { method, url, status, duration, data, type: "api" },
      `API ${method} ${url} - ${status} (${duration}ms)`
    );
  },
  // Custom performance logging
  performance: (
    action: string,
    duration: number,
    metadata?: Record<string, any>
  ) => {
    logger.info(
      { action, duration, metadata, type: "performance" },
      `Performance: ${action} took ${duration}ms`
    );
  },
  // Custom user action logging
  userAction: (
    action: string,
    userId?: string,
    metadata?: Record<string, any>
  ) => {
    logger.info(
      { action, userId, metadata, type: "user_action" },
      `User Action: ${action}`
    );
  },
};

export default logger;
