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
 * If the `attributes` parameter is a string, it will be returned. If it is falsey, an empty string will be returned.
 *
 * ```js
  getAttributes('tabindex="0" data-language="HTML"')
  // => ' tabindex="0" data-language="HTML"'

  getAttributes({
    tabindex: 0,
    'data-language': 'JavaScript',
    'data-otherStuff': 'value'
  }) // => ' tabindex="0" data-language="JavaScript" data-otherStuff="value"'
  ```
 *
 * @param {string | {[s: string]: string | number}} attributes A string containing HTML attributes or an object with key-value pairs that represent attributes.
 * @returns {string} A string containing the above HTML attributes preceded by a single space.
 */
function getAttributes(attributes) {
  if (!attributes) {
    return "";
  } else if (typeof attributes === "string") {
    return ` ${attributes}`;
  } else if (typeof attributes === "object") {
    const formattedAttributes = Object.entries(attributes).map(
      attributeEntryToString
    );
    return ` ${formattedAttributes}`;
  }
}

module.exports = getAttributes;
