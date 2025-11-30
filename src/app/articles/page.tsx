import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import {
  Box,
  Card,
  Typography,
  Chip,
  AspectRatio,
  Stack,
  Grid,
} from '@mui/joy'
import {
  IconCalendar,
  IconUser,
  IconEye,
} from '@tabler/icons-react'

// Force dynamic rendering to prevent static generation during build
export const dynamic = 'force-dynamic'

interface Article {
  id: number
  title: string
  content: string
  author?: string
  image_url?: string
  category?: string
  published_date: string
  created_at: string
  updated_at: string
}

export default async function ArticlesPage() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_date', { ascending: false })

  if (error) {
    return (
      <Box className="max-w-6xl mx-auto px-4 py-8">
        <Typography level="h1" className="mb-8">Articles</Typography>
        <Typography color="danger">Error loading articles: {error.message}</Typography>
      </Box>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <Box className="max-w-6xl mx-auto px-4 py-8">
        <Typography level="h1" className="mb-8">Articles</Typography>
        <Typography color="neutral">No articles found.</Typography>
      </Box>
    )
  }

  return (
    <Box className="max-w-6xl mx-auto px-4 py-8">
      <Typography level="h1" className="mb-8">Articles from Supabase</Typography>

      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid key={article.id} xs={12} sm={6} md={4}>
            <Card variant="outlined" className="h-full">
              {article.image_url && (
                <AspectRatio ratio="16/9">
                  <Box
                    component="img"
                    src={article.image_url}
                    alt={article.title}
                    loading="lazy"
                  />
                </AspectRatio>
              )}

              <Box className="p-4">
                <Box className="flex items-center justify-between mb-3">
                  <Typography level="h3" className="text-lg font-semibold">
                    <Link
                      href={`/articles/${article.id}`}
                      className="no-underline text-inherit hover:text-primary-plainColor"
                    >
                      {article.title}
                    </Link>
                  </Typography>
                  {article.category && (
                    <Chip size="sm" variant="soft" color="primary">
                      {article.category}
                    </Chip>
                  )}
                </Box>

                <Typography level="body-sm" className="mb-4 text-gray-600 line-clamp-3">
                  {article.content.substring(0, 150)}...
                </Typography>

                <Stack direction="row" spacing={2} className="justify-between text-sm text-gray-500">
                  <Stack direction="row" spacing={2}>
                    {article.author && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconUser size={16} />
                        <Typography level="body-xs">{article.author}</Typography>
                      </Stack>
                    )}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconCalendar size={16} />
                      <Typography level="body-xs">
                        {new Date(article.published_date).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconEye size={16} />
                    <Typography level="body-xs">{Math.floor(Math.random() * 1000) + 100}</Typography>
                  </Stack>
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
