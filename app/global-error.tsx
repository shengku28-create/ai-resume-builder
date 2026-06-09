'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md px-4">
            <h1 className="text-4xl font-bold mb-4">😵 哎呀，出错了</h1>
            <p className="text-muted-foreground mb-6">
              发生了意外错误，请稍后重试。
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => reset()}
                className="h-10 px-6 rounded-lg font-medium text-white bg-primary hover:bg-primary/90"
              >
                重试
              </button>
              <a
                href="/"
                className="h-10 px-6 rounded-lg font-medium border hover:bg-muted"
              >
                返回首页
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
