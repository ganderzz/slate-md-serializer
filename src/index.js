import { Block } from "slate";

export function serialize(value, options) {
  return serializeNode(value.document);
}

function serializeMarks(node) {
  return node.leaves.map(p => {
    const text = p.text;

    if (!p.marks || p.marks.count() <= 0) {
      return text;
    }

    return p.marks.toArray().reduce((j, t) => getMarkMarkdown(t.type, j), text);
  }).join("");
}

function getMarkMarkdown(type, text) {
  switch (type) {
    case "bold":
      return `**${text}**`;

    case "italic":
      return `*${text}*`;
  }

  return text;
}

function getBlockText(node) {
  if (node.nodes.count() > 0) {
    return node.nodes.map(serializeMarks).join("");
  }

  return node.text;
}

/**
 * Serialize a `node` to plain text.
 *
 * @param {Node} node
 * @return {String}
 */

function serializeNode(node) {
  if (
    node.object == "document" ||
    (node.object == "block" && Block.isBlockList(node.nodes))
  ) {
    return node.nodes.map(serializeNode).join("\n");
  }

  const text = getBlockText(node);

  switch (node.type) {
    case "header":
      return `# ${text}`;
  }

  return text;
}