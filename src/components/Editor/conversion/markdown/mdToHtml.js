import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import htmlToSlate from "../html/deserialize";

const desirialize = async string => {
  const data = await unified()
    .use(markdown)
    .use(remark2rehype)
    .use(html)
    .process(string);
  console.log("contents", data.contents);
  const slate = htmlToSlate(data.contents);
  console.log("slate", slate);
  return slate;
};

export default desirialize;
