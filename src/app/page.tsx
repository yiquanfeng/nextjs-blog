import Link from 'next/link';
import { getSortedPostsData } from '../../lib/post';

// 这是一个服务器组件，可以直接执行异步操作
export default function HomePage() {
  const allPosts = getSortedPostsData();

  // 格式化日期函数 (可选，但推荐)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { // 使用中文格式
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

return (
  <div className="flex flex-col">
    {allPosts.map((post) => (  // 改成这样
      <div key={post.id}>
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
     </div>
    ))}
  </div>
);
}