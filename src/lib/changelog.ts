import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ChangelogType = "new" | "improvement" | "fix";

/**
 * 单条更新日志。title/content 均为按 locale 索引的多语言映射
 * （一个 MDX 文件内包含全部语言，代码按当前 locale 取值）。
 */
export type ChangelogEntry = {
  version: string;
  date: string;
  type: ChangelogType;
  title: Record<string, string>;
  content: Record<string, string>;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "changelog");

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
 * 读取所有 changelog MDX，解析 frontmatter，按日期降序返回。
 * 页面组件不要直接操作文件系统，统一走这里。
 */
export function getChangelogEntries(): ChangelogEntry[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));

  const entries: ChangelogEntry[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      version: String(data.version ?? ""),
      date: String(data.date ?? ""),
      type: (data.type as ChangelogType) ?? "new",
      title: asStringMap(data.title),
      content: asStringMap(data.content),
    };
  });

  return entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
