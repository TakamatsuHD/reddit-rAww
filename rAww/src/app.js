const redditAwwData = "https://www.reddit.com/r/aww/.json";

//fetches the data from the reddit API
fetch(redditAwwData)
  .then((response) => response.json()) //takes in the response and makes it into readable json
  .then((data) => {
    data.data.children.map((child) => {
      let title = child.data.title;
      let thumbnail = child.data.thumbnail ? child.data.thumbnail : undefined;
      let subreddit = child.data.subreddit;
      let link = `https://www.reddit.com${child.data.permalink}`;
      let post = {
        title: title,
        thumbnail: thumbnail,
        subreddit: subreddit,
        link: link,
      };
      return post;
    });
  })
  .catch((error) => console.error(error));
