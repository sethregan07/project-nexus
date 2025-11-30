'use client';

import * as React from 'react';
import { Button, Typography, Box } from '@mui/joy';
import { IconHeart } from '@tabler/icons-react';
import { supabase } from '@/lib/supabase';

interface LikeButtonProps {
  articleId: number;
  initialLikesCount?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'plain' | 'outlined' | 'soft' | 'solid';
}

export default function LikeButton({
  articleId,
  initialLikesCount = 0,
  size = 'sm',
  variant = 'plain'
}: LikeButtonProps) {
  const [likesCount, setLikesCount] = React.useState(initialLikesCount);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  // Load initial like status and count
  React.useEffect(() => {
    const loadLikeData = async () => {
      try {
        // For now, we'll simulate likes since we don't have user auth
        // In a real app, you'd check if current user liked this article
        setIsLiked(Math.random() > 0.7); // Simulate some articles being liked

        // Try to get real like count from Supabase
        const { count, error } = await supabase
          .from('likes')
          .select('*', { count: 'exact', head: true })
          .eq('article_id', articleId);

        if (!error && count !== null) {
          setLikesCount(count);
        }
      } catch (error) {
        // Silently fail and keep initial count
        console.log('Could not load like data for article', articleId);
      }
    };

    if (!hasInteracted) {
      loadLikeData();
    }
  }, [articleId, hasInteracted]);

  const handleLikeToggle = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setHasInteracted(true);

    // Optimistic update
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;

    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);

    try {
      if (newIsLiked) {
        // Add like
        const { error } = await supabase
          .from('likes')
          .insert({
            article_id: articleId,
            user_id: null, // Anonymous like for now
          });

        if (error) throw error;
      } else {
        // Remove like (for anonymous users, this is tricky)
        // In a real app, you'd need user authentication
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('article_id', articleId)
          .is('user_id', null);

        if (error) throw error;
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsLiked(!newIsLiked);
      setLikesCount(likesCount);
      console.error('Error updating like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLikeToggle}
      disabled={isLoading}
      sx={{
        gap: 0.5,
        px: size === 'sm' ? 1 : size === 'md' ? 1.5 : 2,
        py: size === 'sm' ? 0.5 : size === 'md' ? 0.75 : 1,
        minHeight: 'auto',
        '&:hover': {
          backgroundColor: isLiked ? 'danger.plainHoverBg' : 'neutral.plainHoverBg',
        },
      }}
      color={isLiked ? 'danger' : 'neutral'}
      startDecorator={
        <IconHeart
          size={size === 'sm' ? 16 : size === 'md' ? 18 : 20}
          fill={isLiked ? 'currentColor' : 'none'}
          style={{
            transition: 'all 0.2s ease',
            transform: isLiked ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      }
    >
      <Typography
        level={size === 'sm' ? 'body-xs' : size === 'md' ? 'body-sm' : 'body-md'}
        sx={{
          fontWeight: isLiked ? 600 : 400,
          transition: 'all 0.2s ease',
        }}
      >
        {likesCount}
      </Typography>
    </Button>
  );
}
