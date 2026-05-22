export default function myImageLoader({ src, width, quality }) {
  if (src.startsWith('http') || src.startsWith('//')) {
    return `/api/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
  }
  return `${src}?w=${width}&q=${quality || 75}`;
}
