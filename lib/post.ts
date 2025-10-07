import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { allowedNodeEnvironmentFlags } from 'process';
import {remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames.map((fileName) => {
    // 移除 ".md" 后缀，作为帖子的 id (或 slug)
    const id = fileName.split('.')[0];

    // 读取 markdown 文件内容
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用 gray-matter 解析 front matter
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data, // 将 front matter (如 title, date) 展开放入对象
    };
    
  })
    return allPostsData.sort(({ date: a}, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getPostData(slug: string) {
  // 1. 构建文件的完整路径
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // 2. 使用 gray-matter 解析 front-matter 和内容
  const matterResult = matter(fileContents);
  // 3. 使用 remark 将 Markdown 转换为 HTML 字符串
  // 这一步非常重要，它将纯文本的 Markdown 内容转换成浏览器可以渲染的 HTML
  const processedContent = remark()
    .use(html) // 使用 remark-html 插件
    .processSync(matterResult.content); // 同步处理内容
  const contentHtml = processedContent.toString();
  // 4. 将数据合并返回
  // 返回的数据将包含 slug, front-matter 和转换后的 HTML 内容
  return {
    slug,
    contentHtml,
    ...matterResult.data, // 展开 { title, date, ... }
  };
}