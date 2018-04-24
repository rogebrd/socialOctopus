package API;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import Connection.DatabaseConnection;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;
import twitter4j.auth.RequestToken;
import twitter4j.conf.*;
import java.io.*;
import java.util.LinkedHashMap;

import twitter4j.*;
import twitter4j.conf.ConfigurationBuilder;


/**
 * Created by 352videoquiz on 4/22/18.
 */
public class TwitterGetToken {
    public AccessToken accessToken;

    public String get(Context context)   {
        String url = "";
        LambdaLogger logger = context.getLogger();


        JSONObject res = new JSONObject();
try {
   // logger.log("get Singleton ...\n");

    // The factory instance is re-useable and thread safe.
    //Twitter twitter = TwitterFactory.getSingleton();

    ConfigurationBuilder builder = new ConfigurationBuilder();
    builder.setOAuthConsumerKey("6WUiXKkUgfYTtPQxn4PvFg32z");
    builder.setOAuthConsumerSecret("M4CVwQPTFooisegoQX8iO8nxtygFMxjeGvkrMkc96yyTNg5Ou1");
    Configuration configuration = builder.build();
    TwitterFactory factory = new TwitterFactory(configuration);
    Twitter twitter = factory.getInstance();


    logger.log("get request token ...\n");

    RequestToken requestToken = twitter.getOAuthRequestToken();
    logger.log("successfully get the request token");

       url =  requestToken.getAuthorizationURL();
       logger.log("successfully get the url");


    res.put("status",1);
    res.put("authURL",url);
    res.put("requestToken",requestToken.getToken());
    res.put("requestTokenSecret",requestToken.getTokenSecret());
    return res.toString();


} catch (Exception e) {
    try {
        res.put("status", -1);
        res.put("Error: ",e.getMessage());
    } catch (Exception ee) {

    }
    return res.toString();
}






    }

    public String post(Object body,Context context)  {
        LambdaLogger logger = context.getLogger();

        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));


        String pin = postBody.get("pin");
        String OAuthToken = postBody.get("OAuthToken");
        String OAuthTokenSecret = postBody.get("tokenSecret");
       // RequestToken requestToken = new RequestToken()
        logger.log("parse successful\n");



        RequestToken requestToken = null;
        try {
            ConfigurationBuilder builder = new ConfigurationBuilder();
            builder.setOAuthConsumerKey("6WUiXKkUgfYTtPQxn4PvFg32z");
            builder.setOAuthConsumerSecret("M4CVwQPTFooisegoQX8iO8nxtygFMxjeGvkrMkc96yyTNg5Ou1");
            Configuration configuration = builder.build();
            TwitterFactory factory = new TwitterFactory(configuration);
            Twitter twitter = factory.getInstance();
            //  logger.log("get request token ...\n");

            requestToken = new RequestToken(OAuthToken,OAuthTokenSecret);
            logger.log("request failed?\n");

            accessToken = twitter.getOAuthAccessToken(requestToken, pin);
            logger.log("access failed? \n");




        } catch (Exception e) {
            JSONObject res1 = new JSONObject();

            if (requestToken == null) {
                return "request Token is null    " + e.getMessage();
            }
            try {
                res1.put("status", 1);
            } catch (Exception ee) {

            }
            return res1.toString();

        }
        JSONObject res = new JSONObject();

        try {
            res.put("status", 1);
            res.put("access_token", accessToken.getToken());
            res.put("access_secret", accessToken.getTokenSecret());
        } catch (Exception e) {
            try {
                res.put("status", 1);
            } catch (Exception ee) {

            }
            return res.toString();
        }



        return res.toString();
    }




}
