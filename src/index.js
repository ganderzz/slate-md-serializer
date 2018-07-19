import { Block } from "slate";

if (!Block) {
  console.warn("slate-md-parser requires Slate to work correctly.");
}

export function serialize(value, opts = {}) {
  const options = {
    parseMarks: (type, text) => {
      switch (type) {
        case "bold":
          return `**${text}**`;
    
        case "italic":
          return `*${text}*`;
      }
    
      return text;
    },
    parseNodes: (type, text) => {
      switch (type) {
        case "header":
          return `# ${text}`;
      }

      return text;
    },
    ...opts,
  };

  return serializeNode(value.document, options);
}

function serializeMarks(node, { parseMarks }) {
  return node.leaves.map(p => {
    const text = p.text;

    if (!p.marks || p.marks.count() <= 0) {
      return text;
    }

    return p.marks.toArray().reduce((j, t) => parseMarks(t.type, j), text);
  }).join("");
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

  return options.parseNodes(node.type, text);
}