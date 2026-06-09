export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <title>AI Resume Builder - 智能简历生成器 | 创建专业简历</title>
        <meta name="description" content="使用AI技术快速生成专业简历。支持多种模板，智能优化内容，一键导出PDF。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
