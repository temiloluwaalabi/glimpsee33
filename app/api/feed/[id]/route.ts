import { allMockFeedItems } from '@/config/constants/mockdata';
import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const feedItem = allMockFeedItems.find(item => item.id === params.id);
    
    if (!feedItem) {
      return NextResponse.json(
        { error: 'Feed item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: feedItem, success: true });
  } catch (error) {
    console.error('Feed item API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
