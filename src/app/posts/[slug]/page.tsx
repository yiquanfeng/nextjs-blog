import { getPostData, getSortedPostsData } from '../../../../lib/post'; // 调整导入路径
import { notFound } from 'next/navigation';
// import '../../styles/post.css'; // 推荐创建一个专门的 post.css 来美化文章样式

// 1. 定义静态路径生成的函数 (SSG - Static Site Generation)
// Next.js 会在构建时调用这个函数，来知道要生成哪些 HTML 页面
export async function generateStaticParams() {
  const posts = getSortedPostsData(); // 获取所有文章的列表数据
  // 返回一个数组，每个元素都是一个包含 params 的对象
  // 例如: [ { slug: 'hello' }, { slug: 'another-post' } ]
  return posts.map((post) => ({
    slug: post.id, // 假设你的 post.id 就是 md 文件名 (如 'hello')
  }));
}

// 2. 定义页面的元数据 (Title, Description 等)
// `params` 来自于 generateStaticParams 或 URL
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  const postData = await getPostData(slug); // 获取数据以填充元数据
  return {
    title: postData.title,
  };
}

// 3. 默认导出页面组件 (React Component)
// 它接收 params，其中包含了 URL 中的动态值
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  const postData = await getPostData(slug);

  // 如果文章不存在，调用 notFound() 会渲染 404 页面
  if (!postData) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        {/* prose 是 typography.js 提供的类名，可以轻松美化文章样式，非常推荐 */}
        <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
        <div className="text-gray-500 mb-8">
          {postData.date && <time>{new Date(postData.date).toLocaleDateString('zh-CN')}</time>}
        </div>
        {/* 危险！直接渲染 HTML */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </main>
  );
}
