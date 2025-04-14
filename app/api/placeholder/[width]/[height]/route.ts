import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const segments = req.nextUrl.pathname.split('/');
  const height = parseInt(segments.pop() || '100'); // [height]
  const width = parseInt(segments.pop() || '100');  // [width]

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#2563EB" />
      <text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${width}×${height}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
}
