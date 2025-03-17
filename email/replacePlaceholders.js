function replacePlaceholders(html, data) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const placeholder = `{{ ${key} }}`;
      html = html.replaceAll(placeholder, data[key]);
    }
  }
  return html;
}

module.exports = replacePlaceholders;
