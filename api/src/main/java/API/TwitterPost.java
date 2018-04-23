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

import java.util.List;
import java.sql.ResultSet;
import java.util.LinkedHashMap;

public class TwitterPost extends LambdaSkeleton{

    String postText = postBody.get("status");

    public JSONObject process(DatabaseConnection connection, Object body, LambdaLogger logger) throws Exception{
        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        logger.log("Verifying...\n");
        String id = EncryptionManager.verify(connection, body);

        logger.log("Creating Twitter Client...\n");
        Twitter twitter = TwitterUtilities.createTwitterClient(connection, id);

        logger.log("Updating status...\n");
        //Update status
        Status status = twitter.updateStatus(postText);
        logger.log("Successfully updated the status to [" + status.getText() + "]. \n");

        return (new JSONObject().put("status", "1").toString());
    }

}
