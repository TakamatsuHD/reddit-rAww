let currentPage = 1;
const limit = 25;

function fetchRedditData() {
  fetch("https://www.reddit.com/r/aww/.json", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      let posts = json.data.children.map((child) => {
        let id = child.data.id;
        let title = child.data.title;
        let thumbNail = child.data.thumbnail ? child.data.thumbnail : null;
        let originalSubreditPage = child.data.subreddit;
        let link = `https://www.reddit.com${child.data.permalink}`;
        let post = {
          identifier: id,
          nameofPost: title,
          thumbnail: thumbNail,
          subreddit: originalSubreditPage,
          hyperlink: link,
        };
        return post;
      });
      redditListContainer(posts);
    })
    .catch((error) => console.error(error));
}

//this is the redditListContainer component that will hold  the posts
//I would put them in a separate folder, but I trouble importing them into this file
function redditListContainer(posts) {
  //skeleton for containter to hold the post
  const postContainer = document.createElement("div");
  postContainer.classList.add("redditListContainer");
  posts.forEach((post) => {
    console.log(post);
    let postDiv = document.createElement("div");
    let postItem = RedditListItem(post);
    postDiv.appendChild(postItem);
    postContainer.appendChild(postDiv);
  });

  document.body.appendChild(postContainer);
}

//this is the redditListContainer component
function RedditListItem(post) {
  //skeleton for post to hold the  contents

  const skelePost = document.createElement("div");
  skelePost.classList.add("redditListItem");

  const link = document.createElement("a");
  link.classList.add("redditListItemTitle");
  link.setAttribute("href", post.hyperlink);
  link.textContent = post.nameofPost;
  skelePost.appendChild(link);

  const origin = document.createElement("div");
  origin.classList.add("redditListSubredditOrigin");
  origin.textContent = `r/${post.subreddit}`;
  skelePost.appendChild(origin);

  const picture = document.createElement("img");
  picture.classList.add("redditListItemPicture");
  picture.setAttribute("src", post.thumbnail);
  skelePost.appendChild(picture);

  return skelePost;
}

fetchRedditData();
