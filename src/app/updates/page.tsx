'use client';

import * as React from 'react';
import {
  Box,
  Sheet,
  Card,
  Typography,
  Grid,
  Stack,
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
  IconCalendar,
  IconArrowRight,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconStar,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import Link from 'next/link';

interface Update {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'feature' | 'bugfix' | 'announcement' | 'improvement';
  version?: string;
  isMajor?: boolean;
}

// Static update data
const sampleUpdates: Update[] = [
  {
    id: 1,
    title: "🚀 Major Platform Redesign",
    description: "Complete overhaul of the user interface with modern Joy UI components, improved navigation, and enhanced mobile responsiveness. The new design provides a more intuitive and engaging experience.",
    date: "2024-11-30",
    type: "feature",
    version: "2.0.0",
    isMajor: true,
  },
  {
    id: 2,
    title: "⚡ Performance Improvements",
    description: "Optimized loading times with code splitting, lazy loading, and improved caching strategies. Articles now load 40% faster on average.",
    date: "2024-11-28",
    type: "improvement",
    version: "1.9.5",
  },
  {
    id: 3,
    title: "🗄️ Database Migration Complete",
    description: "Successfully migrated all content to Supabase for better scalability and real-time features. All existing articles and user data preserved.",
    date: "2024-11-25",
    type: "announcement",
    version: "1.9.0",
  },
  {
    id: 4,
    title: "🐛 Fixed Article Navigation Bug",
    description: "Resolved issue where article navigation links weren't working properly on mobile devices. All navigation elements now function correctly across all screen sizes.",
    date: "2024-11-22",
    type: "bugfix",
    version: "1.8.3",
  },
  {
    id: 5,
    title: "📱 Enhanced Mobile Experience",
    description: "Improved touch interactions, better scrolling performance, and optimized layouts for mobile devices. Reading articles on mobile is now more comfortable.",
    date: "2024-11-20",
    type: "improvement",
    version: "1.8.0",
  },
  {
    id: 6,
    title: "🔍 Advanced Search Features",
    description: "New search functionality with filters, categories, and date ranges. Users can now find content more efficiently with improved search results.",
    date: "2024-11-18",
    type: "feature",
    version: "1.7.0",
  },
  {
    id: 7,
    title: "🔔 Notification System",
    description: "Added email notifications for new articles and updates. Users can now stay informed about the latest content directly in their inbox.",
    date: "2024-11-15",
    type: "feature",
    version: "1.6.0",
  },
  {
    id: 8,
    title: "🎨 Theme Customization",
    description: "Introduced dark mode and customizable themes. Users can now personalize their reading experience with different color schemes.",
    date: "2024-11-12",
    type: "feature",
    version: "1.5.0",
  },
];

function getTypeColor(type: Update['type']) {
  switch (type) {
    case 'feature':
      return 'success';
    case 'bugfix':
      return 'danger';
    case 'announcement':
      return 'warning';
    case 'improvement':
      return 'primary';
    default:
      return 'neutral';
  }
}

function getTypeIcon(type: Update['type']) {
  switch (type) {
    case 'feature':
      return <IconStar size={16} />;
    case 'bugfix':
      return <IconCheck size={16} />;
    case 'announcement':
      return <IconArrowRight size={16} />;
    case 'improvement':
      return <IconX size={16} />;
    default:
      return <IconArrowRight size={16} />;
  }
}

function UpdateCard({ update }: { update: Update }) {
  return (
    <Card variant="outlined" className="p-6">
      <Box className="flex items-start justify-between mb-3">
        <Box className="flex items-center gap-2">
          <Chip
            size="sm"
            variant="soft"
            color={getTypeColor(update.type)}
            startDecorator={getTypeIcon(update.type)}
          >
            {update.type}
          </Chip>
          {update.version && (
            <Chip size="sm" variant="outlined">
              v{update.version}
            </Chip>
          )}
        </Box>
        <Typography level="body-xs" color="neutral">
          {new Date(update.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>
      </Box>

      <Typography
        level={update.isMajor ? "h3" : "h4"}
        className={`mb-3 ${update.isMajor ? 'text-2xl font-bold' : 'text-xl font-semibold'}`}
      >
        {update.title}
      </Typography>

      <Typography level="body-lg" className="text-neutral-700 leading-relaxed">
        {update.description}
      </Typography>

      {update.isMajor && (
        <Box className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
          <Typography level="body-sm" color="primary" className="font-medium">
            🎉 This is a major update with significant new features and improvements!
          </Typography>
        </Box>
      )}
    </Card>
  );
}

export default function UpdatesPage() {
  const [updates, setUpdates] = React.useState<Update[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate API call with static data
    const loadUpdates = () => {
      setUpdates(sampleUpdates);
      setLoading(false);
    };

    // Simulate loading delay
    setTimeout(loadUpdates, 800);
  }, []);

  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <CircularProgress size="lg" />
      </Box>
    );
  }

  if (updates.length === 0) {
    return (
      <Box className="max-w-4xl mx-auto mt-12 px-4">
        <Alert color="danger" variant="soft">
          No updates found
        </Alert>
      </Box>
    );
  }

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
          <Link href="/" className="no-underline text-inherit">
            <Typography level="h3" fontWeight={800}>
              Blogs
            </Typography>
          </Link>

          <Box className="hidden md:flex items-center gap-4">
            {[
              { label: 'Home', href: '/' },
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
      <Box className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <Box className="text-center mb-8">
          <Typography level="h1" className="text-4xl font-bold mb-4">
            Latest Updates
          </Typography>
          <Typography level="body-lg" color="neutral" className="max-w-2xl mx-auto">
            Stay up to date with the latest features, improvements, and announcements.
            We're constantly working to make your experience better.
          </Typography>
        </Box>

        {/* Updates Timeline */}
        <Stack spacing={6}>
          {updates.map((update, index) => (
            <Box key={update.id} className="relative">
              {/* Timeline connector */}
              {index < updates.length - 1 && (
                <Box
                  className="absolute left-6 top-20 w-0.5 h-full bg-neutral-200"
                  sx={{ transform: 'translateX(-50%)' }}
                />
              )}

              {/* Timeline dot */}
              <Box
                className="absolute left-6 w-3 h-3 rounded-full bg-primary-500 border-2 border-white shadow-sm"
                sx={{ transform: 'translateX(-50%)', top: '24px' }}
              />

              {/* Update content with left margin for timeline */}
              <Box className="ml-12">
                <UpdateCard update={update} />
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Call to action */}
        <Card
          variant="soft"
          color="primary"
          className="mt-12 text-center p-8"
        >
          <Typography level="h3" className="mb-3">
            Want to stay updated?
          </Typography>
          <Typography level="body-lg" className="mb-6 opacity-80">
            Subscribe to our newsletter to get the latest updates delivered directly to your inbox.
          </Typography>
          <Stack direction="row" spacing={2} className="justify-center">
            <Input
              placeholder="Enter your email"
              size="lg"
              className="max-w-xs"
            />
            <Button size="lg" variant="solid">
              Subscribe
            </Button>
          </Stack>
        </Card>
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
