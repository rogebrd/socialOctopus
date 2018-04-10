package API;

import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.api.TweetsResources;
import twitter4j.auth.AccessToken;

public class TwitterConnector {

    private static String consumer_token = "6WUiXKkUgfYTtPQxn4PvFg32z";
    private static String consumer_secret = "M4CVwQPTFooisegoQX8iO8nxtygFMxjeGvkrMkc96yyTNg5Ou1";
    private static String access_token = "212813534-ARZMp2v4fA0bZv1Tm7MbbL5DI8oqAIXnms8HLCbr";
    private static String access_secret = "2FEHLMVg5oTl1M4pwKHRFGwE9wsiSblFa6e071fbytlcK";

    public static void main(String[] args){

        try {
            System.out.println("Testing Post");

            Twitter twitter = TwitterFactory.getSingleton();
            twitter.setOAuthConsumer(consumer_token, consumer_secret);

            AccessToken token = new AccessToken(access_token, access_secret);
            twitter.setOAuthAccessToken(token);

            TweetsResources tweets;

            //Status status = twitter.updateStatus("JAVA WORKS!!!!!!");
        }catch(Exception e){

        }
    }
}
