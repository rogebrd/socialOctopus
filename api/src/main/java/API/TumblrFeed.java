package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.tumblr.jumblr.types.*;
import com.tumblr.jumblr.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.ResultSet;
import java.util.List;
import java.util.*;
import com.tumblr.jumblr.request.RequestBuilder;


public class TumblrFeed {
    public static int debug;
    private static final String consumer_key = "Mem1pyzoHKlyr4lDIKUo1xolEVAEcWY22n0EvWDPdez40yoD9g";
    private static final String consumer_secret = "FnCwfbkRl941DJw9tCBccAKIdVjyJQIvnIO8Dkyop0X8zyJlnJ";

    public String get(Object body, Context context){

        LambdaLogger logger = context.getLogger();
        logger.log("Creating Connection...\n");
        String access_token = "";
        String access_secret="";




        try {
            logger.log("Connecting...\n");

            logger.log("Verifying...\n");

            logger.log("Creating Tumblr Client...\n");

            logger.log("Connecting to Tumblr Client...\n");
            JumblrClient client = new JumblrClient(consumer_key, consumer_secret);




            logger.log("set tumblr token...\n");

            access_token = "zxG4S4aSihK3bMNs8yZYo7U3bJ6QrwJtDJVuGhepRWReyiHoAO";
            access_secret = "6paipcfyasYojCacdQN3N9XUQtxSxunjj8sZCcJzY36k3vfXb2";
            client.setToken(access_token, access_secret);

            logger.log("Get Tumblr Dashboard Posts...\n");

            List<com.tumblr.jumblr.types.Post> posts = null;
               posts  = client.userDashboard();
               logger.log("successfully retrieved dashboard from user \n");


            logger.log("Parsing Timeline...\n");
            JSONObject Response = new JSONObject();
            JSONArray tumbs = new JSONArray();
            int i =0;
            logger.log("list size of posts: " + posts.size());


            for(com.tumblr.jumblr.types.Post post: posts){
                i++;

                JSONObject tweet = new JSONObject();

                tweet.put("blog_name",post.getBlogName());
                tweet.put("id",post.getId());
                tweet.put("post_url",post.getPostUrl());
                tweet.put("short_url",post.getShortUrl());
                tweet.put("type",post.getType());
                tweet.put("date",post.getDateGMT());
                tweet.put("timestamp",post.getTimestamp());
                tweet.put("state",post.getState());
                tweet.put("format",post.getFormat());
                tweet.put("reblog_key",post.getReblogKey());

                JSONArray tags = new JSONArray();
                for (String tag :post.getTags()) {
                    tags.add(tag);
                }
                tags.toJSONString();
                tweet.put("tags",tags);
                tweet.put("note_count",post.getNoteCount());
                tweet.put("title",post.getSourceTitle());
                logger.log("parsing post, post number : " + i);
                if(post.getClass().equals(TextPost.class)){
                    TextPost newPost = (TextPost) post;
                    tweet.put("body",newPost.getBody());
                } else if(post.getClass().equals(PhotoPost.class)){
                    PhotoPost newPost = (PhotoPost) post;
                    tweet.put("caption",newPost.getCaption());

                    List<Photo> photos = newPost.getPhotos();
                    JSONArray photosInfo = new JSONArray();
                    for (Photo photo:photos) {
                      JSONObject pp = new JSONObject();
                      PhotoSize p = photo.getOriginalSize();
                      pp.put("height",p.getHeight());
                      pp.put("width",p.getWidth());
                      pp.put("url",p.getUrl());
                        photosInfo.add(pp);
                    }
                    tweet.put("photos",photosInfo);

                }

                logger.log(post.toString());
                tumbs.add(tweet);
            }

           // String numPost = Integer.toString(posts.size());
            Response.put("total_posts",posts.size());
            Response.put("posts",tumbs);



            logger.log("Parsing Finished");


            return (Response.toJSONString());
        }catch(Exception e){
            System.out.println(e.getMessage());
            logger.log("ERROR: " + e.getMessage() + "\n");
            String ee = "";
            if (debug == 1) {
                ee = "error before create tumblr";

            }

            return ("ERROR: " + e.getMessage() + ee+"\n");
        }
    }

}
