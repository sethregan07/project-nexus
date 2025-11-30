'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

import {
  Box,
  Grid,
  Card,
  Typography,
  Chip,
  Button,
  Stack,
  AspectRatio,
  Sheet,
  Divider,
  CircularProgress,
  Alert,
  List,
  ListItem,
  Table,
} from '@mui/joy';
import {
  IconArrowLeft,
  IconCalendar,
  IconUser,
  IconStar,
  IconCheck,
  IconX,
  IconListSearch,
} from '@tabler/icons-react';

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
}

// Static data (same as main page)
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
];

type Heading = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

// fallback content if article.content is empty
const defaultContent = `
# Game Changing Virtual Reality Console Technology To Serve The Community

Virtual reality (VR) is no longer just a playground for hardcore gamers. It's becoming a **shared space** for learning, collaboration, and social impact.

## Why This VR Console Is Different

Unlike traditional consoles that focus purely on entertainment, this platform was designed with *community* at its core:

* Local organizations can host virtual events for free
* Students can join immersive classrooms with low-cost hardware
* Remote teams can co-work in virtual offices without expensive tools

> "When people feel present together, even in a virtual space, collaboration becomes natural again."

### Core Features

1. **Ultra-low latency streaming**
2. **Hand and eye tracking for natural interaction**
3. **Open SDK for community developers**
4. **Built-in accessibility options**

## Real-World Use Cases

### 1. Education & Training

Schools are using VR to:

* Take students on historical field trips
* Simulate labs that are too dangerous or expensive in real life
* Offer personalized learning environments

### 2. Healthcare & Therapy

Clinics are starting to experiment with:

* Guided meditation spaces
* Exposure therapy simulations
* Group support environments

## Pros & Cons Snapshot

**Pros:** Accessible pricing, Strong developer ecosystem, Community-focused features, Cross-platform support
**Cons:** Requires stable internet, Hardware still not universal, Learning curve for new users

## Quick Comparison Table

| Feature               | This VR Console | Traditional Console |
|----------------------|-----------------|---------------------|
| Focus                | Community & Ed  | Entertainment       |
| Open SDK             | Yes             | Limited             |
| Cross-Device Support | High            | Medium              |
| Accessibility        | Built-in        | Varies              |

## Getting Started

To get started, you only need:

* A mid-range headset (or desktop client)
* Stable internet connection
* A free account to access community spaces

> "Technology should reduce distance, not increase it. This console is a step in that direction."

### Final Thoughts

The real promise of VR isn't just better graphics — it's **better connection**.
Used wisely, this console could turn virtual spaces into truly **shared public squares** for everyone.
`;

// slug helper
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

// build content + headings
function buildArticleContent(content: string): {
  nodes: React.ReactNode[];
  headings: Heading[];
} {
  const sections = content.split('\n\n');
  const nodes: React.ReactNode[] = [];
  const headings: Heading[] = [];

  sections.forEach((section, index) => {
    const trimmed = section.trim();
    if (!trimmed) return;

    // headings
    if (trimmed.startsWith('# ')) {
      const text = trimmed.substring(2).trim();
      const id = slugify(text);
      headings.push({ id, text, level: 1 });
      nodes.push(
        <Typography
          key={index}
          id={id}
          level="h2"
          className="text-4xl font-bold mb-4 mt-6"
        >
          {text}
        </Typography>,
      );
      return;
    }
    if (trimmed.startsWith('## ')) {
      const text = trimmed.substring(3).trim();
      const id = slugify(text);
      headings.push({ id, text, level: 2 });
      nodes.push(
        <Typography
          key={index}
          id={id}
          level="h3"
          className="text-2xl font-semibold mb-3 mt-5"
        >
          {text}
        </Typography>,
      );
      return;
    }
    if (trimmed.startsWith('### ')) {
      const text = trimmed.substring(4).trim();
      const id = slugify(text);
      headings.push({ id, text, level: 3 });
      nodes.push(
        <Typography
          key={index}
          id={id}
          level="h4"
          className="text-xl font-medium mb-2 mt-4"
        >
          {text}
        </Typography>,
      );
      return;
    }

    // image ![alt](url)
    if (trimmed.startsWith('![')) {
      const match = trimmed.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (match) {
        nodes.push(
          <AspectRatio
            key={index}
            ratio="16/9"
            className="my-6 rounded-lg overflow-hidden"
          >
            <Box
              component="img"
              src={match[2]}
              alt={match[1]}
              className="w-full h-full object-cover"
            />
          </AspectRatio>,
        );
      }
      return;
    }

    // tables (simple markdown)
    if (trimmed.includes('|') && trimmed.split('\n').length > 1) {
      const rows = trimmed.split('\n').filter(r => r.trim());
      if (rows.length >= 2) {
        const headers = rows[0].split('|').slice(1, -1).map(h => h.trim());
        const dataRows = rows.slice(1).map(row =>
          row.split('|').slice(1, -1).map(cell => cell.trim()),
        );
        nodes.push(
          <Table
            key={index}
            size="sm"
            stickyHeader
            className="my-6 rounded-lg overflow-hidden"
          >
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i}>
                    <Typography level="body-sm" fontWeight={600}>
                      {h}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>
                      <Typography level="body-sm">{cell}</Typography>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>,
        );
        return;
      }
    }

    // unordered / ordered lists
    if (trimmed.includes('\n* ') || trimmed.includes('\n1. ')) {
      const lines = trimmed
        .split('\n')
        .filter(
          l =>
            l.trim().startsWith('* ') ||
            /^\d+\./.test(l.trim()),
        );
      nodes.push(
        <List key={index} className="my-4 pl-4">
          {lines.map((line, i) => {
            const clean = line.replace(/^\* |\d+\. /, '');
            return (
              <ListItem key={i}>
                <Typography level="body-md">{clean}</Typography>
              </ListItem>
            );
          })}
        </List>,
      );
      return;
    }

    // rating: "Rating: 4.5/5 | text"
    if (trimmed.includes('Rating:') && trimmed.includes('/5')) {
      const parts = trimmed.split('|');
      nodes.push(
        <Stack
          key={index}
          direction="row"
          spacing={1.5}
          className="items-center my-4"
        >
          <Chip
            size="sm"
            variant="soft"
            color="warning"
            startDecorator={<IconStar size={16} />}
          >
            {parts[0].trim()}
          </Chip>
          {parts[1] && (
            <Chip size="sm" variant="soft" color="primary">
              {parts[1].trim()}
            </Chip>
          )}
        </Stack>,
      );
      return;
    }

    // Pros / Cons
    if (trimmed.startsWith('**Pros:**')) {
      const pros = trimmed.replace('**Pros:**', '').split(',').map(p => p.trim());
      nodes.push(
        <Box key={index} className="my-6">
          <Typography level="title-sm" color="success" className="mb-2">
            Pros
          </Typography>
          <List className="pl-4">
            {pros.map((pro, i) => (
              <ListItem
                key={i}
                startAction={<IconCheck size={16} color="green" />}
              >
                <Typography level="body-md">{pro}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>,
      );
      return;
    }

    if (trimmed.startsWith('**Cons:**')) {
      const cons = trimmed.replace('**Cons:**', '').split(',').map(c => c.trim());
      nodes.push(
        <Box key={index} className="my-6">
          <Typography level="title-sm" color="danger" className="mb-2">
            Cons
          </Typography>
          <List className="pl-4">
            {cons.map((con, i) => (
              <ListItem
                key={i}
                startAction={<IconX size={16} color="red" />}
              >
                <Typography level="body-md">{con}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>,
      );
      return;
    }

    // blockquote
    if (trimmed.startsWith('>')) {
      nodes.push(
        <Sheet
          key={index}
          variant="soft"
          className="border-l-4 border-primary-solidBg pl-4 py-2 my-6 italic"
        >
          <Typography level="body-md">
            {trimmed.substring(1).trim()}
          </Typography>
        </Sheet>,
      );
      return;
    }

    // paragraph
    nodes.push(
      <Typography
        key={index}
        level="body-lg"
        className="mb-4 leading-relaxed text-primary"
      >
        {trimmed}
      </Typography>,
    );
  });

  return { nodes, headings };
}

// Joy UI Table of Contents (Mantine style)
interface TableOfContentsJoyProps {
  headings: Heading[];
}

function TableOfContentsJoy({ headings }: TableOfContentsJoyProps) {
  return (
    <Box>
      <Stack direction="row" spacing={1} className="mb-3 items-center">
        <IconListSearch size={18} />
        <Typography level="title-sm">Table of contents</Typography>
      </Stack>
      <List className="space-y-1">
        {headings.map(h => (
          <ListItem
            key={h.id}
            className={`cursor-pointer ${
              h.level === 1
                ? 'pl-0'
                : h.level === 2
                ? 'pl-3'
                : 'pl-6'
            }`}
            sx={{
              '& .toc-link': {
                color: 'text.primary',
                fontWeight: 400,
              },
              '&:hover .toc-link': {
                color: 'primary.plainColor',
              },
            }}
          >
            <Typography level="body-sm" className="toc-link">
              {h.text}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = React.useState<Article | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadArticle = async () => {
      try {
        const articleId = parseInt(id || '1');

        // First try to fetch from Supabase
        const { data: supabaseArticle, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', articleId)
          .maybeSingle();

        if (supabaseArticle && !error) {
          setArticle(supabaseArticle);
        } else {
          // Fallback to static data
          const foundArticle = sampleArticles.find(a => a.id === articleId) || null;
          setArticle(foundArticle);
        }
      } catch (err) {
        console.error('Error loading article:', err);
        // Fallback to static data on error
        const articleId = parseInt(id || '1');
        const foundArticle = sampleArticles.find(a => a.id === articleId) || null;
        setArticle(foundArticle);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <CircularProgress size="lg" />
      </Box>
    );
  }

  if (!article) {
    return (
      <Box className="max-w-4xl mx-auto mt-12 px-4">
        <Alert color="danger" variant="soft">
          Article not found
        </Alert>
        <Button
          component={Link}
          href="/"
          startDecorator={<IconArrowLeft size={18} />}
          className="mt-4"
          variant="outlined"
        >
          Back to articles
        </Button>
      </Box>
    );
  }

  const contentToRender =
    article.content && article.content.trim().length > 0
      ? article.content
      : defaultContent;

  const { nodes, headings } = buildArticleContent(contentToRender);

  const breadcrumbs = [
    { label: 'Articles', href: '/' },
    { label: article.title, href: '#' },
  ];

  return (
    <Box className="bg-background-body min-h-screen py-8">
      <Box className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <Stack direction="row" spacing={1} className="mb-4 text-sm">
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={b.label}>
              {i > 0 && <Typography>/</Typography>}
              {b.href === '#' ? (
                <Typography className="text-neutral-plainColor">{b.label}</Typography>
              ) : (
                <Typography
                  component={Link}
                  href={b.href}
                  className="no-underline text-primary-plainColor"
                >
                  {b.label}
                </Typography>
              )}
            </React.Fragment>
          ))}
        </Stack>

        <Grid container spacing={6}>
          {/* Main content */}
          <Grid xs={12} md={8.5}>
            <Card
              variant="outlined"
              className="p-4 md:p-6 rounded-2xl"
            >
              {/* category */}
              {article.category && (
                <Chip
                  size="sm"
                  variant="soft"
                  color="primary"
                  className="mb-4 uppercase tracking-wide"
                >
                  {article.category}
                </Chip>
              )}

              {/* title */}
              <Typography
                level="h1"
                className="text-3xl md:text-4xl font-bold leading-tight mb-4"
              >
                {article.title}
              </Typography>

              {/* meta */}
              <Stack
                direction="row"
                spacing={6}
                className="flex-wrap text-neutral-600 mb-6 text-sm"
              >
                <Stack direction="row" spacing={1} className="items-center">
                  <IconUser size={16} />
                  <Typography level="body-sm">
                    {article.author || 'Anonymous'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} className="items-center">
                  <IconCalendar size={16} />
                  <Typography level="body-sm">
                    {new Date(article.published_date).toLocaleDateString(
                      'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' },
                    )}
                  </Typography>
                </Stack>
              </Stack>

              {/* hero image */}
              {article.image_url && (
                <AspectRatio
                  ratio="16/9"
                  className="mb-6 rounded-2xl overflow-hidden"
                >
                  <Box
                    component="img"
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              )}

              {/* article content */}
              <Box className="mt-2">{nodes}</Box>

              {/* footer actions */}
              <Divider className="mt-8 mb-4" />
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                className="justify-between items-center"
              >
                <Button
                  component={Link}
                  href="/"
                  variant="outlined"
                  startDecorator={<IconArrowLeft size={18} />}
                >
                  Back to articles
                </Button>
                <Stack direction="row" spacing={2}>
                  <Button variant="soft" color="neutral">
                    Share article
                  </Button>
                  <Button variant="soft" color="neutral">
                    Save for later
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Grid>

          {/* sidebar with TOC + info */}
          <Grid xs={12} md={3.5}>
            <Stack spacing={6} className="md:sticky md:top-6">
              {/* Table of contents */}
              {headings.length > 0 && (
                <Card variant="outlined" className="rounded-2xl">
                  <TableOfContentsJoy headings={headings} />
                </Card>
              )}

              {/* Article info card */}
              <Card variant="soft">
                <Typography
                  level="title-sm"
                  className="mb-2 uppercase tracking-wide"
                >
                  Article info
                </Typography>
                <Stack spacing={3}>
                  <Box>
                    <Typography level="body-xs" color="neutral">
                      Published
                    </Typography>
                    <Typography level="body-sm" fontWeight={500}>
                      {new Date(article.published_date).toLocaleDateString(
                        'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' },
                      )}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography level="body-xs" color="neutral">
                      Author
                    </Typography>
                    <Typography level="body-sm" fontWeight={500}>
                      {article.author || 'Anonymous'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography level="body-xs" color="neutral">
                      Category
                    </Typography>
                    <Typography level="body-sm" fontWeight={500}>
                      {article.category || 'General'}
                    </Typography>
                  </Box>
                </Stack>
              </Card>

              {/* placeholder related */}
              <Card variant="outlined">
                <Typography
                  level="title-sm"
                  className="mb-2 uppercase tracking-wide"
                >
                  Related articles
                </Typography>
                <Typography level="body-sm" color="neutral">
                  More articles in {article.category || 'this category'} coming
                  soon...
                </Typography>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
