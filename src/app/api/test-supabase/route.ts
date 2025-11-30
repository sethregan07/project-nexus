import { NextResponse } from 'next/server';

// Force dynamic rendering to prevent static analysis during build
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if Supabase is available (environment variables are set)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase environment variables not configured',
        error: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Create Supabase client only when needed (runtime) - lazy import to prevent build-time issues
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
