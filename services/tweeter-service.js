const dao = require("../db/tweets/tweet-dao");
module.exports = (app) => {
  const findAllTweets = (req, res) =>
    dao.findAllTweets().then((tweets) => res.json(tweets));
  app.get("/rest/tweets", findAllTweets);

  const createTweet = (req, res) => {
    const newTweet = {
      topic: "Web Development",
      userName: "ReactJS",
      verified: false,
      handle: "ReactJS",
      time: "2h",
      "avatar-image": "../../../images/react-blue.png",
      "logo-image": "../../../images/react-blue.png",
      stats: {
        comments: 123,
        retweets: 234,
        likes: 345,
      },
      ...req.body,
    };

    dao.createTweet(newTweet).then((insertedTweet) => res.json(insertedTweet));
  };
  app.post("/rest/tweets", createTweet);

  const deleteTweet = (req, res) =>
    dao.deleteTweet(req.params.id).then((status) => res.send(status));
  app.delete("/rest/tweets/:id", deleteTweet);

  const likeTweet = (req, res) =>
    dao.updateTweet(req.params.id, req.body).then((status) => res.send(status));
  app.put("/rest/tweets/:id", likeTweet);
};
