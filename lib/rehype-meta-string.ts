import { visit } from "unist-util-visit";

export default function rehypeMeta() {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (
        node.tagName === "code" &&
        node.data?.meta &&
        node.data.meta.includes("filename=")
      ) {
        const filenameMatch = node.data.meta.match(/filename=([\w.\-_]+)/);
        if (filenameMatch) {
          const filename = filenameMatch[1];
          const preNode = node?.position?.parent; // kadang ga ada
          if (node?.parent && node.parent.tagName === "pre") {
            node.parent.properties["data-filename"] = filename;
          }
        }
      }
    });
  };
}
