function attributeEntryToString([key, value]) {
  if (typeof value !== "string" && typeof value !== "number")
    throw new Error(
      `Attribute "${key}" must have a value of type string or number not "${typeof value}".`
    );

  return `${key}="${value}"`;
}

/**
 * ## Usage
 * The function `getAttributes` is used to convert an object, `attributes`, with HTML attributes as keys and the values as the corresponding HTML attribute's values.
 * If it is falsey, an empty string will be returned.
 *
 * ```js
  getAttributes({
    tabindex: 0,
    'data-language': 'JavaScript',
    'data-otherStuff': 'value'
  }) // => ' tabindex="0" data-language="JavaScript" data-otherStuff="value"'
  ```
 *
 * @param {{[s: string]: string | number}} attributes An object with key-value pairs that represent attributes.
 * @returns {string} A string containing the above HTML attributes preceded by a single space.
 */
function getAttributes(attributes) {
  if (!attributes) {
    return "";
  } else if (typeof attributes === "object") {
    const formattedAttributes = Object.entries(attributes).map(
      attributeEntryToString
    );
    return formattedAttributes.length ? ` ${formattedAttributes.join(" ")}` : "";
  } else if (typeof attributes === "string") {
    throw new Error("Syntax highlighter plugin custom attributes on <pre> and <code> must be an object. Received: " + JSON.stringify(attributes));
  }
}

module.exports = getAttributes;
