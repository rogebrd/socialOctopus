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

    public JSONObject process(DatabaseConnection connection, Object body, LambdaLogger logger) throws Exception {

        logger.log("Verifying...\n");
        String id = EncryptionManager.verify(connection, body);

        logger.log("Creating Twitter Client...\n");
        Twitter twitter = TwitterUtilities.createTwitterClient(connection, id);

        logger.log("Getting Timeline...\n");
        List<Status> timeline = twitter.timelines().getHomeTimeline();

        logger.log("Parsing Timeline...\n");
        JSONArray tweets = new JSONArray();
        for(Status s: timeline){
            JSONObject tweet = (JSONObject) (new JSONParser().parse(TwitterObjectFactory.getRawJSON(s)));
            tweets.add(tweet);
        }

        JSONObject results = new JSONObject();
        results.put("tweets", tweets);

        return results;
    }
}
