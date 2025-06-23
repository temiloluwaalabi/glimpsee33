/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import GlobalSearchDialog from "@/components/dialogs/global-search-dialog";
import { mockAuthors } from "@/config/constants/mockdata";
import { useGlobalSearch } from "@/hooks/use-global-search";
import { getRandomImage } from "@/lib/utils";

// Mock the hook
jest.mock("@/hooks/use-global-search");

const mockUseGlobalSearch = useGlobalSearch as jest.MockedFunction<
  typeof useGlobalSearch
>;

// Mock data
const mockSearchResults = {
  feedItems: [
    {
      id: "2f8c9b3d-2e3c-5f4b-8e9d-2b3c4d5e6f7a",
      title: "Sustainable Business Practices: A Guide for Modern Entrepreneurs",
      description:
        "How to build a profitable business while making a positive impact on the environment and society.",
      content: `
       <h2>Building for Tomorrow</h2>
       <p>Today's entrepreneurs face a unique challenge: how to build profitable businesses that also contribute positively to society and the environment. The good news is that sustainable practices often lead to better long-term profitability and customer loyalty.</p>
       
       <h3>The Triple Bottom Line</h3>
       <p>Modern businesses are measured not just on profit, but on their impact on people and the planet. This "triple bottom line" approach considers social and environmental impacts alongside financial performance, creating more resilient and purpose-driven organizations.</p>
       
       <h3>Practical Steps for Sustainability</h3>
       <p>Start with small changes: reduce waste, optimize energy usage, and consider the lifecycle of your products. Engage your team in sustainability initiatives and make it part of your company culture. Transparency with customers about your efforts builds trust and loyalty.</p>
       
       <h3>The Business Case</h3>
       <p>Sustainable practices often reduce costs through improved efficiency and waste reduction. They also attract top talent, especially among younger generations who prioritize working for mission-driven companies. Additionally, many investors now factor ESG (Environmental, Social, Governance) criteria into their decisions.</p>
     `,
      author: mockAuthors[1],
      category: "business",
      thumbnail:
        "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      tags: ["Sustainability", "Entrepreneurship", "ESG", "Business Strategy"],
      publishedAt: "2024-06-14T14:20:00Z",
      updatedAt: "2024-06-14T14:20:00Z",
      readTime: 6,
      likes: 289,
      comments: 42,
      isLiked: true,
      views: 20,
      featured: true,
      images: [
        "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
        "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
        "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      ],
      isBookmarked: false,
    },
  ],
  categories: [
    {
      id: "1",
      name: "Technology",
      slug: "technology",
      description: "Tech articles",
      color: "#3B82F6",
      icon: "💻",
    },
  ],
  users: [
    {
      id: "b1e7b8a2-1f2b-4e3a-9d7c-1a2b3c4d5e6f",
      name: "Sarah Chen",
      email: "sarah@example.com",
      avatar: getRandomImage(150, 150, "people"),
      bio: "Tech enthusiast and AI researcher",
      role: "user",
      createdAt: "2024-01-15T00:00:00Z",
      preferences: {
        theme: "dark",

        defaultSort: "trending",
        defaultView: "grid",
      },
    },
  ],
  totalResults: 3,
};

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe("GlobalSearchDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search dialog when open", () => {
    mockUseGlobalSearch.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as any);

    renderWithQueryClient(
      <GlobalSearchDialog isOpen={true} onClose={jest.fn()} />
    );

    expect(
      screen.getByPlaceholderText(/Search for articles, categories, or users/)
    ).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("shows loading state while searching", () => {
    mockUseGlobalSearch.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    renderWithQueryClient(
      <GlobalSearchDialog
        isOpen={true}
        onClose={jest.fn()}
        initialQuery="test"
      />
    );

    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("displays search results correctly", () => {
    mockUseGlobalSearch.mockReturnValue({
      data: mockSearchResults,
      isLoading: false,
      error: null,
    } as any);

    renderWithQueryClient(
      <GlobalSearchDialog
        isOpen={true}
        onClose={jest.fn()}
        initialQuery="practice"
      />
    );

    // Check if results are displayed
    expect(
      screen.getByText(
        "Sustainable Business Practices: A Guide for Modern Entrepreneurs"
      )
    ).toBeInTheDocument();
    // expect(screen.getByText("Categories (1)")).toBeInTheDocument();
    // expect(screen.getByText("Users (1)")).toBeInTheDocument();

    // expect(screen.getByText("Test Article")).toBeInTheDocument();
    // expect(screen.getByText("Technology")).toBeInTheDocument();
    // expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  // it("handles filter selection", () => {
  //   mockUseGlobalSearch.mockReturnValue({
  //     data: mockSearchResults,
  //     isLoading: false,
  //     error: null,
  //   } as any);

  //   renderWithQueryClient(
  //     <GlobalSearchDialog isOpen={true} onClose={jest.fn()} />
  //   );

  //   const articlesFilter = screen.getByText(
  //     "Sustainable Business Practices: A Guide for Modern Entrepreneurs"
  //   );
  //   fireEvent.click(articlesFilter);

  //   // The hook should be called with the new filter
  //   expect(mockUseGlobalSearch).toHaveBeenCalledWith("", "feeditem");
  // });

  it("calls onClose when escape key is pressed", () => {
    const mockOnClose = jest.fn();
    mockUseGlobalSearch.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as any);

    renderWithQueryClient(
      <GlobalSearchDialog isOpen={true} onClose={mockOnClose} />
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("shows empty state when no results", () => {
    mockUseGlobalSearch.mockReturnValue({
      data: { feedItems: [], categories: [], users: [], totalResults: 0 },
      isLoading: false,
      error: null,
    } as any);

    renderWithQueryClient(
      <GlobalSearchDialog
        isOpen={true}
        onClose={jest.fn()}
        initialQuery="jumong"
      />
    );

    expect(screen.getByText(/No results found for jumong/)).toBeInTheDocument();
  });
});
