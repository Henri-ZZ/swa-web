import { marked } from "marked";
import { getLegalDoc } from "@/lib/legal";

/**
 * 取指定 locale 下某法务文档（terms / privacy / refund）最新一版：
 * 解析多语言 MDX → marked 渲染成 HTML 字符串。缺失语言时回退 en → 第一个可用值。
 * 页面组件（server）统一走这里，不直接碰文件系统。
 */
export async function getLegalDocForLocale(
  slug: string,
  locale: string,
): Promise<{ title: string; bodyHtml: string; date: string } | null> {
  const doc = getLegalDoc(slug);
  if (!doc) return null;
  const pick = (map: Record<string, string>) =>
    map[locale] ?? map["en"] ?? Object.values(map)[0] ?? "";
  return {
    title: pick(doc.title),
    bodyHtml: await marked.parse(pick(doc.content)),
    date: doc.date,
  };
}
