import middleware from "./middleware/middleware";
import { scrapeSite } from "./utils/utils";
import { cors, DETAIL_POST } from "./utils/const";

export default async function mostViewed(req, res) {
  await middleware(req, res, cors);
  const { $, status } = await scrapeSite("most-viewed");
  const posts = [];

  $(".bgSingle .listNews").each((i, el) => {
    const link =
      DETAIL_POST +
      $(el).find(".imageNews").find("a").attr("href").replace(".html", "");

    const pusblised_at = $(el)
      .find("span.date")
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .trim();

    const category = $(el).find("span span").text();
    const title = $(el)
      .find(".titleNews")
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .trim();
    const image = $(el).find(".imageNews").find("img").attr("data-src");

    posts.push({
      link,
      title,
      image,
      category,
      pusblised_at,
    });
  });

  return res.json({ status, posts });
}
