import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold text-primary/20 mb-4">404</div>
        <h1 className="text-2xl font-bold mb-2">页面未找到</h1>
        <p className="text-muted-foreground mb-8">
          你访问的页面不存在或已被移动
        </p>
        <Link
          href="/"
          className="inline-flex items-center h-10 px-6 rounded-lg font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
