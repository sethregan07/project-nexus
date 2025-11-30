'use client';

import * as React from 'react';
import {
  Box,
  Sheet,
  Card,
  Typography,
  Grid,
  Stack,
  AspectRatio,
  Chip,
  Button,
  Input,
  Divider,
  Avatar,
  CircularProgress,
  Alert,
} from '@mui/joy';
import {
  IconSearch,
  IconClock,
  IconEye,
  IconHeart,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconFilter,
} from '@tabler/icons-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import LikeButton from '@/components/LikeButton';

interface Article {
  id: number;
  title: string;
  content: string;
  author?: string;
  image_url?: string;
  category?: string;
  published_date: string;
  created_at: string;
  updated_at: string;
  excerpt?: string;
  imageUrl?: string;
  date?: string;
  readTime?: string;
  views?: string;
}

// Extended static data with more articles
const sampleArticles: Article[] = [
  {
    id: 1,
    title: "The Future of AI in Technology",
    content: "Artificial Intelligence is revolutionizing the way we live and work. From machine learning algorithms to neural networks, AI is becoming an integral part of our daily lives. This comprehensive article explores the latest developments in AI technology and their potential impact on various industries.",
    author: "John Doe",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-30T10:00:00Z",
    created_at: "2024-11-30T10:00:00Z",
    updated_at: "2024-11-30T10:00:00Z",
  },
  {
    id: 2,
    title: "Sustainable Energy Solutions for 2024",
    content: "As the world moves towards renewable energy sources, innovative solutions are emerging to combat climate change. Solar, wind, and hydroelectric power are leading the charge in creating a sustainable future.",
    author: "Jane Smith",
    image_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    category: "Environment",
    published_date: "2024-11-29T14:30:00Z",
    created_at: "2024-11-29T14:30:00Z",
    updated_at: "2024-11-29T14:30:00Z",
  },
  {
    id: 3,
    title: "The Rise of Remote Work Culture",
    content: "The pandemic accelerated the adoption of remote work, and now companies are embracing flexible work arrangements. This article discusses the benefits, challenges, and best practices for successful remote work implementation.",
    author: "Mike Johnson",
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    category: "Business",
    published_date: "2024-11-28T09:15:00Z",
    created_at: "2024-11-28T09:15:00Z",
    updated_at: "2024-11-28T09:15:00Z",
  },
  {
    id: 4,
    title: "Advancements in Quantum Computing",
    content: "Quantum computing represents the next frontier in computational power. This article delves into recent breakthroughs and their potential applications in cryptography, drug discovery, and complex problem-solving.",
    author: "Sarah Wilson",
    image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    category: "Science",
    published_date: "2024-11-27T16:45:00Z",
    created_at: "2024-11-27T16:45:00Z",
    updated_at: "2024-11-27T16:45:00Z",
  },
  {
    id: 5,
    title: "The Impact of 5G Technology",
    content: "5G networks are transforming connectivity and enabling new technologies. From IoT devices to autonomous vehicles, 5G is paving the way for innovations that were previously impossible.",
    author: "David Brown",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-26T11:20:00Z",
    created_at: "2024-11-26T11:20:00Z",
    updated_at: "2024-11-26T11:20:00Z",
  },
  {
    id: 6,
    title: "Mental Health in the Digital Age",
    content: "As technology becomes more integrated into our lives, the importance of mental health awareness grows. This article explores the effects of digital connectivity on mental well-being and strategies for maintaining balance.",
    author: "Lisa Chen",
    image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    category: "Health",
    published_date: "2024-11-25T13:10:00Z",
    created_at: "2024-11-25T13:10:00Z",
    updated_at: "2024-11-25T13:10:00Z",
  },
  {
    id: 7,
    title: "Blockchain Beyond Cryptocurrency",
    content: "While blockchain technology gained fame through cryptocurrencies, its applications extend far beyond digital money. This article examines blockchain's role in supply chain management, voting systems, and secure data sharing.",
    author: "Tom Anderson",
    image_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-24T15:35:00Z",
    created_at: "2024-11-24T15:35:00Z",
    updated_at: "2024-11-24T15:35:00Z",
  },
  {
    id: 8,
    title: "The Evolution of Electric Vehicles",
    content: "Electric vehicles are revolutionizing transportation. From Tesla's innovations to traditional automakers' adaptations, EVs are becoming more accessible and efficient. This article covers the latest developments and future trends.",
    author: "Emma Davis",
    image_url: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&q=80",
    category: "Automotive",
    published_date: "2024-11-23T12:50:00Z",
    created_at: "2024-11-23T12:50:00Z",
    updated_at: "2024-11-23T12:50:00Z",
  },
  {
    id: 9,
    title: "Cybersecurity in the IoT Era",
    content: "As Internet of Things devices proliferate, cybersecurity becomes increasingly critical. This article discusses current threats, best practices, and emerging technologies for protecting connected devices and networks.",
    author: "Robert Taylor",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    category: "Security",
    published_date: "2024-11-22T10:25:00Z",
    created_at: "2024-11-22T10:25:00Z",
    updated_at: "2024-11-22T10:25:00Z",
  },
  {
    id: 10,
    title: "The Future of Space Exploration",
    content: "Space exploration is entering a new era with private companies and international collaborations. This article explores upcoming missions, technological advancements, and the potential for human settlement beyond Earth.",
    author: "Anna Martinez",
    image_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    category: "Science",
    published_date: "2024-11-21T14:40:00Z",
    created_at: "2024-11-21T14:40:00Z",
    updated_at: "2024-11-21T14:40:00Z",
  },
  {
    id: 11,
    title: "Augmented Reality in Education",
    content: "Augmented reality is transforming education by providing immersive learning experiences. From interactive textbooks to virtual field trips, AR technology is making learning more engaging and effective.",
    author: "Chris Lee",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    category: "Education",
    published_date: "2024-11-20T16:55:00Z",
    created_at: "2024-11-20T16:55:00Z",
    updated_at: "2024-11-20T16:55:00Z",
  },
  {
    id: 12,
    title: "Sustainable Fashion Movement",
    content: "The fashion industry is undergoing a sustainability revolution. This article examines eco-friendly materials, ethical manufacturing practices, and consumer trends shaping the future of sustainable fashion.",
    author: "Maria Garcia",
    image_url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    category: "Fashion",
    published_date: "2024-11-19T11:30:00Z",
    created_at: "2024-11-19T11:30:00Z",
    updated_at: "2024-11-19T11:30:00Z",
  },
  {
    id: 13,
    title: "The Rise of Voice Technology",
    content: "Voice assistants and speech recognition are becoming ubiquitous. This article explores the technology behind voice interfaces, current applications, and future developments in voice-controlled systems.",
    author: "Kevin White",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-18T13:15:00Z",
    created_at: "2024-11-18T13:15:00Z",
    updated_at: "2024-11-18T13:15:00Z",
  },
  {
    id: 14,
    title: "Urban Farming Innovations",
    content: "As cities grow, urban farming offers solutions for local food production. This article discusses vertical farming, hydroponics, and other innovative approaches to sustainable urban agriculture.",
    author: "Rachel Green",
    image_url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    category: "Agriculture",
    published_date: "2024-11-17T15:20:00Z",
    created_at: "2024-11-17T15:20:00Z",
    updated_at: "2024-11-17T15:20:00Z",
  },
  {
    id: 15,
    title: "The Psychology of Social Media",
    content: "Social media platforms shape our behavior and mental health. This article examines the psychological effects of social networking, addiction patterns, and strategies for healthy digital habits.",
    author: "Daniel Kim",
    image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    category: "Psychology",
    published_date: "2024-11-16T10:45:00Z",
    created_at: "2024-11-16T10:45:00Z",
    updated_at: "2024-11-16T10:45:00Z",
  },
  {
    id: 16,
    title: "Advances in Medical Imaging",
    content: "Medical imaging technology continues to evolve, providing clearer and more accurate diagnoses. This article covers recent developments in MRI, CT scans, and emerging imaging techniques.",
    author: "Dr. Jennifer Adams",
    image_url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    category: "Medicine",
    published_date: "2024-11-15T12:00:00Z",
    created_at: "2024-11-15T12:00:00Z",
    updated_at: "2024-11-15T12:00:00Z",
  },
  {
    id: 17,
    title: "The Economics of Cryptocurrency",
    content: "Cryptocurrencies are reshaping financial systems worldwide. This article analyzes the economic implications, market dynamics, and regulatory challenges facing digital currencies.",
    author: "Michael Thompson",
    image_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    category: "Finance",
    published_date: "2024-11-14T14:25:00Z",
    created_at: "2024-11-14T14:25:00Z",
    updated_at: "2024-11-14T14:25:00Z",
  },
  {
    id: 18,
    title: "Climate Change Adaptation Strategies",
    content: "As climate change impacts become more evident, adaptation strategies are crucial. This article explores community resilience, infrastructure improvements, and policy approaches to climate adaptation.",
    author: "Dr. Laura Nelson",
    image_url: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&q=80",
    category: "Environment",
    published_date: "2024-11-13T16:10:00Z",
    created_at: "2024-11-13T16:10:00Z",
    updated_at: "2024-11-13T16:10:00Z",
  },
  {
    id: 19,
    title: "The Future of Work",
    content: "Work is evolving with technology and societal changes. This article examines trends in remote work, gig economy, automation, and the skills needed for future careers.",
    author: "James Wilson",
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    category: "Business",
    published_date: "2024-11-12T11:55:00Z",
    created_at: "2024-11-12T11:55:00Z",
    updated_at: "2024-11-12T11:55:00Z",
  },
  {
    id: 20,
    title: "Renewable Energy Storage Solutions",
    content: "Energy storage is key to renewable energy adoption. This article discusses battery technology, pumped hydro storage, and emerging solutions for efficient energy storage and distribution.",
    author: "Sophie Patel",
    image_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    category: "Energy",
    published_date: "2024-11-11T13:40:00Z",
    created_at: "2024-11-11T13:40:00Z",
    updated_at: "2024-11-11T13:40:00Z",
  },
  // Additional articles
  {
    id: 21,
    title: "The Rise of Edge Computing",
    content: "Edge computing is bringing processing power closer to data sources, enabling faster response times and reduced bandwidth usage. This article explores the benefits and challenges of edge computing implementations.",
    author: "Alex Chen",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-10T09:30:00Z",
    created_at: "2024-11-10T09:30:00Z",
    updated_at: "2024-11-10T09:30:00Z",
  },
  {
    id: 22,
    title: "Sustainable Architecture Trends",
    content: "Modern architecture is embracing sustainability with green building materials, energy-efficient designs, and smart technology integration. Discover the latest trends shaping the future of sustainable architecture.",
    author: "Emma Rodriguez",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    category: "Architecture",
    published_date: "2024-11-09T15:45:00Z",
    created_at: "2024-11-09T15:45:00Z",
    updated_at: "2024-11-09T15:45:00Z",
  },
  {
    id: 23,
    title: "The Future of Digital Payments",
    content: "Digital payment systems are evolving rapidly with new technologies like blockchain, biometrics, and AI-powered fraud detection. This comprehensive guide covers the latest developments in digital payments.",
    author: "David Park",
    image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    category: "Finance",
    published_date: "2024-11-08T11:20:00Z",
    created_at: "2024-11-08T11:20:00Z",
    updated_at: "2024-11-08T11:20:00Z",
  },
  {
    id: 24,
    title: "Advancements in Robotics",
    content: "Robotics technology continues to advance with new applications in manufacturing, healthcare, and consumer products. Explore the latest breakthroughs and future possibilities in robotics.",
    author: "Sarah Johnson",
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-07T14:10:00Z",
    created_at: "2024-11-07T14:10:00Z",
    updated_at: "2024-11-07T14:10:00Z",
  },
];

const sampleCategories = [
  { category: "Technology", count: 6 },
  { category: "Science", count: 2 },
  { category: "Business", count: 2 },
  { category: "Environment", count: 2 },
  { category: "Health", count: 1 },
  { category: "Automotive", count: 1 },
  { category: "Security", count: 1 },
  { category: "Education", count: 1 },
  { category: "Fashion", count: 1 },
  { category: "Agriculture", count: 1 },
  { category: "Psychology", count: 1 },
  { category: "Medicine", count: 1 },
  { category: "Finance", count: 2 },
  { category: "Energy", count: 1 },
  { category: "Architecture", count: 1 },
];

const staticSampleArticles: Article[] = [
  {
    id: 1,
    title: "The Future of AI in Technology",
    content: "Artificial Intelligence is revolutionizing the way we live and work. From machine learning algorithms to neural networks, AI is becoming an integral part of our daily lives. This comprehensive article explores the latest developments in AI technology and their potential impact on various industries.",
    author: "John Doe",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-30T10:00:00Z",
    created_at: "2024-11-30T10:00:00Z",
    updated_at: "2024-11-30T10:00:00Z",
  },
  // ... other sample articles
  {
    id: 24,
    title: "Advancements in Robotics",
    content: "Robotics technology continues to advance with new applications in manufacturing, healthcare, and consumer products. Explore the latest breakthroughs and future possibilities in robotics.",
    author: "Sarah Johnson",
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    category: "Technology",
    published_date: "2024-11-07T14:10:00Z",
    created_at: "2024-11-07T14:10:00Z",
    updated_at: "2024-11-07T14:10:00Z",
  },
];

export default function LatestArticlesPage() {
  const [supabaseArticles, setSupabaseArticles] = React.useState<Article[]>([]);
  const [allArticles, setAllArticles] = React.useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = React.useState<Article[]>([]);
  const [categories, setCategories] = React.useState<{category: string, count: number}[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const articlesPerPage = 12;

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch articles from Supabase
        const { data: articlesData, error: articlesError } = await supabase
          .from('articles')
          .select('*')
          .order('published_date', { ascending: false });

        if (articlesError) {
          console.error('Error fetching articles:', articlesError);
          // Fallback to static data if Supabase fails
          setSupabaseArticles([]);
          setAllArticles(sampleArticles);
          setError('Failed to load from database, showing sample data');
        } else {
          setSupabaseArticles(articlesData || []);
          setAllArticles(articlesData || []);
        }

        // Try to fetch categories, fallback to static if not available
        try {
          const { data: categoriesData, error: categoriesError } = await supabase
            .from('categories')
            .select('*');

          if (!categoriesError && categoriesData) {
            // Count articles per category
            const categoryCounts = categoriesData.map(cat => ({
              category: cat.category,
              count: articlesData?.filter(article => article.category === cat.category).length || 0
            }));
            setCategories(categoryCounts);
          } else {
            setCategories(sampleCategories);
          }
        } catch (catError) {
          console.log('Categories table not available, using sample data');
          setCategories(sampleCategories);
        }

      } catch (err) {
        console.error('Unexpected error:', err);
        // Fallback to static data
        setSupabaseArticles([]);
        setAllArticles(sampleArticles);
        setCategories(sampleCategories);
        setError('Failed to load data, showing sample content');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  React.useEffect(() => {
    let filtered = allArticles;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((article: Article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((article: Article) => article.category === selectedCategory);
    }

    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [allArticles, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const transformArticle = (article: Article) => ({
    ...article,
    excerpt: article.content.substring(0, 120) + '...',
    imageUrl: article.image_url,
    date: new Date(article.published_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    readTime: `${Math.ceil(article.content.split(' ').length / 200)} min read`,
    // Deterministic views based on article ID for hydration safety
    views: `${((article.id * 37) % 900) + 100} views`,
  });

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.body' }}>
      {/* Top header */}
      <Sheet
        variant="solid"
        color="neutral"
        className="py-1"
      >
        <Box className="max-w-6xl mx-auto px-4 flex items-center justify-between text-neutral-100">
          <Typography level="body-xs">Follow us on</Typography>
          <Box className="flex gap-1">
            <IconBrandFacebook size={16} />
            <IconBrandTwitter size={16} />
            <IconBrandInstagram size={16} />
            <IconBrandLinkedin size={16} />
          </Box>
        </Box>
      </Sheet>

      {/* Main nav */}
      <Sheet
        variant="outlined"
        className="border-0 border-b border-neutral-outlinedBorder bg-background-surface"
      >
        <Box className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="no-underline text-inherit">
            <Typography level="h3" fontWeight={800}>
              Blogs
            </Typography>
          </Link>

          <Box className="hidden md:flex items-center gap-4">
            {[
              { label: 'Home', href: '/' },
              { label: 'Latest', href: '/latest' },
              { label: 'Updates', href: '/updates' },
              { label: 'About Us', href: '/about' },
              { label: 'Features', href: '/features' },
              { label: 'Categories', href: '/categories' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="cursor-pointer no-underline text-inherit hover:text-primary-plainColor"
              >
                <Typography level="body-sm">
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Box>

          <Box className="flex gap-3 items-center">
            <Input
              size="sm"
              placeholder="Search news..."
              startDecorator={<IconSearch size={16} />}
              className="hidden sm:inline-flex min-w-48"
            />
            <Button
              size="sm"
              variant="outlined"
              component={Link}
              href="/signin"
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </Sheet>

      {/* Content container */}
      <Box className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <Box className="text-center mb-8">
          <Typography level="h1" className="text-4xl font-bold mb-4">
            Latest Articles
          </Typography>
          <Typography level="body-lg" color="neutral" className="max-w-2xl mx-auto">
            Discover our complete collection of articles covering the latest trends,
            insights, and breakthroughs across technology, science, and beyond.
          </Typography>
        </Box>

        {/* Error message */}
        {error && (
          <Box className="mb-6">
            <Alert color="warning" variant="soft">
              {error}
            </Alert>
          </Box>
        )}

        {/* Filters and Search */}
        <Box className="mb-8">
          <Stack spacing={3}>
            {/* Search Bar */}
            <Box className="flex justify-center">
              <Input
                size="lg"
                placeholder="Search articles..."
                startDecorator={<IconSearch size={20} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </Box>

            {/* Category Filters */}
            <Box className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'solid' : 'outlined'}
                color="primary"
                size="sm"
                onClick={() => setSelectedCategory('all')}
                startDecorator={<IconFilter size={16} />}
              >
                All Categories
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.category}
                  variant={selectedCategory === cat.category ? 'solid' : 'outlined'}
                  color="primary"
                  size="sm"
                  onClick={() => setSelectedCategory(cat.category)}
                >
                  {cat.category} ({cat.count})
                </Button>
              ))}
            </Box>

            {/* Results Info */}
            <Box className="text-center">
              <Typography level="body-sm" color="neutral">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} articles
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Supabase Articles Section */}
        {supabaseArticles.length > 0 && (
          <Box className="mb-12">
            <Box className="flex items-center gap-3 mb-6">
              <Typography level="h2" className="text-2xl font-bold">
                Supabase Articles
              </Typography>
              <Chip
                size="sm"
                variant="solid"
                color="success"
                className="text-xs"
              >
                Live Database ({supabaseArticles.length})
              </Chip>
            </Box>

            <Grid container spacing={4} className="mb-6">
              {supabaseArticles.map((article) => {
                const transformed = transformArticle(article);
                return (
                  <Grid key={`supabase-${article.id}`} xs={12} sm={6} md={4} lg={3}>
                    <Card
                      variant="outlined"
                      className="h-full cursor-pointer no-underline hover:shadow-lg transition-shadow border-green-200"
                      component={Link}
                      href={`/articles/${article.id}`}
                    >
                      <Box className="absolute top-2 right-2 z-10">
                        <Chip
                          size="sm"
                          variant="solid"
                          color="success"
                          className="text-xs"
                        >
                          DB
                        </Chip>
                      </Box>
                      <AspectRatio ratio="16/10">
                        <Box
                          component="img"
                          src={transformed.imageUrl}
                          alt={article.title}
                          loading="lazy"
                          className="object-cover"
                        />
                      </AspectRatio>
                      <Box className="p-4">
                        <Box className="flex items-center justify-between mb-2">
                          <Chip
                            size="sm"
                            variant="soft"
                            color="primary"
                            className="text-xs"
                          >
                            {article.category}
                          </Chip>
                          <Typography level="body-xs" color="neutral">
                            {transformed.date}
                          </Typography>
                        </Box>

                        <Typography
                          level="title-sm"
                          className="font-semibold mb-2 line-clamp-2 hover:text-primary-plainColor"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {article.title}
                        </Typography>

                        <Typography
                          level="body-xs"
                          color="neutral"
                          className="mb-3 line-clamp-2"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {transformed.excerpt}
                        </Typography>

                        <Box className="flex items-center justify-between text-xs text-neutral-500">
                          <Box className="flex items-center gap-1">
                            <IconClock size={12} />
                            <span>{transformed.readTime}</span>
                          </Box>
                          <Box className="flex items-center gap-1">
                            <IconEye size={12} />
                            <span>{transformed.views}</span>
                          </Box>
                        </Box>

                        <Box className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-200">
                          {article.author && (
                            <Box className="flex items-center gap-2">
                              <Avatar size="sm" />
                              <Typography level="body-xs" color="neutral">
                                {article.author}
                              </Typography>
                            </Box>
                          )}
                          <LikeButton
                            articleId={article.id}
                            size="sm"
                            variant="plain"
                          />
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}

        {/* Sample Articles Section */}
        <Box className="mb-12">
          <Box className="flex items-center gap-3 mb-6">
            <Typography level="h2" className="text-2xl font-bold">
              Sample Articles
            </Typography>
            <Chip
              size="sm"
              variant="solid"
              color="warning"
              className="text-xs"
            >
              Static Data ({sampleArticles.length})
            </Chip>
            {error && (
              <Chip
                size="sm"
                variant="soft"
                color="danger"
                className="text-xs"
              >
                Fallback Mode
              </Chip>
            )}
          </Box>

          <Grid container spacing={4} className="mb-6">
            {sampleArticles.map((article) => {
              const transformed = transformArticle(article);
              return (
                <Grid key={`sample-${article.id}`} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    variant="outlined"
                    className="h-full cursor-pointer no-underline hover:shadow-lg transition-shadow border-orange-200"
                    component={Link}
                    href={`/articles/${article.id}`}
                  >
                    <Box className="absolute top-2 right-2 z-10">
                      <Chip
                        size="sm"
                        variant="solid"
                        color="warning"
                        className="text-xs"
                      >
                        Sample
                      </Chip>
                    </Box>
                    <AspectRatio ratio="16/10">
                      <Box
                        component="img"
                        src={transformed.imageUrl}
                        alt={article.title}
                        loading="lazy"
                        className="object-cover"
                      />
                    </AspectRatio>
                    <Box className="p-4">
                      <Box className="flex items-center justify-between mb-2">
                        <Chip
                          size="sm"
                          variant="soft"
                          color="primary"
                          className="text-xs"
                        >
                          {article.category}
                        </Chip>
                        <Typography level="body-xs" color="neutral">
                          {transformed.date}
                        </Typography>
                      </Box>

                      <Typography
                        level="title-sm"
                        className="font-semibold mb-2 line-clamp-2 hover:text-primary-plainColor"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {article.title}
                      </Typography>

                      <Typography
                        level="body-xs"
                        color="neutral"
                        className="mb-3 line-clamp-2"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {transformed.excerpt}
                      </Typography>

                      <Box className="flex items-center justify-between text-xs text-neutral-500">
                        <Box className="flex items-center gap-1">
                          <IconClock size={12} />
                          <span>{transformed.readTime}</span>
                        </Box>
                        <Box className="flex items-center gap-1">
                          <IconEye size={12} />
                          <span>{transformed.views}</span>
                        </Box>
                      </Box>

                      <Box className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-200">
                        {article.author && (
                          <Box className="flex items-center gap-2">
                            <Avatar size="sm" />
                            <Typography level="body-xs" color="neutral">
                              {article.author}
                            </Typography>
                          </Box>
                        )}
                        <LikeButton
                          articleId={article.id}
                          size="sm"
                          variant="plain"
                        />
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      {/* Newsletter strip */}
      <Sheet
        variant="soft"
        className="mt-8 py-6 bg-neutral-100 border-t border-neutral-outlinedBorder"
      >
        <Box className="max-w-6xl mx-auto px-4 flex flex-wrap gap-4 items-center justify-between">
          <Box>
            <Typography level="title-lg">
              Get Our Latest News & Updates
            </Typography>
          </Box>
          <Box className="flex flex-wrap gap-2 items-center">
            <Input placeholder="Name" size="sm" />
            <Input placeholder="Email" size="sm" type="email" />
            <Button size="sm">Subscribe Now</Button>
          </Box>
        </Box>
      </Sheet>

      {/* Footer */}
      <Sheet
        variant="solid"
        color="neutral"
        className="bg-slate-900 text-neutral-100 py-8"
      >
        <Box className="max-w-6xl mx-auto px-4">
          <Grid container spacing={6}>
            <Grid xs={12} md={3}>
              <Typography
                level="h4"
                className="mb-2 no-underline text-inherit"
                component={Link}
                href="/"
              >
                zaira
              </Typography>
              <Typography level="body-xs" className="text-neutral-300">
                Beyond the buzz. We bring sharp stories, deep dives, and honest
                reviews straight from the world of technology & design.
              </Typography>
            </Grid>
            <Grid xs={6} md={3}>
              <Typography level="title-sm" className="mb-2">
                Company
              </Typography>
              <Stack spacing={1}>
                <Typography
                  level="body-xs"
                  component={Link}
                  href="/about"
                  className="no-underline text-inherit"
                >
                  About
                </Typography>
                <Typography level="body-xs">The Team</Typography>
                <Typography level="body-xs">Careers</Typography>
                <Typography level="body-xs">Jobs</Typography>
              </Stack>
            </Grid>
            <Grid xs={6} md={3}>
              <Typography level="title-sm" className="mb-2">
                Explore
              </Typography>
              <Stack spacing={1}>
                <Typography
                  level="body-xs"
                  component={Link}
                  href="/articles"
                  className="no-underline text-inherit"
                >
                  Articles
                </Typography>
                <Typography level="body-xs">Reviews</Typography>
                <Typography level="body-xs">Tech</Typography>
                <Typography level="body-xs">Design</Typography>
              </Stack>
            </Grid>
            <Grid xs={12} md={3}>
              <Typography level="title-sm" className="mb-2">
                Follow Us
              </Typography>
              <Box className="flex gap-2 mb-2">
                <IconBrandFacebook size={18} />
                <IconBrandTwitter size={18} />
                <IconBrandInstagram size={18} />
                <IconBrandLinkedin size={18} />
              </Box>
              <Typography level="body-xs" className="text-neutral-400">
                © 2024 Zaira News. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Sheet>
    </Box>
  );
}
