//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");




const homeStartingContent = "Hi, I’m so happy you’re here! My name is Upasana and I’m the twenty-something girl behind this lifestyle blog, created with the intention of being an online journal where I chat about everything I enjoy. I have something a bit different for you today. As I said here, I want to be more personal and let you take a glimpse into my daily life more often. As a quite nosy gal, I love getting to know the person behind a blog and their routines so I thought it would be interesting to share with you a typical day in my life. Let me warn you, it is a normal workday, nothing fancy or very entertaining. But I thought it could still be fun to share it nonetheless. Hope you find it interesting! Here is what I get up to on a normal weekday..";
const aboutContent = "Hey, I’m Upasana. I’m a twenty-something a Btech Student snd a coder by day and lifestyle blogger by night in the pursuit of a wholehearted life. When I’m not working or blogging, you’ll most likely find me daydreaming, reading books or binge-watching Gilmore Girls. I also collect inspirational quotes and pretty stationery and find any excuse to make a list..I love personality tests. They’re fun and super insightful! I’m an INFJ according to Myers-Briggs and an Enneagram Type 6. Oh, and a Hufflepuff. I love traveling but I'm also a big homebody and most of the time you can find me reading, baking, doing a puzzle or daydreaming.";
const contactContent = "Hi, can’t wait to hear from you. Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});