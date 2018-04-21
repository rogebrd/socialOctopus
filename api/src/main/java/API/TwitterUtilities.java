package API;

import Connection.DatabaseConnection;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;
import twitter4j.conf.ConfigurationBuilder;

import java.sql.ResultSet;

public class TwitterUtilities {

    private static final String consumer_token = "6WUiXKkUgfYTtPQxn4PvFg32z";
    private static final String consumer_secret = "M4CVwQPTFooisegoQX8iO8nxtygFMxjeGvkrMkc96yyTNg5Ou1";

    public static Twitter createTwitterClient(DatabaseConnection connection, String userId) throws Exception {
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

        //access_token = "212813534-ARZMp2v4fA0bZv1Tm7MbbL5DI8oqAIXnms8HLCbr";
        //access_secret = "2FEHLMVg5oTl1M4pwKHRFGwE9wsiSblFa6e071fbytlcK";

        //add access token info to twitter
        AccessToken token = new AccessToken(access_token, access_secret);
        twitter.setOAuthAccessToken(token);

        return (twitter);
    }
}
