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


public class TumblrPost {
    public static int debug;

    private static final String consumer_key = "Mem1pyzoHKlyr4lDIKUo1xolEVAEcWY22n0EvWDPdez40yoD9g";
    private static final String consumer_secret = "FnCwfbkRl941DJw9tCBccAKIdVjyJQIvnIO8Dkyop0X8zyJlnJ";

    public String post(Object body, Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        //  connection = new RDSConnection();

        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        String postText = postBody.get("status");

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

            logger.log("posting...\n");
            QuotePost post = client.newPost(blogName, QuotePost.class);
            post.setQuote(postText);
            post.save();


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