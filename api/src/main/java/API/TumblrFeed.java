package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.tumblr.jumblr.types.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import twitter4j.conf.ConfigurationBuilder;
import com.tumblr.jumblr.*;
import java.sql.ResultSet;
import java.util.List;
import java.util.*;
import com.tumblr.jumblr.request.RequestBuilder;


public class TumblrFeed {
    public static int debug;
    private static final String consumer_key = "Mem1pyzoHKlyr4lDIKUo1xolEVAEcWY22n0EvWDPdez40yoD9g";
    private static final String consumer_secret = "FnCwfbkRl941DJw9tCBccAKIdVjyJQIvnIO8Dkyop0X8zyJlnJ";

    public String get(Object body, Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
      //  connection = new RDSConnection();


        try {
            logger.log("Connecting...\n");

            logger.log("Verifying...\n");

            String id = "bradrogers";

            logger.log(id + "\n");

            logger.log("Creating Tumblr Client...\n");

            logger.log("Connecting to Tumblr Client...\n");
            JumblrClient client = new JumblrClient(consumer_key, consumer_secret);

            client.setToken(
                    "a0lZ1NTur68U9DUvpHynQe8a32J7MhPqcxBI83wYH8sGZ950kr",
                    "7thrBJAgusIkNXGV5sy2GhLbm6TmBNfUtR7Dw4zNBLJVuUUffY"
            );


            logger.log("Get Tumblr User...\n");
            com.tumblr.jumblr.types.User user = client.user();


            logger.log("map string operations... \n");
            Map<String, ?>  options = Collections.emptyMap();
            Map<String, Object> mod = new HashMap<String, Object>();
            mod.putAll(options);
            Map<String, Object> soptions = mod;

            logger.log("consumer secret setup.. \n");
            soptions.put("api_key", consumer_secret);

            logger.log("construct paths.. \n");
            String path = "/posts";
            if (soptions.containsKey("type")) {
                path += "/" + soptions.get("type").toString();
                soptions.remove("type");
            }

            logger.log("request building...\n");
            RequestBuilder requestBuilder = new RequestBuilder(client);
            requestBuilder.setToken("a0lZ1NTur68U9DUvpHynQe8a32J7MhPqcxBI83wYH8sGZ950kr", "7thrBJAgusIkNXGV5sy2GhLbm6TmBNfUtR7Dw4zNBLJVuUUffY");
            requestBuilder.setConsumer(consumer_key, consumer_secret);
            String blogName = "socialoctopustesting.tumblr.com";
            String blogUrl = blogName.contains(".") ? blogName : blogName + ".tumblr.com";
            String blogPath = "/blog/" + blogUrl + path;

            logger.log("retrieve posts...\n");
           List<com.tumblr.jumblr.types.Post> posts = requestBuilder.get(blogPath, soptions).getPosts();

            logger.log("Parsing Timeline...\n");
            JSONObject Response = new JSONObject();
            JSONArray tumbs = new JSONArray();
            int i =0;
            logger.log("list size of posts: " + posts.size());
           // String Avatarurl = client.blogAvatar("socialoctopustesting.tumblr.com");

            for(com.tumblr.jumblr.types.Post post: posts){
                i++;

                JSONObject tweet = new JSONObject();
               // tweet.put("avatarURL",Avatarurl);

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
