//each post has an id and to get to the next page you need the last id of the initial post which we dont have yet
let pageid = "";

function fetchRedditData(id) {
  if (!pageid) {
    fetchPage = "https://www.reddit.com/r/aww/.json";
  } else {
    fetchPage = `https://www.reddit.com/r/aww/.json?after=t3_${id}`;
  }
  fetch(fetchPage, {
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
        pageid = id;
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
    let postItem = RedditListItem(post);
    postContainer.appendChild(postItem);
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

  if (post.thumbnail !== "self") {
    const picture = document.createElement("img");
    picture.classList.add("redditListItemPicture");
    picture.setAttribute("src", post.thumbnail);
    skelePost.appendChild(picture);
  }

  return skelePost;
}
let i = true;
//infinite scrolling logic
const handleInfiniteScroll = () => {
  const pageEnd =
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (pageEnd && i) {
    i = false;
    fetchRedditData(pageid); //adding the page id now will cause us to load the next page because the pageid is now set last id that was last rendered
    //need this function so scroll events don't get triggered multiple times in one scroll
    setTimeout(function () {
      i = true;
    }, 500);
  }
};

window.addEventListener("scroll", handleInfiniteScroll);

fetchRedditData();
