export const enableMocking = async () => {
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    const { worker } = await import("./browser");

    await worker.start({
      onUnhandledRequest: "bypass",
    });
    console.log("🔶 MSW enabled");
  }
};
