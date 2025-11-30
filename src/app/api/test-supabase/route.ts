import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test basic connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from('articles')
      .select('count', { count: 'exact', head: true });

    if (connectionError) {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase connection failed',
        error: connectionError.message,
        details: connectionError
      }, { status: 500 });
    }

    // Test articles table - get count and sample
    const { count: totalArticles, error: countError } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true });

    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('id, title, published_date')
      .order('published_date', { ascending: false })
      .limit(5);

    // Test likes table (may not exist)
    let likesTest: { exists: boolean; error: string | null; count?: number } = { exists: false, error: null };
    try {
      const { count: likesCount, error: likesError } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true });

      if (!likesError) {
        likesTest = { exists: true, error: null, count: likesCount || 0 };
      }
    } catch (likesError) {
      likesTest = { exists: false, error: 'Table does not exist' };
    }

    return NextResponse.json({
      status: 'success',
      message: 'Supabase connection successful',
      data: {
        articlesCount: totalArticles,
        sampleArticles: articles,
        likesTable: likesTest,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Unexpected error testing Supabase',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
