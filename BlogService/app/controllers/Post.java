package controllers;

import controllers.util.commonUtils;
import models.BlogPost;
import models.PostComment;
import models.User;
import play.data.Form;
import play.data.validation.Constraints;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class Post extends Controller {

    public Result addPost() {
        Form<PostForm> postForm = Form.form(PostForm.class).bindFromRequest();

        if (postForm.hasErrors()) {
            return badRequest(postForm.errorsAsJson());
        } else {
            BlogPost newBlogPost = new BlogPost();
            newBlogPost.commentCount = 0L;
            newBlogPost.subject = postForm.get().subject;
            newBlogPost.content = postForm.get().content;
            newBlogPost.user = getUser();
            newBlogPost.save();
        }
        return ok(commonUtils.buildJsonResponse("success", "Post added successfully"));
    }

    public Result getUserPosts() {
        User user = getUser();
        if(user == null) {
            return badRequest(commonUtils.buildJsonResponse("error", "No such user"));
        }
        return ok(Json.toJson(BlogPost.findBlogPostsByUser(user)));
    }

    public Result addComment() {
        Form<CommentForm> commentForm = Form.form(CommentForm.class).bindFromRequest();

        if (commentForm.hasErrors()) {
            return badRequest(commentForm.errorsAsJson());
        } else {
            PostComment newComment = new PostComment();
            BlogPost blogPost = BlogPost.findBlogPostById(commentForm.get().postId);
            blogPost.commentCount++;
            blogPost.save();
            newComment.blogPost = blogPost;
            newComment.user = getUser();
            newComment.content = commentForm.get().comment;
            newComment.save();
            return ok(commonUtils.buildJsonResponse("success", "Comment added successfully"));
        }
    }


    public static class CommentForm {

        @Constraints.Required
        public Long postId;

        @Constraints.Required
        public String comment;

    }

    private static User getUser() {
        return User.findByEmail(session().get("username"));
    }

    public static class PostForm {

        @Constraints.Required
        @Constraints.MaxLength(255)
        public String subject;

        @Constraints.Required
        public String content;

    }
}
