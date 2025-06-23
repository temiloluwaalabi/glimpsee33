import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import GlobalSearchInput from "@/components/forms/search/global-search-input";
import { mockCurrentUser } from "@/config/constants/mockdata";
import { SessionData } from "@/lib/auth/session";

// Mock API services
jest.mock("@/lib/api/api", () => ({
  feedService: {
    getFeedItems: jest.fn(),
  },
  categoryService: {
    getCategories: jest.fn(),
  },
  userService: {
    getUsers: jest.fn(),
  },
}));

// Mock useSession hook
const mockSession: SessionData = {
  isLoggedIn: false,
  email: "",
  userId: "",
  firstName: "",
};

jest.mock("@/hooks/use-session", () => ({
  __esModule: true,
  default: () => mockSession,
}));

// Mock useAppStore
const mockAppStore = {
  isAuthenticated: false,
};

jest.mock("@/store/use-app-store", () => ({
  useAppStore: () => mockAppStore,
}));

// Mock useGlobalSearch hook
const mockGlobalSearchResult = {
  data: null,
  isLoading: false,
  error: null,
};

jest.mock("@/hooks/use-global-search", () => ({
  useGlobalSearch: () => mockGlobalSearchResult,
}));

// Mock GlobalSearchDialog component
jest.mock("@/components/dialogs/global-search-dialog", () => {
  return function MockGlobalSearchDialog({
    isOpen,
    onClose,
    initialQuery,
  }: {
    isOpen: boolean;
    onClose: () => void;
    initialQuery: string;
  }) {
    if (!isOpen) return null;

    return (
      <div data-testid="global-search-dialog">
        <div data-testid="search-dialog-query">{initialQuery}</div>
        <button onClick={onClose} data-testid="close-dialog">
          Close
        </button>
        <div>All</div>
        <div>Articles</div>
        <div>Categories</div>
        <div>Users</div>
      </div>
    );
  };
});

// Mock implementations from jest.setup.ts will be automatically used
const mockPush = jest.fn();
const mockReplace = jest.fn();

// Override specific router mocks if needed
jest.mock("next/navigation", () => {
  const original = jest.requireActual("next/navigation");
  return {
    ...original,
    useRouter: () => ({
      push: mockPush,
      replace: mockReplace,
      back: jest.fn(),
    }),
  };
});

// Mock services responses
// const mockFeedResponse = {
//   data: [
//     {
//       id: "1e7b8a2c-1f2b-4e3a-9d7c-1a2b3c4d5e6f",
//       title: "The Future of Artificial Intelligence: Beyond ChatGPT",
//       description:
//         "Exploring the next generation of AI technologies and their potential impact on society, from autonomous systems to creative AI applications.",
//       content: `
//          <h2>The AI Revolution Continues</h2>
//          <p>As we move beyond the initial excitement of large language models like ChatGPT, the artificial intelligence landscape is evolving at an unprecedented pace. The next wave of AI innovations promises to transform not just how we work, but how we live, create, and interact with the world around us.</p>

//          <h3>Autonomous Systems Take Center Stage</h3>
//          <p>Self-driving cars were just the beginning. We're now seeing AI systems that can operate independently in complex environments, from automated factories to space exploration rovers. These systems combine computer vision, natural language processing, and decision-making algorithms to navigate unpredictable scenarios.</p>

//          <h3>Creative AI: The New Renaissance</h3>
//          <p>AI is no longer just about automation—it's becoming a creative partner. From generating art and music to writing code and designing products, AI tools are augmenting human creativity in ways we never imagined. The key is finding the right balance between AI assistance and human insight.</p>

//          <h3>Ethical Considerations</h3>
//          <p>With great power comes great responsibility. As AI systems become more capable, we must address questions of bias, privacy, and accountability. The future of AI depends not just on technological advances, but on our ability to develop and deploy these systems responsibly.</p>
//        `,
//       author: mockAuthors[0],
//       category: "technology",
//       thumbnail:
//         "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
//       tags: ["AI", "Machine Learning", "Future Tech", "Innovation"],
//       publishedAt: "2024-06-15T10:30:00Z",
//       updatedAt: "2024-06-15T10:30:00Z",
//       readTime: 8,
//       likes: 342,
//       comments: 56,
//       isLiked: false,
//       views: 20,
//       featured: true,
//       images: [
//         "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
//         "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
//         "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
//       ],
//       isBookmarked: false,
//     },
//   ],
//   total: 1,
// };

// const mockCategoryResponse = {
//   data: [
//     {
//       id: "c1e7b8a2-1f2b-4e3a-9d7c-1a2b3c4d5e6f",
//       name: "Technology",
//       slug: "technology",
//       description: "Latest in tech, AI, and innovation",
//       color: "#3B82F6",
//       icon: "💻",
//     },
//   ],
//   total: 1,
// };

// const mockUserResponse = {
//   data: [
//     {
//       id: "b1e7b8a2-1f2b-4e3a-9d7c-1a2b3c4d5e6f",
//       name: "Sarah Chen",
//       email: "sarah@example.com",
//       avatar: getRandomImage(150, 150, "people"),
//       bio: "Tech enthusiast and AI researcher",
//       role: "user",
//       createdAt: "2024-01-15T00:00:00Z",
//       preferences: {
//         theme: "dark",

//         defaultSort: "trending",
//         defaultView: "grid",
//       },
//     },
//   ],
//   total: 1,
// };

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe("GlobalSearchInput Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
    mockReplace.mockClear();

    // Reset mock states
    mockAppStore.isAuthenticated = false;
    mockSession.isLoggedIn = false;
    mockGlobalSearchResult.data = null;
    mockGlobalSearchResult.isLoading = false;
    mockGlobalSearchResult.error = null;
  });

  describe("Unauthenticated User Flow", () => {
    beforeEach(() => {
      mockAppStore.isAuthenticated = false;
      mockSession.isLoggedIn = false;
    });

    it("redirects unauthenticated users to login when clicking search input", () => {
      renderWithProviders(<GlobalSearchInput />);

      const searchInput = screen.getByPlaceholderText(
        /Search for articles, topics, or authors/
      );

      fireEvent.click(searchInput);

      expect(mockPush).toHaveBeenCalledWith("/login");
    });

    it("does not open search dialog for unauthenticated users", () => {
      renderWithProviders(<GlobalSearchInput />);

      const searchInput = screen.getByPlaceholderText(
        /Search for articles, topics, or authors/
      );

      fireEvent.click(searchInput);

      expect(
        screen.queryByTestId("global-search-dialog")
      ).not.toBeInTheDocument();
    });
  });

  describe("Authenticated User Flow", () => {
    beforeEach(() => {
      mockAppStore.isAuthenticated = true;
      mockSession.isLoggedIn = true;
      mockSession.email = mockCurrentUser.email;
      mockSession.userId = mockCurrentUser.id;
      mockSession.firstName = mockCurrentUser.name;
    });

    // it("opens search dialog when clicking search input", () => {
    //   renderWithProviders(<GlobalSearchInput />);

    //   const searchInput = screen.getByPlaceholderText(
    //     /Search for articles, topics, or authors/
    //   );

    //   fireEvent.click(searchInput);

    //   expect(screen.getByTestId("global-search-dialog")).toBeInTheDocument();
    //   expect(mockPush).not.toHaveBeenCalled();
    // });

    it("opens search dialog and passes query when typing", () => {
      renderWithProviders(<GlobalSearchInput />);

      const searchInput = screen.getByPlaceholderText(
        /Search for articles, topics, or authors/
      );

      fireEvent.change(searchInput, { target: { value: "react" } });

      expect(screen.getByTestId("global-search-dialog")).toBeInTheDocument();
      expect(screen.getByTestId("search-dialog-query")).toHaveTextContent(
        "react"
      );
    });

    it("updates search query in input and dialog", () => {
      renderWithProviders(<GlobalSearchInput />);

      const searchInput = screen.getByPlaceholderText(
        /Search for articles, topics, or authors/
      ) as HTMLInputElement;

      fireEvent.change(searchInput, { target: { value: "javascript" } });

      expect(searchInput.value).toBe("javascript");
      expect(screen.getByTestId("search-dialog-query")).toHaveTextContent(
        "javascript"
      );
    });

    // it("closes search dialog when close button is clicked", async () => {
    //   renderWithProviders(<GlobalSearchInput />);

    //   const searchInput = screen.getByPlaceholderText(
    //     /Search for articles, topics, or authors/
    //   );

    //   fireEvent.click(searchInput);
    //   // Wait for dialog to appear
    //   const dialog = await screen.findByTestId("global-search-dialog");
    //   expect(dialog).toBeInTheDocument();
    //   const closeButton = screen.getByTestId("close-dialog");
    //   fireEvent.click(closeButton);

    //   await waitFor(() => {
    //     expect(
    //       screen.queryByTestId("global-search-dialog")
    //     ).not.toBeInTheDocument();
    //   });
    // });

    // it("maintains search query when dialog is reopened", async () => {
    //   renderWithProviders(<GlobalSearchInput />);

    //   const searchInput = screen.getByPlaceholderText(
    //     /Search for articles, topics, or authors/
    //   ) as HTMLInputElement;

    //   // Type a query and open dialog
    //   fireEvent.change(searchInput, { target: { value: "typescript" } });
    //   const dialog = await screen.findByTestId("global-search-dialog");
    //   expect(dialog).toBeInTheDocument();

    //   // Close dialog
    //   const closeButton = screen.getByTestId("close-dialog");
    //   fireEvent.click(closeButton);

    //   await waitFor(() => {
    //     expect(
    //       screen.queryByTestId("global-search-dialog")
    //     ).not.toBeInTheDocument();
    //   });

    //   // Reopen dialog by clicking input
    //   fireEvent.click(searchInput);

    //   const reopenedDialog = await screen.findByTestId("global-search-dialog");
    //   expect(reopenedDialog).toBeInTheDocument();
    //   expect(screen.getByTestId("search-dialog-query")).toHaveTextContent(
    //     "typescript"
    //   );
    //   expect(searchInput.value).toBe("typescript");
    // });
  });

  describe("Session Edge Cases", () => {
    it("redirects when authenticated but session is not logged in", () => {
      mockAppStore.isAuthenticated = true;
      mockSession.isLoggedIn = false;
      mockSession.email = "";
      mockSession.userId = "";
      mockSession.firstName = "";

      renderWithProviders(<GlobalSearchInput />);

      const searchInput = screen.getByPlaceholderText(
        /Search for articles, topics, or authors/
      );

      fireEvent.click(searchInput);

      expect(mockPush).toHaveBeenCalledWith("/login");
      expect(
        screen.queryByTestId("global-search-dialog")
      ).not.toBeInTheDocument();
    });

    it("redirects when authenticated but session is null", () => {
      mockAppStore.isAuthenticated = true;
      mockSession.isLoggedIn = false;
      mockSession.email = "";
      mockSession.userId = "";
      mockSession.firstName = "";
      renderWithProviders(<GlobalSearchInput />);

      const searchInput = screen.getByPlaceholderText(
        /Search for articles, topics, or authors/
      );

      fireEvent.click(searchInput);

      expect(mockPush).toHaveBeenCalledWith("/login");
      expect(
        screen.queryByTestId("global-search-dialog")
      ).not.toBeInTheDocument();
    });
  });

  describe("Component Props", () => {
    it("uses custom placeholder when provided", () => {
      const customPlaceholder = "Find your content here...";

      renderWithProviders(
        <GlobalSearchInput placeholder={customPlaceholder} />
      );

      expect(
        screen.getByPlaceholderText(customPlaceholder)
      ).toBeInTheDocument();
    });

    it("applies custom className when provided", () => {
      const customClass = "custom-search-class";

      renderWithProviders(<GlobalSearchInput className={customClass} />);

      const wrapper = screen
        .getByPlaceholderText(/Search for articles, topics, or authors/)
        .closest("div");

      expect(wrapper).toHaveClass(customClass);
    });
  });

  describe("Search Dialog Integration", () => {
    beforeEach(() => {
      mockAppStore.isAuthenticated = true;
      mockSession.isLoggedIn = true;
      mockSession.email = mockCurrentUser.email;
      mockSession.userId = mockCurrentUser.id;
      mockSession.firstName = mockCurrentUser.name;
    });

    it("passes initial query to search dialog", () => {
      renderWithProviders(<GlobalSearchInput />);

      const searchInput = screen.getByPlaceholderText(
        /Search for articles, topics, or authors/
      );

      fireEvent.change(searchInput, { target: { value: "initial query" } });

      expect(screen.getByTestId("search-dialog-query")).toHaveTextContent(
        "initial query"
      );
    });

    // it("shows search dialog with correct filter options", () => {
    //   renderWithProviders(<GlobalSearchInput />);

    //   const searchInput = screen.getByPlaceholderText(
    //     /Search for articles, topics, or authors/
    //   ) as HTMLInputElement;

    //   fireEvent.click(searchInput);

    //   expect(screen.getByText("All")).toBeInTheDocument();
    //   expect(screen.getByText("Articles")).toBeInTheDocument();
    //   expect(screen.getByText("Categories")).toBeInTheDocument();
    //   expect(screen.getByText("Users")).toBeInTheDocument();
    // });
  });
});
