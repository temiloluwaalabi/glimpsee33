import { v4 as uuidv4 } from "uuid";

import { getRandomImage } from "@/lib/utils";
import { Category, FeedItem, User } from "@/types";

// Mock categories
export const mockCategories: Category[] = [
  {
    id: "c1e7b8a2-1f2b-4e3a-9d7c-1a2b3c4d5e6f",
    name: "Technology",
    slug: "technology",
    description: "Latest in tech, AI, and innovation",
    color: "#3B82F6",
    icon: "💻",
  },
  {
    id: "d2f8c9b3-2e3c-5f4b-8e9d-2b3c4d5e6f7a",
    name: "Design",
    slug: "design",
    description: "UI/UX, graphics, and creative inspiration",
    color: "#EF4444",
    icon: "🎨",
  },
  {
    id: "e3a9d0c4-3f4d-6g5c-9f0e-3c4d5e6f7a8b",
    name: "Business",
    slug: "business",
    description: "Startups, entrepreneurship, and business strategy",
    color: "#10B981",
    icon: "💼",
  },
  {
    id: "f4b0e1d5-4g5e-7h6d-0g1f-4d5e6f7a8b9c",
    name: "Science",
    slug: "science",
    description: "Research, discoveries, and scientific breakthroughs",
    color: "#8B5CF6",
    icon: "🔬",
  },
  {
    id: "a5c1f2e6-5h6f-8i7e-1h2g-5e6f7a8b9c0d",
    name: "Health",
    slug: "health",
    description: "Wellness, fitness, and medical insights",
    color: "#F59E0B",
    icon: "🏥",
  },
];

export const mockAuthors: User[] = [
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
  {
    id: "c2f8c9b3-2e3c-5f4b-8e9d-2b3c4d5e6f7a",
    name: "Marcus Rodriguez",
    email: "marcus@example.com",
    avatar: getRandomImage(150, 150, "people"),
    bio: "Design systems architect and creative director",
    role: "user",
    createdAt: "2024-01-10T00:00:00Z",
    preferences: {
      theme: "light",
      defaultSort: "trending",
      defaultView: "grid",
      // language: "en",
      // notifications: {
      //   email: true,
      //   push: true,
      //   newPosts: true,
      //   likes: true,
      //   comments: true,
      // },
      // privacy: {
      //   profileVisible: true,
      //   activityVisible: true,
      //   emailVisible: false,
      // },
    },
  },
  {
    id: "d3a9d0c4-3f4d-6g5c-9f0e-3c4d5e6f7a8b",
    name: "Priya Patel",
    email: "priya@example.com",
    avatar: getRandomImage(150, 150, "people"),
    bio: "Startup founder and business strategist",
    role: "user",
    createdAt: "2024-01-05T00:00:00Z",
    preferences: {
      theme: "light",
      defaultSort: "trending",
      defaultView: "grid",
      // language: "en",
      // notifications: {
      //   email: true,
      //   push: true,
      //   newPosts: true,
      //   likes: true,
      //   comments: true,
      // },
      // privacy: {
      //   profileVisible: true,
      //   activityVisible: true,
      //   emailVisible: false,
      // },
    },
  },
  {
    id: "e4b0e1d5-4g5e-7h6d-0g1f-4d5e6f7a8b9c",
    name: "Liam O'Connor",
    email: "liam@example.com",
    avatar: getRandomImage(150, 150, "people"),
    bio: "Science communicator and researcher",
    role: "user",
    createdAt: "2024-01-08T00:00:00Z",
    preferences: {
      theme: "light",
      defaultSort: "trending",
      defaultView: "grid",
      // language: "en",
      // notifications: {
      //   email: true,
      //   push: true,
      //   newPosts: true,
      //   likes: true,
      //   comments: true,
      // },
      // privacy: {
      //   profileVisible: true,
      //   activityVisible: true,
      //   emailVisible: false,
      // },
    },
  },
  {
    id: "f5c1f2e6-5h6f-8i7e-1h2g-5e6f7a8b9c0d",
    name: "Emily Nguyen",
    email: "emily@example.com",
    avatar: getRandomImage(150, 150, "people"),
    bio: "Health writer and wellness advocate",
    role: "user",
    createdAt: "2024-01-12T00:00:00Z",
    preferences: {
      theme: "light",
      defaultSort: "trending",
      defaultView: "grid",
      // language: "en",
      // notifications: {
      //   email: true,
      //   push: true,
      //   newPosts: true,
      //   likes: true,
      //   comments: true,
      // },
      // privacy: {
      //   profileVisible: true,
      //   activityVisible: true,
      //   emailVisible: false,
      // },
    },
  },
  {
    id: "g6d2e3f4-6i7j-9k8l-2m3n-7o8p9q0r1s2t",
    name: "Temiloluwa Alabi",
    email: "temiloluwaalabi33@gmail.com",
    avatar: getRandomImage(150, 150, "people"),
    bio: "Full-stack developer and open source contributor",
    role: "user",
    createdAt: "2024-01-18T00:00:00Z",
    preferences: {
      theme: "light",

      defaultSort: "trending",
      defaultView: "grid",
    },
  },
];

// // Function to add a new user to mockAuthors (only works in-memory, not persisted)
// export function addMockAuthor(user: User) {
//   mockAuthors.push(user);
// }

// Generate mock feed items
export const mockFeedItems: FeedItem[] = [
  {
    id: uuidv4(),
    title: "The Future of Artificial Intelligence: Beyond ChatGPT",
    description:
      "Exploring the next generation of AI technologies and their potential impact on society, from autonomous systems to creative AI applications.",
    content: `   
      <h2>The AI Revolution Continues</h2>
      <p>As we move beyond the initial excitement of large language models like ChatGPT, the artificial intelligence landscape is evolving at an unprecedented pace. The next wave of AI innovations promises to transform not just how we work, but how we live, create, and interact with the world around us.</p>
      
      <h3>Autonomous Systems Take Center Stage</h3>
      <p>Self-driving cars were just the beginning. We're now seeing AI systems that can operate independently in complex environments, from automated factories to space exploration rovers. These systems combine computer vision, natural language processing, and decision-making algorithms to navigate unpredictable scenarios.</p>
      
      <h3>Creative AI: The New Renaissance</h3>
      <p>AI is no longer just about automation—it's becoming a creative partner. From generating art and music to writing code and designing products, AI tools are augmenting human creativity in ways we never imagined. The key is finding the right balance between AI assistance and human insight.</p>
      
      <h3>Ethical Considerations</h3>
      <p>With great power comes great responsibility. As AI systems become more capable, we must address questions of bias, privacy, and accountability. The future of AI depends not just on technological advances, but on our ability to develop and deploy these systems responsibly.</p>
    `,
    author: mockAuthors[0],
    category: "technology",
    thumbnail: getRandomImage(800, 600, "technology"),
    tags: ["AI", "Machine Learning", "Future Tech", "Innovation"],
    publishedAt: "2024-06-15T10:30:00Z",
    updatedAt: "2024-06-15T10:30:00Z",
    readTime: 8,
    likes: 342,
    comments: 56,
    isLiked: false,
    views: 20,
    featured: true,
    images: [
      getRandomImage(800, 600, "technology"),
      getRandomImage(800, 600, "technology"),
      getRandomImage(800, 600, "technology"),
    ],
    isBookmarked: false,
  },
  {
    id: uuidv4(),
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
    thumbnail: getRandomImage(800, 600, "business"),
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
      getRandomImage(800, 600, "business"),
      getRandomImage(800, 600, "business"),
      getRandomImage(800, 600, "business"),
    ],
    isBookmarked: false,
  },
  {
    id: uuidv4(),
    title: "CRISPR Gene Editing: Recent Breakthroughs and Future Applications",
    description:
      "Latest developments in gene editing technology and their potential to revolutionize medicine and agriculture.",
    content: `
      <h2>Precision Medicine Revolution</h2>
      <p>CRISPR-Cas9 technology has evolved from a promising research tool to a transformative force in medicine and biotechnology. Recent breakthroughs have expanded its applications and improved its precision, opening new possibilities for treating genetic diseases.</p>
      
      <h3>Recent Clinical Successes</h3>
      <p>The first CRISPR treatments for sickle cell disease and beta-thalassemia have shown remarkable success, essentially curing patients of these genetic disorders. These groundbreaking treatments represent just the beginning of CRISPR's clinical applications.</p>
      
      <h3>Agricultural Applications</h3>
      <p>Beyond medicine, CRISPR is revolutionizing agriculture by creating crops that are more nutritious, resistant to diseases, and adaptable to climate change. These innovations could help address global food security challenges while reducing the environmental impact of farming.</p>
      
      <h3>Ethical Considerations and Future Directions</h3>
      <p>As CRISPR technology advances, we must carefully consider its ethical implications, particularly regarding heritable genetic modifications. The scientific community continues to develop guidelines for responsible use while pushing the boundaries of what's possible.</p>
    `,
    author: mockAuthors[2],
    category: "science",
    thumbnail: getRandomImage(800, 600, "science"),
    tags: ["CRISPR", "Gene Editing", "Biotechnology", "Medicine"],
    publishedAt: "2024-06-13T09:15:00Z",
    updatedAt: "2024-06-13T09:15:00Z",
    readTime: 10,
    likes: 456,
    comments: 78,
    isLiked: false,
    views: 20,
    featured: true,
    images: [
      getRandomImage(800, 600, "science"),
      getRandomImage(800, 600, "science"),
      getRandomImage(800, 600, "science"),
    ],
    isBookmarked: true,
  },
  {
    id: uuidv4(),
    title: "Modern Web Development: From React to Edge Computing",
    description:
      "Exploring the latest trends in web development, including server-side rendering, edge computing, and the jamstack architecture.",
    content: `
      <h2>The Web Development Landscape in 2024</h2>
      <p>Web development continues to evolve at a rapid pace, with new frameworks, tools, and paradigms emerging regularly. Today's developers need to navigate an increasingly complex ecosystem while delivering fast, accessible, and scalable applications.</p>
      
      <h3>The Rise of Edge Computing</h3>
      <p>Edge computing is transforming how we think about web applications. By processing data closer to users, edge computing reduces latency and improves performance. Platforms like Vercel Edge Functions and Cloudflare Workers are making edge computing accessible to developers worldwide.</p>
      
      <h3>Server-Side Rendering Renaissance</h3>
      <p>With frameworks like Next.js, Nuxt.js, and SvelteKit, server-side rendering has made a comeback. These tools provide the benefits of static generation and server-side rendering while maintaining the developer experience of single-page applications.</p>
      
      <h3>The Future of Web APIs</h3>
      <p>GraphQL continues to gain adoption, while REST APIs remain dominant. The emergence of tRPC and server components is changing how we think about client-server communication, promising type-safe, efficient data fetching.</p>
    `,
    author: mockAuthors[3],
    category: "technology",
    thumbnail: getRandomImage(800, 600, "technology"),
    tags: ["Web Development", "React", "Edge Computing", "Next.js"],
    publishedAt: "2024-06-12T16:45:00Z",
    updatedAt: "2024-06-12T16:45:00Z",
    readTime: 7,
    likes: 234,
    comments: 31,
    isLiked: true,
    views: 20,
    featured: true,
    images: [
      getRandomImage(800, 600, "technology"),
      getRandomImage(800, 600, "technology"),
      getRandomImage(800, 600, "technology"),
    ],
    isBookmarked: true,
  },
  {
    id: uuidv4(),
    title: "Mental Health in the Digital Age: Finding Balance",
    description:
      "Understanding the impact of technology on mental health and strategies for maintaining well-being in our connected world.",
    content: `
      <h2>Navigating Digital Wellness</h2>
      <p>As our lives become increasingly digital, understanding the relationship between technology use and mental health has never been more important. While technology offers many benefits, it also presents unique challenges for our psychological well-being.</p>
      
      <h3>The Double-Edged Sword</h3>
      <p>Social media and digital platforms can provide connection and support, but they can also contribute to anxiety, depression, and feelings of inadequacy. The key is finding a balance that maximizes benefits while minimizing harm.</p>
      
      <h3>Practical Strategies for Digital Wellness</h3>
      <p>Set boundaries around screen time, curate your digital environment to include positive content, and practice digital detoxes regularly. Mindful technology use—being intentional about how and when you engage with digital platforms—can significantly improve your mental health.</p>
      
      <h3>The Role of Digital Mental Health Tools</h3>
      <p>Paradoxically, technology itself offers solutions through meditation apps, therapy platforms, and mental health resources. These tools can make mental health support more accessible and affordable for many people.</p>
    `,
    author: mockAuthors[4],
    category: "health",
    thumbnail: getRandomImage(800, 600, "health"),
    tags: ["Mental Health", "Digital Wellness", "Technology", "Self Care"],
    publishedAt: "2024-06-11T11:30:00Z",
    updatedAt: "2024-06-11T11:30:00Z",
    readTime: 5,
    likes: 512,
    comments: 89,
    isLiked: false,
    views: 20,
    featured: true,
    images: [
      getRandomImage(800, 600, "health"),
      getRandomImage(800, 600, "health"),
      getRandomImage(800, 600, "health"),
    ],
    isBookmarked: false,
  },
  {
    id: uuidv4(),
    title: "The Streaming Wars: How Content Creation is Evolving",
    description:
      "An analysis of the changing entertainment landscape and how creators are adapting to new platforms and audience expectations.",
    content: `
      <h2>The New Entertainment Paradigm</h2>
      <p>The entertainment industry has undergone a dramatic transformation over the past decade. Traditional media companies compete with tech giants and independent creators for audience attention, fundamentally changing how content is created, distributed, and consumed.</p>
      
      <h3>Platform Proliferation</h3>
      <p>From Netflix and Disney+ to TikTok and YouTube, the number of content platforms continues to grow. Each platform has its own unique format, audience, and monetization model, requiring creators to adapt their content strategy accordingly.</p>
      
      <h3>The Creator Economy</h3>
      <p>Independent creators now have unprecedented opportunities to build audiences and monetize their content. Platforms like Patreon, Substack, and OnlyFans have created new revenue streams, while social media provides direct access to fans.</p>
      
      <h3>Quality vs. Quantity</h3>
      <p>The abundance of content has raised questions about quality and curation. Audiences are becoming more selective, leading to increased investment in high-quality productions while also valuing authentic, personal content from individual creators.</p>
    `,
    author: mockAuthors[5],
    category: "entertainment",
    thumbnail: getRandomImage(800, 600, "entertainment"),
    tags: ["Streaming", "Content Creation", "Entertainment", "Creator Economy"],
    publishedAt: "2024-06-10T20:15:00Z",
    updatedAt: "2024-06-10T20:15:00Z",
    readTime: 6,
    likes: 198,
    comments: 24,
    isLiked: false,
    views: 20,
    featured: true,
    images: [
      getRandomImage(800, 600, "entertainment"),
      getRandomImage(800, 600, "entertainment"),
      getRandomImage(800, 600, "entertainment"),
    ],
    isBookmarked: false,
  },
];

// Generate more items for pagination testing
export const generateMoreItems = (
  startId: number = 7,
  count: number = 20
): FeedItem[] => {
  const categories: FeedItem["category"][] = [
    "technology",
    "business",
    "science",
    "health",
    "entertainment",
  ];
  const items: FeedItem[] = [];

  for (let i = 0; i < count; i++) {
    const id = (startId + i).toString();
    const category = categories[Math.floor(Math.random() * categories.length)];
    const author = mockAuthors[Math.floor(Math.random() * mockAuthors.length)];

    items.push({
      id,
      title: `Generated Article ${id}: ${category.charAt(0).toUpperCase() + category.slice(1)} Insights`,
      description: `This is a generated article about ${category} with insights and analysis from industry experts. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      content: `
        <h2>Generated Content ${id}</h2>
        <p>This is generated content for testing purposes. In a real application, this would contain meaningful content about ${category}.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      `,
      author,
      category,
      thumbnail: getRandomImage(800, 600, category),
      tags: [category, "generated", "test"],
      publishedAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      readTime: Math.floor(Math.random() * 10) + 3,
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      isLiked: Math.random() > 0.7,
      views: Math.floor(Math.random() * 1000),
      featured: Math.random() > 0.8,
      images: [
        getRandomImage(800, 600, category),
        getRandomImage(800, 600, category),
        getRandomImage(800, 600, category),
      ],
      isBookmarked: Math.random() > 0.8,
    });
  }

  return items;
};

// Combine original and generated items
export const allMockFeedItems = [...mockFeedItems, ...generateMoreItems()];

// Mock current user
export const mockCurrentUser: User = {
  id: "g6d2e3f4-6i7j-9k8l-2m3n-7o8p9q0r1s2t",
  name: "Temiloluwa Alabi",
  email: "temiloluwaalabi33@gmail.com",
  avatar: getRandomImage(150, 150, "people"),
  bio: "Full-stack developer and open source contributor",
  role: "user",
  createdAt: "2024-01-18T00:00:00Z",
  preferences: {
    theme: "light",
    defaultSort: "trending",
    defaultView: "grid",
    //
    // notifications: {
    //   email: true,
    //   push: true,
    //   newPosts: true,
    //   likes: true,
    //   comments: true,
    // },
    // privacy: {
    //   profileVisible: true,
    //   activityVisible: true,
    //   emailVisible: false,
    // },
  },
};
