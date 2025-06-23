/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { toast } from "sonner";

import { FeedItemCard } from "@/components/cards/feed-item-card";
import { feedService } from "@/lib/api/api";
import { FeedItem } from "@/types";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@/lib/api/api", () => ({
  feedService: {
    likeFeedItem: jest.fn(),
    bookmarkFeedItem: jest.fn(),
  },
}));

jest.mock("@/lib/logger", () => ({
  log: {
    error: jest.fn(),
  },
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

jest.mock("next/image", () => {
  // Use the actual Next.js Image component for testing to avoid <img> lint errors
  const NextImage = jest.requireActual("next/image").default;
  return NextImage;
});

// Mock Zustand store
jest.mock("@/store/use-app-store", () => ({
  useAppStore: () => ({
    addBookmark: jest.fn(),
    addFavorite: jest.fn(),
    removeBookmark: jest.fn(),
    removeFavorite: jest.fn(),
    isBookmarked: () => false,
    isFavorited: () => false,
  }),
}));

const queryClient = new QueryClient();

function renderWithClient(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

// Mock Feed Item
const mockFeedItem: FeedItem = {
  id: "1",
  title: "Test Feed Title",
  description:
    "This is a very long description that should be truncated at 70 characters for proper display in the UI.",
  content: "Full content",
  author: {
    id: "author1",
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
    bio: "Test author bio",
  },
  category: "Tech",
  tags: ["react", "typescript", "testing", "extra"],
  thumbnail: "https://example.com/thumbnail.jpg",
  images: [],
  publishedAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  likes: 10,
  views: 100,
  comments: 5,
  isLiked: false,
  isBookmarked: false,
  readTime: 5,
  featured: false,
};

describe("FeedItemCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders essential elements", () => {
    renderWithClient(<FeedItemCard item={mockFeedItem} view="grid" />);

    expect(screen.getByText("Test Feed Title")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByAltText("Test Feed Title")).toBeInTheDocument();
    expect(screen.getByText("5 min")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("handles like functionality correctly", async () => {
    (feedService.likeFeedItem as jest.Mock).mockResolvedValue({
      data: { isLiked: true, likes: 11 },
    });

    renderWithClient(<FeedItemCard item={mockFeedItem} view="grid" />);

    const likeButton = screen.getByRole("button", { name: /10/ });
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(feedService.likeFeedItem).toHaveBeenCalledWith("1");
      expect(toast.success).toHaveBeenCalledWith("Article Liked");
    });

    expect(screen.getByText("11")).toBeInTheDocument();
  });

  it("handles bookmark functionality correctly", async () => {
    (feedService.bookmarkFeedItem as jest.Mock).mockResolvedValue({
      data: { isBookmarked: true },
    });

    renderWithClient(<FeedItemCard item={mockFeedItem} view="grid" />);

    const bookmarkButton = screen
      .getAllByRole("button")
      .find((button) =>
        button.querySelector("svg")?.classList.contains("lucide-bookmark")
      );

    fireEvent.click(bookmarkButton!);

    await waitFor(() => {
      expect(feedService.bookmarkFeedItem).toHaveBeenCalledWith("1");
      expect(toast.success).toHaveBeenCalledWith("Article Saved");
    });
  });

  it("handles like error correctly", async () => {
    (feedService.likeFeedItem as jest.Mock).mockRejectedValue(
      new Error("Network Error")
    );

    renderWithClient(<FeedItemCard item={mockFeedItem} view="grid" />);

    const likeButton = screen.getByRole("button", { name: /10/ });
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to update favorite status"
      );
    });
  });

  it("prevents event propagation on like and bookmark clicks", () => {
    renderWithClient(<FeedItemCard item={mockFeedItem} view="grid" />);

    const likeButton = screen.getByRole("button", { name: /10/ });
    const stopPropagation = jest.fn();
    const preventDefault = jest.fn();

    // Create a custom event object
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    }) as any;
    event.stopPropagation = stopPropagation;
    event.preventDefault = preventDefault;

    // Dispatch the event
    likeButton.dispatchEvent(event);

    expect(stopPropagation).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
  });
  it("truncates description longer than 70 characters", () => {
    renderWithClient(<FeedItemCard item={mockFeedItem} view="grid" />);

    expect(
      screen.getByText(
        /This is a very long description that should be truncated at 70 charact.../
      )
    ).toBeInTheDocument();
  });

  it("displays a maximum of 3 tags", () => {
    renderWithClient(<FeedItemCard item={mockFeedItem} view="grid" />);

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
    expect(screen.getByText("testing")).toBeInTheDocument();
    expect(screen.queryByText("extra")).not.toBeInTheDocument();
  });

  it("has accessible button labels", () => {
    renderWithClient(<FeedItemCard item={mockFeedItem} view="grid" />);

    expect(screen.getByRole("button", { name: /10/ })).toBeInTheDocument();
  });

  it("renders list view correctly", () => {
    renderWithClient(<FeedItemCard item={mockFeedItem} view="list" />);

    expect(screen.getByText("Test Feed Title")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByAltText("Test Feed Title")).toBeInTheDocument();
  });
});
