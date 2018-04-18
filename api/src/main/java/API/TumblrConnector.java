package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import twitter4j.conf.ConfigurationBuilder;
import com.tumblr.jumblr.*;
import java.sql.ResultSet;
import java.util.List;
import java.util.*;


public class TumblrConnector {

    private static final String consumer_key = "Mem1pyzoHKlyr4lDIKUo1xolEVAEcWY22n0EvWDPdez40yoD9g";
    private static final String consumer_secret = "FnCwfbkRl941DJw9tCBccAKIdVjyJQIvnIO8Dkyop0X8zyJlnJ";

    public String get(Object body, Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection();

        try {
            logger.log("Connecting...\n");
            connection.connect();

            logger.log("Verifying...\n");
            String id = EncryptionManager.verify(connection, body);

            logger.log(id + "\n");

            logger.log("Creating Twitter Client...\n");
            List<com.tumblr.jumblr.types.Post> posts = createTumblrTimeLine(connection, id);


            logger.log("Parsing Timeline...\n");
            JSONArray tumbs = new JSONArray();
            for(com.tumblr.jumblr.types.Post post: posts){
                JSONObject tweet = (JSONObject) (new JSONParser().parse(post.toString()));
                tumbs.add(tweet);
            }

            logger.log("Disconnecting...\n");
            connection.disconnect();

            return (tumbs.toJSONString());
        }catch(Exception e){
            System.out.println(e.getMessage());
            logger.log("ERROR: " + e.getMessage() + "\n");

            return ("ERROR: " + e.getMessage() + "\n");
        }
    }

    private static   List<com.tumblr.jumblr.types.Post> createTumblrTimeLine(DatabaseConnection connection, String userId) throws Exception {
        String access_token = "";
        String access_secret = "";

        //Get the twitter factory and populate the consumer info
        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setJSONStoreEnabled(true);
        //cb.setHttpConnectionTimeout(100000);
        JumblrClient client = new JumblrClient(consumer_key, consumer_secret);

        client.setToken(
                "a0lZ1NTur68U9DUvpHynQe8a32J7MhPqcxBI83wYH8sGZ950kr",
                "7thrBJAgusIkNXGV5sy2GhLbm6TmBNfUtR7Dw4zNBLJVuUUffY"
        );

        com.tumblr.jumblr.types.User user = client.user();

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("filter", "raw");
        List<com.tumblr.jumblr.types.Post> posts = client.blogQueuedPosts("socialoctopustesting.tumblr.com", params);



        return (posts);
    }
}
