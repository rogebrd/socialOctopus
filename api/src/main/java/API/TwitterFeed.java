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

public class TwitterFeed {

    public String get(Object body, Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection();

        try {
            logger.log("Connecting...\n");
            connection.connect();

            logger.log("Verifying...\n");
           // String id = EncryptionManager.verify(connection, body);
            String id = "bradrogers";

            logger.log(id + "\n");

            logger.log("Creating Twitter Client...\n");
            Twitter twitter = TwitterUtilities.createTwitterClient(connection, id);

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
}
