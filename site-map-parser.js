import got from "got";
import { JSDOM } from "jsdom";

export class SiteMapParser {
  constructor(url) {
    this.url = url;
  }

  async getSiteMap() {
    if (!this.isvalidURL()) throw new Error("Invalid URL");

    try {
      const { body } = await got(this.url);
      const dom = new JSDOM(body);
      const baseUrl = this.getBaseUrl();
      const links = [];
      dom.window.document.querySelectorAll("a").forEach((link) => {
        if (link.href) {
          // sanitize link innerHTML
          const name = link.innerHTML.replace(/<[^>]+>/g, "").trim();

          // convert relative paths to absolute
          const href = link.href.startsWith("/")
            ? `${baseUrl}${link.href}`
            : link.href;

          // remove trailing / from href
          const url = href.endsWith("/") ? href.slice(0, -1) : href;

          // creates a array of url segments after baseUrl
          //   const segments = url
          //     .substring(url.indexOf(baseUrl) + (baseUrl.length + 1))
          //     .split("/")
          //     .filter(Boolean);

          if (
            url.startsWith(baseUrl) && // ensure its from same domain
            name != "" && // ensure has a name
            links.filter((e) => e.name === name || e.url === url).length === 0 // avoids duplicate
          ) {
            links.push({
              name,
              url,
            });
          }
        }
      });

      return links;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to Find Page");
    }
  }

  isvalidURL() {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(this.url);
  }

  getBaseUrl() {
    if (!this.isvalidURL()) return new Error("Invalid Url");
    const url = new URL(this.url);
    return `${url.protocol}//${url.hostname}`;
  }
}
