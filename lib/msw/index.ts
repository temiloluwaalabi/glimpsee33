export const enableMocking = async () => {
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    try {
      const { worker } = await import("./browser");

      await worker.start({
        onUnhandledRequest: "bypass",
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
      });

      console.log("🔶 MSW enabled");
    } catch (error) {
      console.error("Failed to start MSW:", error);
    }
  }
};
