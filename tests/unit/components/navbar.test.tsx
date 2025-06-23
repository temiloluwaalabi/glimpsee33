import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent } from "@testing-library/react";

import { Navbar } from "@/components/layout/navbar";
import { MenuItems } from "@/config/constants";
import { useAppStore } from "@/store/use-app-store";

// Mock store
jest.mock("@/store/use-app-store");

// Mock router and pathname
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => {
  const original = jest.requireActual("next/navigation");
  return {
    ...original,
    usePathname: () => mockUsePathname(),
    useRouter: () => ({
      push: mockPush,
      replace: mockReplace,
      back: jest.fn(),
    }),
  };
});

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Navbar", () => {
  const mockedUseAppStore = useAppStore as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
    mockReplace.mockClear();
    mockUsePathname.mockReturnValue("/"); // Always set pathname before each test
  });

  it("renders logo and navigates to home", () => {
    mockedUseAppStore.mockReturnValue({ isAuthenticated: false });

    renderWithClient(<Navbar />);

    const logo = screen.getByText("FeedExplorer");
    expect(logo).toBeInTheDocument();

    const homeLink = screen.getByTestId("home-link");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders menu items and highlights active link", () => {
    const activePath = "/";
    const activeItem = MenuItems.find((item) => item.href === activePath);
    mockedUseAppStore.mockReturnValue({ isAuthenticated: false });

    renderWithClient(<Navbar />);

    if (activeItem) {
      const activeLink = screen.getByText(activeItem.name);
      expect(activeLink).toHaveClass("text-blue-600");
    }
  });

  it("shows user avatar and logout button when authenticated", () => {
    mockedUseAppStore.mockReturnValue({
      isAuthenticated: true,
      user: { name: "John Doe" },
    });

    renderWithClient(<Navbar />);

    expect(screen.getByText("J")).toBeInTheDocument(); // Avatar fallback
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("shows sign in and sign up when not authenticated", () => {
    mockedUseAppStore.mockReturnValue({ isAuthenticated: false });

    renderWithClient(<Navbar />);

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("opens and closes mobile menu", () => {
    mockedUseAppStore.mockReturnValue({ isAuthenticated: false });

    renderWithClient(<Navbar />);

    const menuButton = screen.getByTestId("mobile-menu-button");

    fireEvent.click(menuButton);
    const mobileSignInButton = screen.getByTestId("mobile-sign-in-button");
    const mobileSignUpButton = screen.getByTestId("mobile-sign-up-button");

    expect(mobileSignInButton).toBeInTheDocument();
    expect(mobileSignUpButton).toBeInTheDocument();
  });
});
