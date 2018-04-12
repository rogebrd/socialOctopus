package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.TwitterObjectFactory;
import twitter4j.auth.AccessToken;
import twitter4j.conf.ConfigurationBuilder;

import java.sql.ResultSet;
import java.util.List;

public class TwitterConnector {

    private static final String consumer_token = "6WUiXKkUgfYTtPQxn4PvFg32z";
    private static final String consumer_secret = "M4CVwQPTFooisegoQX8iO8nxtygFMxjeGvkrMkc96yyTNg5Ou1";

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
            Twitter twitter = createTwitterClient(connection, id);

            logger.log(twitter.getOAuthAccessToken().getToken() + "\n" + twitter.getOAuthAccessToken().getTokenSecret() + "\n");

            logger.log("Getting Timeline...\n");
            List<Status> timeline = twitter.timelines().getHomeTimeline();

            logger.log("Parsing Timeline...\n");
            JSONArray tweets = new JSONArray();
            for(Status s: timeline){
                JSONObject tweet = (JSONObject) (new JSONParser().parse(TwitterObjectFactory.getRawJSON(s)));
                tweets.add(tweet);
            }

            logger.log("Disconnecting...\n");
            connection.disconnect();

            return (tweets.toJSONString());
        }catch(Exception e){
            System.out.println(e.getMessage());
            logger.log("ERROR: " + e.getMessage() + "\n");

            return ("ERROR: " + e.getMessage() + "\n");
        }
    }

    private static Twitter createTwitterClient(DatabaseConnection connection, String userId) throws Exception {
        String access_token = "";
        String access_secret = "";

        //Get the twitter factory and populate the consumer info
        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setJSONStoreEnabled(true);
        //cb.setHttpConnectionTimeout(100000);

        Twitter twitter = new TwitterFactory(cb.build()).getInstance();
        twitter.setOAuthConsumer(consumer_token, consumer_secret);

        //select tokens from db
        ResultSet res = connection.SELECT("SELECT * FROM accounts WHERE userId='" + userId + "' AND type='twitter'");

        //select tokens
        if(res.next()){
            access_token = res.getString("access_token");
            access_secret = res.getString("access_secret");
        }else{
            throw new Exception("Twitter account not found");
        }

        //add access token info to twitter
        AccessToken token = new AccessToken(access_token, access_secret);
        twitter.setOAuthAccessToken(token);

        return (twitter);
    }
}
