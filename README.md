## Slate to Markdown Serializer

Currently supports 
- Bold
- Italic
- Headers


### How to use

**Basic**

```js
import { serialize } from "slate-ms-serializer";

const markdown = serialize(mySlateValue);
```

**Adding custom options**
```js
import { serialize } from "slate-ms-serializer";

const markdown = serialize(mySlateValue, {
  parseMark: (type, text) => {
    if (type === "BOLD") {
      return `******${text}******`;
    }

    // Return the base text if we find nothing to convert to!
    // This part is important for nested structures
    return text;
  }
});
```

**Contributions Welcome!**