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
  IconButton,
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
} from '@tabler/icons-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering to prevent static generation during build
export const dynamic = 'force-dynamic';

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

// Static data
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
];

const sampleCategories = [
  { category: "Technology", count: 5 },
  { category: "Science", count: 3 },
  { category: "Business", count: 2 },
  { category: "Environment", count: 2 },
  { category: "Health", count: 1 },
];

// small meta line
function Meta({ article }: { article: Article }) {
  return (
    <Box className="flex flex-wrap gap-1 items-center text-neutral-600 mt-1">
      <Typography level="body-xs">{article.date}</Typography>
      <Typography level="body-xs">•</Typography>
      <Box className="flex items-center gap-0.5">
        <IconClock size={14} />
        <Typography level="body-xs">{article.readTime}</Typography>
      </Box>
      <Typography level="body-xs">•</Typography>
      <Box className="flex items-center gap-0.5">
        <IconEye size={14} />
        <Typography level="body-xs">{article.views}</Typography>
      </Box>
    </Box>
  );
}

export default async function ArticlesHome() {
  const { data: articles, error: articlesError } = await supabase
    .from('articles')
    .select('*')
    .order('published_date', { ascending: false });

  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*');

  if (articlesError || categoriesError) {
    return (
      <Box className="max-w-4xl mx-auto mt-12 px-4">
        <Alert color="danger" variant="soft">
          Error loading data: {articlesError?.message || categoriesError?.message}
        </Alert>
      </Box>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <Box className="max-w-4xl mx-auto mt-12 px-4">
        <Alert color="warning" variant="soft">
          No articles found. Please run the migration script to populate data.
        </Alert>
      </Box>
    );
  }

  // Transform articles to match display format
  const transformArticle = (article: Article) => ({
    ...article,
    excerpt: article.content.substring(0, 150) + '...',
    imageUrl: article.image_url,
    date: new Date(article.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: `${Math.ceil(article.content.split(' ').length / 200)} min read`,
    views: `${Math.floor(Math.random() * 50) + 1}k views`,
  });

  const transformedArticles = articles.map(transformArticle);

  const heroMain = transformedArticles[0] || {};
  const heroSide = transformedArticles.slice(1, 4);
  const editorsChoice = transformedArticles.slice(4, 7);
  const recentPosts = transformedArticles.slice(7, 10);
  const trendingMain = transformedArticles[10] || transformedArticles[0] || {};
  const trendingGrid = transformedArticles.slice(11, 15);
  const weeklyBest = transformedArticles.slice(15, 19);
  const popularSide = transformedArticles.slice(19, 22);

  return (
    <Box className="bg-background-body min-h-screen">
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
          <Typography
            level="h3"
            fontWeight={800}
            component={Link}
            href="/"
            className="no-underline text-inherit"
          >
            Blogs
          </Typography>

          <Box className="hidden md:flex items-center gap-4">
            {[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about' },
              { label: 'Features', href: '/features' },
              { label: 'Categories', href: '/categories' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Typography
                key={item.label}
                level="body-sm"
                component={Link}
                href={item.href}
                className="cursor-pointer no-underline text-inherit hover:text-primary-plainColor"
              >
                {item.label}
              </Typography>
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
      <Box className="max-w-6xl mx-auto px-4 py-6">
        {/* HERO SECTION */}
        <Grid container spacing={5}>
          <Grid xs={12} md={8}>
            <Card
              component={Link}
              href={`/articles/${heroMain.id}`}
              variant="outlined"
              className="p-0 overflow-hidden text-white no-underline cursor-pointer"
            >
              <AspectRatio ratio="16/9">
                <Box
                  component="img"
                  src={heroMain.imageUrl}
                  alt={heroMain.title}
                  loading="lazy"
                />
              </AspectRatio>
              <Box className="p-6">
                <Chip size="sm" color="primary" variant="solid">
                  {heroMain.category}
                </Chip>
                <Typography level="h2" className="mt-3 mb-2">
                  {heroMain.title}
                </Typography>
                <Typography level="body-sm" className="mb-3">
                  {heroMain.excerpt}
                </Typography>
                <Meta article={heroMain} />
              </Box>
            </Card>
          </Grid>

          {/* right blue blogs */}
          <Grid xs={12} md={4}>
            <Stack spacing={2} className="h-full">
              {heroSide.map((a) => (
                <Card
                  key={a.id}
                  component={Link}
                  href={`/articles/${a.id}`}
                  variant="outlined"
                  className="p-1 overflow-hidden cursor-pointer text-white no-underline"
                >
                  <Box className="flex">
                    <Box className="flex-5/6">
                      <AspectRatio ratio="4/5">
                        <Box
                          component="img"
                          src={a.imageUrl}
                          alt={a.title}
                          loading="lazy"
                        />
                      </AspectRatio>
                    </Box>
                    <Box className="flex-2/3 p-3">
                      <Chip size="sm" variant="outlined" color="primary">
                        {a.category}
                      </Chip>
                      <Typography
                        level="body-sm"
                        fontWeight={600}
                        className="mt-1.5 line-clamp-2 overflow-hidden"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {a.title}
                      </Typography>
                      <Meta article={a} />
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Color banner */}
        <Card
          variant="soft"
          color="primary"
          className="mt-6 mb-4 flex items-center justify-between flex-wrap gap-3"
        >
          <Typography level="title-lg">Modern Technology Fest Here</Typography>
          <Button
            variant="solid"
            size="sm"
            component={Link}
            href="/events/modern-technology-fest"
          >
            See Details
          </Button>
        </Card>

        {/* EDITORS CHOICE */}
        <Grid container spacing={5} className="mb-6">
          <Grid xs={12}>
            <Box className="flex justify-between mb-2 items-center">
              <Typography level="title-lg">Editor's Choice</Typography>
              <Typography
                level="body-xs"
                color="primary"
                component={Link}
                href="/articles?filter=editors-choice"
                className="cursor-pointer no-underline"
              >
                View all
              </Typography>
            </Box>
          </Grid>
          {editorsChoice.map((a) => (
            <Grid key={a.id} xs={12} md={4}>
              <Card
                variant="outlined"
                className="h-full cursor-pointer no-underline"
                component={Link}
                href={`/articles/${a.id}`}
              >
                <AspectRatio ratio="16/10">
                  <Box
                    component="img"
                    src={a.imageUrl}
                    alt={a.title}
                    loading="lazy"
                  />
                </AspectRatio>
                <Stack spacing={1.5} className="mt-2">
                  <Chip size="sm" variant="soft" color="primary">
                    {a.category}
                  </Chip>
                  <Typography level="title-sm">{a.title}</Typography>
                  <Meta article={a} />
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* RECENT POSTS + RIGHT SIDEBAR */}
        <Grid container spacing={5}>
          <Grid xs={12} md={8}>
            <Box className="flex justify-between mb-2 items-center">
              <Typography level="title-lg">Recent Posts</Typography>
              <Typography
                level="body-xs"
                color="primary"
                className="cursor-pointer"
                component={Link}
                href="/articles"
              >
                View all
              </Typography>
            </Box>

            {/* Main recent card */}
            {recentPosts.length > 0 && (
              <Card
                variant="outlined"
                className="mb-5 cursor-pointer no-underline"
                component={Link}
                href={`/articles/${recentPosts[0].id}`}
              >
              <Grid container spacing={4}>
                <Grid xs={12} sm={7}>
                  <AspectRatio ratio="16/9">
                    <Box
                      component="img"
                      src={recentPosts[0].imageUrl}
                      alt={recentPosts[0].title}
                      loading="lazy"
                    />
                  </AspectRatio>
                </Grid>
                <Grid xs={12} sm={5}>
                  <Stack spacing={2}>
                    <Chip size="sm" color="primary" variant="soft">
                      {recentPosts[0].category}
                    </Chip>
                    <Typography level="title-md">
                      {recentPosts[0].title}
                    </Typography>
                    <Typography level="body-sm" color="neutral">
                      {recentPosts[0].excerpt}
                    </Typography>
                    <Meta article={recentPosts[0]} />
                  </Stack>
                </Grid>
              </Grid>
            </Card>
            )}

            {/* two small recent cards */}
            <Grid container spacing={4}>
              {recentPosts.slice(1).map((a) => (
                <Grid key={a.id} xs={12} sm={6}>
                  <Card
                    variant="outlined"
                    component={Link}
                    href={`/articles/${a.id}`}
                    className="cursor-pointer no-underline"
                  >
                    <AspectRatio ratio="16/10">
                      <Box
                        component="img"
                        src={a.imageUrl}
                        alt={a.title}
                        loading="lazy"
                      />
                    </AspectRatio>
                    <Stack spacing={1.5} className="mt-2">
                      <Chip size="sm" variant="soft" color="primary">
                        {a.category}
                      </Chip>
                      <Typography level="title-sm">{a.title}</Typography>
                      <Meta article={a} />
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Sidebar */}
          <Grid xs={12} md={4}>
            <Stack spacing={5}>
              {/* Newsletter */}
              <Card
                variant="solid"
                color="neutral"
                className="text-white"
              >
                <Typography level="title-md" className="mb-1" sx={{ color: 'white' }}>
                  Daily Newsletter
                </Typography>
                <Typography level="body-xs" className="mb-3" sx={{ color: 'white' }}>
                  Get all the top stories from Tech News today.
                </Typography>
                <Stack spacing={2}>
                  <Input size="sm" placeholder="Your email" variant="soft" />
                  <Button size="sm" variant="solid">
                    Subscribe
                  </Button>
                </Stack>
              </Card>

              {/* Hot categories */}
              <Card variant="outlined">
                <Typography level="title-md" className="mb-2">
                  Hot Categories
                </Typography>
                <Stack spacing={2}>
                  {categories.slice(0, 4).map((cat, index) => (
                    <Sheet
                      key={cat.category}
                      variant="soft"
                      className="flex items-center justify-between py-2 px-3 rounded-sm cursor-pointer"
                      component={Link}
                      href={`/categories/${cat.category.toLowerCase()}`}
                    >
                      <Box className="flex items-center gap-2">
                        <AspectRatio ratio="1" className="w-10">
                          <Box
                            component="img"
                            src={`https://images.unsplash.com/photo-15${
                              index + 1
                            }8770660439-4636190af475?w=400&q=80`}
                            alt={cat.category}
                            loading="lazy"
                          />
                        </AspectRatio>
                        <Typography level="body-sm">{cat.category}</Typography>
                      </Box>
                      <Typography level="body-xs" color="neutral">
                        {cat.count} posts
                      </Typography>
                    </Sheet>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Banner */}
        <Card
          variant="soft"
          color="primary"
          className="mt-6 mb-4 flex items-center justify-between flex-wrap gap-3"
        >
          <Typography level="title-lg">Modern Technology Fest Here</Typography>
          <Button
            size="sm"
            variant="outlined"
            component={Link}
            href="/events/modern-technology-fest"
          >
            See Details
          </Button>
        </Card>

        {/* TRENDING */}
        <Grid container spacing={5}>
          <Grid xs={12} md={8}>
            <Box className="flex justify-between mb-2 items-center">
              <Typography level="title-lg">Trending News</Typography>
              <Typography
                level="body-xs"
                color="primary"
                className="cursor-pointer"
                component={Link}
                href="/articles?filter=trending"
              >
                View all
              </Typography>
            </Box>
            <Card
              variant="outlined"
              className="mb-4"
            >
              <AspectRatio ratio="16/9">
                <Box
                  component="img"
                  src={trendingMain.imageUrl}
                  alt={trendingMain.title}
                  loading="lazy"
                />
              </AspectRatio>
              <Stack spacing={2} className="mt-3">
                <Chip size="sm" color="primary" variant="soft">
                  {trendingMain.category}
                </Chip>
                <Typography level="title-lg">
                  {trendingMain.title}
                </Typography>
                <Typography level="body-sm" color="neutral">
                  {trendingMain.excerpt}
                </Typography>
                <Meta article={trendingMain} />
                <Button
                  size="sm"
                  variant="outlined"
                  className="self-start mt-2"
                  component={Link}
                  href={`/articles/${trendingMain.id}`}
                >
                  Read more
                </Button>
              </Stack>
            </Card>

            {/* bottom trending grid */}
            <Grid container spacing={4}>
              {trendingGrid.map((a) => (
                <Grid key={a.id} xs={12} sm={3}>
                  <Card
                    variant="outlined"
                    className="p-0 cursor-pointer no-underline"
                    component={Link}
                    href={`/articles/${a.id}`}
                  >
                    <AspectRatio ratio="4/3">
                      <Box
                        component="img"
                        src={a.imageUrl}
                        alt={a.title}
                        loading="lazy"
                      />
                    </AspectRatio>
                    <Box className="p-2">
                      <Chip size="sm" variant="soft" color="primary">
                        {a.category}
                      </Chip>
                      <Typography
                        level="body-sm"
                        fontWeight={600}
                        className="mt-1 line-clamp-2 overflow-hidden"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {a.title}
                      </Typography>
                      <Meta article={a} />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* right green promo + popular posts */}
          <Grid xs={12} md={4}>
            <Stack spacing={5}>
              <Card
                variant="soft"
                className="bg-green-200 border-transparent"
              >
                <Typography level="title-sm" color="success">
                  Featured Product
                </Typography>
                <Typography level="h4" className="mt-1">
                  iPhone 14 Pro Max 2023
                </Typography>
                <Typography level="body-sm" className="mt-1 mb-3">
                  Enhanced build, A16 Bionic chip, smart camera and always-on
                  display.
                </Typography>
                <Button size="sm" variant="solid" color="success">
                  Shop Online
                </Button>
              </Card>

              <Card variant="outlined">
                <Typography level="title-md" className="mb-2">
                  Popular Posts
                </Typography>
                <Stack spacing={3}>
                  {popularSide.map((a) => (
                    <Box
                      key={a.id}
                      component={Link}
                      href={`/articles/${a.id}`}
                      className="flex gap-2 items-start cursor-pointer no-underline"
                    >
                      <AspectRatio ratio="4/3" className="w-20 flex-shrink-0">
                        <Box
                          component="img"
                          src={a.imageUrl}
                          alt={a.title}
                          loading="lazy"
                        />
                      </AspectRatio>
                      <Box className="flex-1">
                        <Chip
                          size="sm"
                          variant="soft"
                          color="primary"
                          className="mb-1"
                        >
                          {a.category}
                        </Chip>
                        <Typography
                          level="body-sm"
                          fontWeight={600}
                          className="line-clamp-2 overflow-hidden"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {a.title}
                        </Typography>
                        <Meta article={a} />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* image strip */}
        <Grid container spacing={5} className="mt-6">
          {[1, 2, 3, 4].map((i) => (
            <Grid key={i} xs={12} sm={3}>
              <AspectRatio ratio="4/3">
                <Box
                  component="img"
                  src={`https://images.unsplash.com/photo-16${
                    i + 20
                  }7048676732-d65bc937f952?w=800&q=80`}
                  alt="Gallery"
                  loading="lazy"
                />
              </AspectRatio>
            </Grid>
          ))}
        </Grid>

        {/* WEEKLY BEST + right column */}
        <Grid container spacing={5} className="mt-6">
          <Grid xs={12} md={8}>
            <Box className="flex justify-between mb-2 items-center">
              <Typography level="title-lg">Weekly Best News</Typography>
              <Typography
                level="body-xs"
                color="primary"
                className="cursor-pointer"
                component={Link}
                href="/articles?filter=weekly-best"
              >
                View all
              </Typography>
            </Box>
            <Card variant="outlined">
              <Stack divider={<Divider />} spacing={2.5}>
                {weeklyBest.map((a) => (
                  <Box
                    key={a.id}
                    component={Link}
                    href={`/articles/${a.id}`}
                    className="flex gap-3 py-3 cursor-pointer no-underline"
                  >
                    <AspectRatio ratio="4/3" className="w-40 flex-shrink-0">
                      <Box
                        component="img"
                        src={a.imageUrl}
                        alt={a.title}
                        loading="lazy"
                      />
                    </AspectRatio>
                    <Box className="flex-1">
                      <Chip
                        size="sm"
                        variant="soft"
                        color="primary"
                        className="mb-1"
                      >
                        {a.category}
                      </Chip>
                      <Typography level="title-sm">{a.title}</Typography>
                      <Typography
                        level="body-xs"
                        color="neutral"
                        className="mt-1"
                      >
                        {a.excerpt}
                      </Typography>
                      <Meta article={a} />
                      <Button
                        size="sm"
                        variant="plain"
                        className="p-0 mt-1"
                        endDecorator={<IconHeart size={14} />}
                      >
                        Read More
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Stack spacing={5}>
              <Card
                variant="solid"
                color="primary"
                className="bg-gradient-to-r from-slate-900 via-blue-900 to-green-900 text-white"
              >
                <Typography level="title-md" className="mb-2" sx={{ color: 'white' }}>
                  Automation Discount
                </Typography>
                <Typography level="body-sm" className="mb-3" sx={{ color: 'white' }}>
                  20% off on all automation & cloud infrastructure courses
                  this week only.
                </Typography>
                <Button size="sm" variant="soft">
                  Learn More
                </Button>
              </Card>

              <Card variant="outlined">
                <Typography level="title-md" className="mb-2">
                  Popular Tech
                </Typography>
                <Stack spacing={2}>
                  {popularSide.slice(0, 3).map((a) => (
                    <Box
                      key={a.id}
                      component={Link}
                      href={`/articles/${a.id}`}
                      className="flex gap-2 items-start cursor-pointer no-underline"
                    >
                      <AspectRatio ratio="4/3" className="w-20">
                        <Box
                          component="img"
                          src={a.imageUrl}
                          alt={a.title}
                          loading="lazy"
                        />
                      </AspectRatio>
                      <Box className="flex-1">
                        <Typography
                          level="body-sm"
                          fontWeight={600}
                          className="line-clamp-2 overflow-hidden"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {a.title}
                        </Typography>
                        <Meta article={a} />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
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
