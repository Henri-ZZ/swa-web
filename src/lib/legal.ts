import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * 法务文档。文件名格式：`<slug>-YYYY-MM-DD.mdx`（如 terms-2026-08-15.mdx）。
 * title/content 均为按 locale 索引的多语言映射（一个 MDX 文件内包含全部语言）。
 * 读取时返回该 slug 下日期最新的一版。
 */
export type LegalDoc = {
  slug: string;
  date: string;
  title: Record<string, string>;
  content: Record<string, string>;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "legal");

function asStringMap(value: unknown): Record<string, string> {
  if (value && typeof value === "object") {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = String(v ?? "");
    }
    return out;
  }
  return {};
}

/**
 * 读取指定 slug（terms / privacy / refund）下日期最新的一版法务文档。
 * 页面组件不要直接操作文件系统，统一走这里。
 */
export function getLegalDoc(slug: string): LegalDoc | null {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));

  const docs: LegalDoc[] = [];
  for (const file of files) {
    const m = file.match(/^(.+)-(\d{4}-\d{2}-\d{2})\.mdx$/);
    if (!m || m[1] !== slug) continue;
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    docs.push({
      slug,
      date: m[2],
      title: asStringMap(data.title),
      content: asStringMap(data.content),
    });
  }

  if (docs.length === 0) return null;

  return docs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0];
}
