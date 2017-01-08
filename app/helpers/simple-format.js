import Ember from "ember";

const AUTO_EMAIL_RE = /([\w.!#\$%+-]+@[\w-]+(?:\.[\w-]+)+)/;
const AUTO_LINK_CRE = [/<[^>]+$/, /^[^>]*>/];
const AUTO_LINK_RE  = /(?:((?:ed2k|ftp|http|https|irc|mailto|news|gopher|nntp|telnet|webcal|xmpp|callto|feed|svn|urn|aim|rsync|tag|ssh|sftp|rtsp|afs|file):)\/\/|(www\.))([^\s<]+)/;

const { htmlSafe, isHTMLSafe } = Ember.String;

var autoLink = function (text, context) {
  var buffer = [];

  if (context.autoLink) {
    switch (context.autoLink) {
    case true:
    case 'all':
      var partialHTML = autoLinkUrls(text, context);

      for (let i = 0, len = partialHTML.length; i < len; i++) {
        if (!isHTMLSafe(partialHTML[i])) {
          buffer = buffer.concat(autoLinkEmailAddresses(partialHTML[i]));
        } else {
          buffer.push(partialHTML[i]);
        }
      }

      break;
    case 'urls':
      buffer = autoLinkUrls(text, context);
      break;
    case 'emailAddresses':
      buffer = autoLinkEmailAddresses(text);
      break;
    default:
      buffer.push(text);
    }

  } else {
    buffer.push(text);
  }

  return buffer;
};

var autoLinkUrls = function (text, options) {
  var parts = text.split(AUTO_LINK_RE),
      part,
      index,
      html  = [];

  while ((index = text.search(AUTO_LINK_RE)) !== -1) {
    part = parts.shift();
    text = text.slice(index);

    html.push(part);

    var schema = parts.shift(),
        www    = parts.shift(),
        href   = parts.shift();

    href = (www || '') + href;

    // Remove the parts we're changing by hand
    text = text.slice(((schema && schema.length + 2) || 0) +
                      ((href   && href.length)       || 0));

    if (!isAutoLinked(part, parts[0])) {
      var url;
      if (schema) {
        url = href = schema + '//' + href;
      } else {
        url = href;
        href = 'http://' + href;
      }

      var template = `<a href="${href}"`;

      if (options.target) {
        template += ` target="${options.target}"`;
      }
      template += `>${url}</a>`;

      html.push(htmlSafe(template));
    }
  }

  html = html.concat(parts);
  return html;
};

var autoLinkEmailAddresses = function (text) {
  var parts = text.split(AUTO_EMAIL_RE),
      part,
      index,
      html  = [];

  while ((index = text.search(AUTO_EMAIL_RE)) !== -1) {
    part = parts.shift();
    text = text.slice(index);

    html.push(part);
    var address = parts.shift();

    // Remove the parts we're changing by hand
    text = text.slice(address.length);

    if (!isAutoLinked(part, parts[0])) {
      html.push(htmlSafe(`<a href="mailto:${address}">${address}</a>`));
    }
  }

  html = html.concat(parts);
  return html;
};

var isAutoLinked = function (left, right) {
  return (AUTO_LINK_CRE[0].test(left) && AUTO_LINK_CRE[2].test(right));
};

var splitParagraphs = function (text) {
  return text.split(/\n\n+/).map(function (text) {
    return text.replace(/([^\n]\n)(?=[^\n])/g, '$1<br>') || text;
  });
};

/**
  The `{{simple-format}}` helper renders text into
  simplified HTML.

  ```handlebars
  {{simple-format "Hello, Monsieur!\nToday is your birthday!"}}
  ```

  ```html
  Hello, Monsieur!<br>Today is your birthday!
  ```

  This helper takes a variety of parameters to customize
  the block further.


  The `autoLink` attribute will automatically markup links found
  in the text. The options for this are `"all"`, `"urls"`,
  `"emailAddresses"`. If `autoLink` is set to `true`, it behaves
  as if it was set to `"all"`.

  ```handlebars
  {{simple-format "http://www.emberjs.com is an awesome framework!" autoLink="urls"}}
  ```

  ```html
  <a href="http://www.emberjs.com">http://www.emberjs.com</a> is an awesome framework!
  ```

  If using `autoLink`, you may provide a `target` attribute
  to indicate where the link should open.

  ```handlebars
  {{simple-format "You should really check out http://www.emberjs.com" autoLink="urls" target="__blank"}}
  ```

  ```html
  You should really check out <a href="http://www.emberjs.com" target="__blank">http://www.emberjs.com</a>
  ```

  If the HTML provided shouldn't be stripped of HTML, simply use {{{simple-format}}} to
  identify the string as safe.

  @method simple-format
  @for Ember.Helper
  @param text  {String} The text to format
  @return {String} HTML string
 */
export default Ember.Helper.helper(function (params, hash) {
  let text = params.join('');
  var buffer = autoLink(text, hash);

  text = buffer.join('');

  var paragraphs = splitParagraphs(text);
  var wrapperTag = hash['wrapper-tag'];
  if (wrapperTag === undefined) {
    wrapperTag = 'p';
  }

  if (wrapperTag) {
    paragraphs = paragraphs.map(function (paragraph) {
      return `<${wrapperTag}>${paragraph}</${wrapperTag}>`;
    });
  }
  text = paragraphs.join('\n\n');

  return htmlSafe(text);
});
