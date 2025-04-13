import { visit } from "unist-util-visit";
import { Parent } from "unist";
import { Element } from "hast";

export default function rehypeMeta() {
  return (tree: Parent) => {
    visit(tree, "element", (node: Element, index, parent: Parent) => {
      // Memastikan node adalah elemen <code>
      if (
        node.tagName === "code" &&
        node.data?.meta &&
        node.data.meta.includes("filename=")
      ) {
        const filenameMatch = node.data.meta.match(/filename=([\w.\-_]+)/);
        if (filenameMatch) {
          const filename = filenameMatch[1];

          // Memeriksa apakah parent adalah elemen <pre>
          if (parent && (parent as Element).tagName === "pre") {
            // Menambahkan data-filename ke properti <pre>
            (parent as Element).properties["data-filename"] = filename;
          }
        }
      }
    });
  };
}
