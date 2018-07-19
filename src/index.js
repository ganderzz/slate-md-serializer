import { Block } from "slate";

export function serialize(value, opts = {}) {
  const options = {
    ...opts,
    types: {
      header: "header",
      bold: "bold",
      italic: "italic",
      ...(opts.types || {})
    }
  };

  return serializeNode(value.document, options);
}

function serializeMarks(node, options) {
  return node.leaves.map(p => {
    const text = p.text;

    if (!p.marks || p.marks.count() <= 0) {
      return text;
    }

    return p.marks.toArray().reduce((j, t) => getMarkMarkdown(t.type, j, options), text);
  }).join("");
}

function getMarkMarkdown(type, text, { types }) {
  switch (type) {
    case types.bold:
      return `**${text}**`;

    case types.italic:
      return `*${text}*`;
  }

  return text;
}

function getBlockText(node, options) {
  if (node.nodes.count() > 0) {
    return node.nodes.map(p => serializeMarks(p, options)).join("");
  }

  return node.text;
}

function serializeNode(node, options) {
  if (
    node.object == "document" ||
    (node.object == "block" && Block.isBlockList(node.nodes))
  ) {
    return node.nodes.map(p => serializeNode(p, options)).join("\n");
  }

  const text = getBlockText(node, options);

  switch (node.type) {
    case options.types.header:
      return `# ${text}`;
  }

  return text;
}