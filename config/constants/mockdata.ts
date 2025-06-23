import { faker } from "@faker-js/faker";
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
  {
    id: "b6d3e4f7-6j7k-9l8m-2n3o-7p8q9r0s1t2u",
    name: "Entertainment",
    slug: "entertainment",
    description: "Movies, music, streaming, and pop culture",
    color: "#F472B6",
    icon: "🎬",
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
    password: "Adeleke148@!!",
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
  },
];

// // Function to add a new user to mockAuthors (only works in-memory, not persisted)
// export function addMockAuthor(user: User) {
//   mockAuthors.push(user);
// }

// Generate mock feed items
export const mockFeedItems: FeedItem[] = [
  {
    id: "1e7b8a2c-1f2b-4e3a-9d7c-1a2b3c4d5e6f",
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
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
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
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
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
    isLiked: false,
    views: 20,
    featured: true,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "3a9d0c4e-3f4d-6g5c-9f0e-3c4d5e6f7a8b",
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
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
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
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "4b0e1d5f-4g5e-7h6d-0g1f-4d5e6f7a8b9c",
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
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Web Development", "React", "Edge Computing", "Next.js"],
    publishedAt: "2024-06-12T16:45:00Z",
    updatedAt: "2024-06-12T16:45:00Z",
    readTime: 7,
    likes: 234,
    comments: 31,
    isLiked: false,
    views: 20,
    featured: true,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "5c1f2e6a-5h6f-8i7e-1h2g-5e6f7a8b9c0d",
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
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
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
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "6d3e4f7b-6j7k-9l8m-2n3o-7p8q9r0s1t2u",
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
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
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
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  // --- More static mock items for pagination and variety ---
  {
    id: "7e8f9a0b-7k8l-1m2n-3o4p-5q6r7s8t9u0v",
    title: "Design Systems: Scaling Creativity Across Teams",
    description:
      "How design systems empower teams to build consistent, scalable, and beautiful digital products.",
    content: `
      <h2>Design at Scale</h2>
      <p>Design systems are more than just a style guide—they are a living set of standards and components that enable teams to create cohesive user experiences efficiently.</p>
      <h3>Benefits of Design Systems</h3>
      <p>They reduce duplication, speed up development, and ensure brand consistency across products.</p>
      <h3>Building Your System</h3>
      <p>Start small, document everything, and involve both designers and developers from the start.</p>
    `,
    author: mockAuthors[1],
    category: "design",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Design", "UI/UX", "Systems", "Product"],
    publishedAt: "2024-06-09T09:00:00Z",
    updatedAt: "2024-06-09T09:00:00Z",
    readTime: 4,
    likes: 120,
    comments: 12,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "8f0a1b2c-8l9m-2n3o-4p5q-6r7s8t9u0v1w",
    title: "Remote Work: Productivity Hacks for Distributed Teams",
    description:
      "Tips and tools for staying productive and connected while working remotely.",
    content: `
      <h2>Remote Work Revolution</h2>
      <p>Remote work is here to stay. Learn how to maximize productivity and maintain team cohesion from anywhere in the world.</p>
      <h3>Top Tools</h3>
      <p>Slack, Zoom, Notion, and Trello are just a few tools that keep teams connected and organized.</p>
      <h3>Best Practices</h3>
      <p>Set clear goals, communicate often, and prioritize work-life balance.</p>
    `,
    author: mockAuthors[0],
    category: "business",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Remote Work", "Productivity", "Teams", "Business"],
    publishedAt: "2024-06-08T13:30:00Z",
    updatedAt: "2024-06-08T13:30:00Z",
    readTime: 5,
    likes: 98,
    comments: 8,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "9a1b2c3d-9m0n-3o4p-5q6r-7s8t9u0v1w2x",
    title: "The Rise of Indie Game Development",
    description:
      "How small teams and solo developers are changing the gaming industry.",
    content: `
      <h2>Indie Games Take the Spotlight</h2>
      <p>With powerful tools and digital distribution, indie developers are creating innovative and beloved games worldwide.</p>
      <h3>Success Stories</h3>
      <p>Games like Stardew Valley and Celeste prove that passion and creativity can rival big budgets.</p>
      <h3>Getting Started</h3>
      <p>Start small, iterate quickly, and build a community around your game.</p>
    `,
    author: mockAuthors[5],
    category: "entertainment",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Gaming", "Indie", "Development", "Entertainment"],
    publishedAt: "2024-06-07T18:00:00Z",
    updatedAt: "2024-06-07T18:00:00Z",
    readTime: 6,
    likes: 150,
    comments: 20,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "0b1c2d3e-0n1o-4p5q-6r7s-8t9u0v1w2x3y",
    title: "Wellness Tech: Gadgets for a Healthier Life",
    description:
      "A look at the latest technology designed to improve your health and well-being.",
    content: `
      <h2>Tech Meets Wellness</h2>
      <p>From smartwatches to meditation apps, technology is helping people live healthier, more mindful lives.</p>
      <h3>Popular Devices</h3>
      <p>Wearables track your activity, sleep, and even stress levels, giving you actionable insights.</p>
      <h3>Future Trends</h3>
      <p>Expect more personalized and proactive health tech in the coming years.</p>
    `,
    author: mockAuthors[4],
    category: "health",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Health", "Wellness", "Technology", "Gadgets"],
    publishedAt: "2024-06-06T08:45:00Z",
    updatedAt: "2024-06-06T08:45:00Z",
    readTime: 4,
    likes: 110,
    comments: 10,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "1c2d3e4f-1o2p-5q6r-7s8t-9u0v1w2x3y4z",
    title: "Women in Tech: Breaking Barriers and Leading Change",
    description:
      "Celebrating the achievements of women in technology and exploring how to create a more inclusive industry.",
    content: `
      <h2>Empowering Women in Tech</h2>
      <p>Women are making significant contributions to technology, from engineering to leadership roles.</p>
      <h3>Challenges and Opportunities</h3>
      <p>Addressing gender bias and creating mentorship opportunities are key to building a diverse tech workforce.</p>
      <h3>How to Support</h3>
      <p>Promote inclusive hiring, support women-led initiatives, and celebrate diverse voices in tech.</p>
    `,
    author: mockAuthors[0],
    category: "technology",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Women", "Tech", "Diversity", "Inclusion"],
    publishedAt: "2024-06-05T15:10:00Z",
    updatedAt: "2024-06-05T15:10:00Z",
    readTime: 5,
    likes: 180,
    comments: 25,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "2d3e4f5a-2p3q-6r7s-8t9u-0v1w2x3y4z5a",
    title: "The Science of Sleep: Why Rest Matters",
    description:
      "Understanding the importance of sleep for health, productivity, and happiness.",
    content: `
      <h2>Sleep and Well-being</h2>
      <p>Quality sleep is essential for physical and mental health. Learn how to improve your sleep habits for a better life.</p>
      <h3>Tips for Better Sleep</h3>
      <p>Maintain a regular schedule, limit screen time before bed, and create a restful environment.</p>
      <h3>Common Myths</h3>
      <p>Busting misconceptions about sleep and productivity.</p>
    `,
    author: mockAuthors[4],
    category: "health",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Sleep", "Health", "Science", "Wellness"],
    publishedAt: "2024-06-04T22:20:00Z",
    updatedAt: "2024-06-04T22:20:00Z",
    readTime: 4,
    likes: 90,
    comments: 7,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "3e4f5a6b-3q4r-7s8t-9u0v-1w2x3y4z5a6b",
    title: "The Art of Branding: Building a Memorable Identity",
    description:
      "Key principles for creating a brand that stands out in a crowded market.",
    content: `
      <h2>Branding Basics</h2>
      <p>Your brand is more than a logo—it's the story, values, and experience you deliver to customers.</p>
      <h3>Elements of a Strong Brand</h3>
      <p>Consistency, authenticity, and emotional connection are crucial for brand success.</p>
      <h3>Case Studies</h3>
      <p>Learn from brands that have built loyal followings through great storytelling and design.</p>
    `,
    author: mockAuthors[1],
    category: "business",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Branding", "Business", "Marketing", "Identity"],
    publishedAt: "2024-06-03T10:00:00Z",
    updatedAt: "2024-06-03T10:00:00Z",
    readTime: 5,
    likes: 130,
    comments: 15,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "4f5a6b7c-4r5s-8t9u-0v1w-2x3y4z5a6b7c",
    title: "Climate Change: Innovations in Renewable Energy",
    description:
      "Exploring the latest breakthroughs in solar, wind, and other renewable energy sources.",
    content: `
      <h2>Renewable Energy Revolution</h2>
      <p>Solar and wind power are more affordable and efficient than ever, driving the transition to a cleaner energy future.</p>
      <h3>New Technologies</h3>
      <p>Battery storage, smart grids, and offshore wind farms are changing the energy landscape.</p>
      <h3>What’s Next?</h3>
      <p>Expect continued innovation and investment in sustainable energy solutions.</p>
    `,
    author: mockAuthors[2],
    category: "science",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Climate", "Energy", "Science", "Renewables"],
    publishedAt: "2024-06-02T17:30:00Z",
    updatedAt: "2024-06-02T17:30:00Z",
    readTime: 6,
    likes: 160,
    comments: 18,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "5a6b7c8d-5s6t-9u0v-1w2x-3y4z5a6b7c8d",
    title: "UX Writing: Crafting Words That Guide and Delight",
    description:
      "How great UX writing improves user experience and drives engagement.",
    content: `
      <h2>The Power of Words</h2>
      <p>Clear, concise, and helpful copy is essential for intuitive digital experiences.</p>
      <h3>Best Practices</h3>
      <p>Use plain language, be consistent, and always write with the user in mind.</p>
      <h3>Examples</h3>
      <p>See how top apps use microcopy to guide users and reduce friction.</p>
    `,
    author: mockAuthors[1],
    category: "design",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["UX", "Writing", "Design", "Copy"],
    publishedAt: "2024-06-01T12:00:00Z",
    updatedAt: "2024-06-01T12:00:00Z",
    readTime: 4,
    likes: 105,
    comments: 9,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "6b7c8d9e-6t7u-0v1w-2x3y-4z5a6b7c8d9e",
    title: "Biohacking: Optimizing Your Body and Mind",
    description:
      "A beginner’s guide to biohacking for better health, focus, and longevity.",
    content: `
      <h2>What is Biohacking?</h2>
      <p>Biohacking is about making small, incremental changes to your lifestyle to improve health and performance.</p>
      <h3>Popular Hacks</h3>
      <p>From intermittent fasting to nootropics, discover the most popular biohacks and their benefits.</p>
      <h3>Safety First</h3>
      <p>Always consult with a healthcare professional before trying new supplements or routines.</p>
    `,
    author: mockAuthors[4],
    category: "health",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Biohacking", "Health", "Wellness", "Longevity"],
    publishedAt: "2024-05-31T19:45:00Z",
    updatedAt: "2024-05-31T19:45:00Z",
    readTime: 5,
    likes: 112,
    comments: 11,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "7c8d9e0f-7u8v-1w2x-3y4z-5a6b7c8d9e0f",
    title: "The Power of Open Source: Collaboration at Scale",
    description:
      "How open source software is driving innovation and empowering developers worldwide.",
    content: `
      <h2>Open Source Movement</h2>
      <p>Open source projects like Linux, React, and Kubernetes have changed the way we build software.</p>
      <h3>Getting Involved</h3>
      <p>Contribute to projects, learn from others, and help shape the future of technology.</p>
      <h3>Why It Matters</h3>
      <p>Open source fosters transparency, collaboration, and rapid innovation.</p>
    `,
    author: mockAuthors[0],
    category: "technology",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Open Source", "Collaboration", "Software", "Innovation"],
    publishedAt: "2024-05-30T08:30:00Z",
    updatedAt: "2024-05-30T08:30:00Z",
    readTime: 6,
    likes: 140,
    comments: 13,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "8d9e0f1a-8v9w-2x3y-4z5a-6b7c8d9e0f1a",
    title: "The Psychology of Color in Design",
    description:
      "How color choices influence user perception and behavior in digital products.",
    content: `
      <h2>Color Theory in UX</h2>
      <p>Colors can evoke emotions, guide attention, and influence decisions. Learn how to use color effectively in your designs.</p>
      <h3>Best Practices</h3>
      <p>Use color to create hierarchy, improve accessibility, and reinforce branding.</p>
      <h3>Case Studies</h3>
      <p>See how top brands use color to stand out and connect with users.</p>
    `,
    author: mockAuthors[1],
    category: "design",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Color", "Design", "UX", "Psychology"],
    publishedAt: "2024-05-29T14:00:00Z",
    updatedAt: "2024-05-29T14:00:00Z",
    readTime: 4,
    likes: 100,
    comments: 8,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "9e0f1a2b-9w0x-3y4z-5a6b-7c8d9e0f1a2b",
    title: "Startup Funding: Navigating the VC Landscape",
    description:
      "A practical guide to raising venture capital for your startup.",
    content: `
      <h2>Understanding Venture Capital</h2>
      <p>Learn how to pitch, what investors look for, and how to structure your funding rounds.</p>
      <h3>Common Mistakes</h3>
      <p>Avoid pitfalls like overvaluing your company or neglecting due diligence.</p>
      <h3>Success Stories</h3>
      <p>Hear from founders who have successfully raised capital and scaled their startups.</p>
    `,
    author: mockAuthors[2],
    category: "business",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Startup", "Funding", "VC", "Business"],
    publishedAt: "2024-05-28T20:15:00Z",
    updatedAt: "2024-05-28T20:15:00Z",
    readTime: 6,
    likes: 125,
    comments: 14,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
  {
    id: "0f1a2b3c-0x1y-4z5a-6b7c-8d9e0f1a2b3c",
    title: "Science Communication: Making Research Accessible",
    description:
      "Tips for scientists and communicators to share research with a wider audience.",
    content: `
      <h2>Bridging the Gap</h2>
      <p>Effective science communication helps the public understand and trust scientific discoveries.</p>
      <h3>Strategies</h3>
      <p>Use clear language, tell stories, and leverage digital media to reach more people.</p>
      <h3>Impact</h3>
      <p>Good communication can influence policy, funding, and public perception.</p>
    `,
    author: mockAuthors[3],
    category: "science",
    thumbnail:
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    tags: ["Science", "Communication", "Research", "Public"],
    publishedAt: "2024-05-27T11:00:00Z",
    updatedAt: "2024-05-27T11:00:00Z",
    readTime: 5,
    likes: 108,
    comments: 10,
    isLiked: false,
    views: 20,
    featured: false,
    images: [
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
    ],
    isBookmarked: false,
  },
];

// Generate more items for pagination testing
export const generateMoreItems = (count: number = 20): FeedItem[] => {
  const categories: FeedItem["category"][] = [
    "technology",
    "business",
    "science",
    "health",
    "entertainment",
  ];
  const items: FeedItem[] = [];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const author = mockAuthors[Math.floor(Math.random() * mockAuthors.length)];

    // Generate more realistic English titles and descriptions
    const titleTemplates = [
      `The Future of ${category.charAt(0).toUpperCase() + category.slice(1)}: ${faker.company.catchPhrase()}`,
      `How ${faker.word.noun()} is Changing ${category.charAt(0).toUpperCase() + category.slice(1)}`,
      `${faker.person.fullName()} on ${faker.word.noun()} and ${category}`,
      `Top Trends in ${category.charAt(0).toUpperCase() + category.slice(1)} for ${faker.date.future().getFullYear()}`,
      `A Guide to ${faker.word.noun()} in ${category.charAt(0).toUpperCase() + category.slice(1)}`,
      `Exploring the Impact of ${faker.word.noun()} on ${category.charAt(0).toUpperCase() + category.slice(1)}`,
    ];
    const title = faker.helpers.arrayElement(titleTemplates);

    const description =
      faker.helpers.arrayElement([
        `Discover the latest insights and trends in ${category}.`,
        `An in-depth look at how ${category} is evolving in today's world.`,
        `Expert analysis on the future of ${category}.`,
        `Key developments shaping the ${category} landscape.`,
        `What you need to know about ${category} right now.`,
      ]) +
      " " +
      faker.lorem.sentence();

    const content = `
      <h2>${title}</h2>
      <p>${faker.lorem.paragraph()}</p>
      <h3>${faker.helpers.arrayElement([
        "Key Takeaways",
        "Expert Insights",
        "Latest Developments",
        "What’s Next?",
        "Practical Applications",
      ])}</h3>
      <p>${faker.lorem.paragraph()}</p>
      <h3>${faker.helpers.arrayElement([
        "Challenges Ahead",
        "Opportunities",
        "Industry Impact",
        "Looking Forward",
        "Conclusion",
      ])}</h3>
      <p>${faker.lorem.paragraph()}</p>
      <blockquote>${faker.helpers.arrayElement([
        "Innovation distinguishes between a leader and a follower.",
        "The best way to predict the future is to invent it.",
        "Change is the only constant in life.",
        "Great things never come from comfort zones.",
        "Success is not the key to happiness. Happiness is the key to success.",
      ])}</blockquote>
      <p>${faker.lorem.paragraph()}</p>
    `;

    items.push({
      id: uuidv4(),
      title,
      description,
      content,
      author,
      category,
      thumbnail:
        "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      tags: [category, faker.word.noun(), faker.word.noun(), faker.word.noun()],
      publishedAt: faker.date.recent({ days: 30 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
      readTime: Math.floor(Math.random() * 10) + 3,
      likes: faker.number.int({ min: 10, max: 1000 }),
      comments: faker.number.int({ min: 0, max: 120 }),
      isLiked: Math.random() > 0.7,
      views: faker.number.int({ min: 20, max: 2000 }),
      featured: Math.random() > 0.8,
      images: [
        "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",

        "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",

        "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png",
      ],
      isBookmarked: Math.random() > 0.8,
    });
  }

  return items;
};

// Combine original and generated items
export const allMockFeedItems = [...mockFeedItems];

// Mock current user
export const mockCurrentUser: User = {
  id: "g6d2e3f4-6i7j-9k8l-2m3n-7o8p9q0r1s2t",
  name: "Temiloluwa Alabi",
  email: "temiloluwaalabi33@gmail.com",
  password: "Adeleke148@!!",
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
