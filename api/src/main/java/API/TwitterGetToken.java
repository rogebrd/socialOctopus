package API;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import Connection.DatabaseConnection;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;
import twitter4j.auth.RequestToken;
import java.io.*;
import java.util.LinkedHashMap;

import twitter4j.*;
import twitter4j.conf.ConfigurationBuilder;


/**
 * Created by 352videoquiz on 4/22/18.
 */
public class TwitterGetToken {
    public AccessToken accessToken;

    public String get()   {
        String url = "";


        JSONObject res = new JSONObject();
try {
   // logger.log("get Singleton ...\n");

    // The factory instance is re-useable and thread safe.
    Twitter twitter = TwitterFactory.getSingleton();

    try {
        twitter.setOAuthConsumer("6WUiXKkUgfYTtPQxn4PvFg32z", "M4CVwQPTFooisegoQX8iO8nxtygFMxjeGvkrMkc96yyTNg5Ou1");
    } catch (Exception e) {

    }
  //  logger.log("get request token ...\n");
    RequestToken requestToken = twitter.getOAuthRequestToken();
    AccessToken accessToken = null;
  //  BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  //  logger.log("get request URL");
       url =  requestToken.getAuthorizationURL();

    res.put("status",1);
    res.put("authURL",url);
    res.put("requestToken",requestToken.getToken());
    res.put("requestTokenSecret",requestToken.getTokenSecret());
    return res.toString();


} catch (Exception e) {
    return "status: -1 " + e.getMessage();
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
            Twitter twitter = TwitterFactory.getSingleton();
            try {
                twitter.setOAuthConsumer("6WUiXKkUgfYTtPQxn4PvFg32z", "M4CVwQPTFooisegoQX8iO8nxtygFMxjeGvkrMkc96yyTNg5Ou1");
            } catch (Exception e) {

            }
            //  logger.log("get request token ...\n");

            requestToken = new RequestToken(OAuthToken,OAuthTokenSecret);
            logger.log("request failed?\n");

            accessToken = twitter.getOAuthAccessToken(requestToken, pin);
            logger.log("access failed? \n");




        } catch (Exception e) {

            if (requestToken == null) {
                return "request Token is null    " + e.getMessage();
            }
            return "status: -1 " + e.getMessage();

        }
        JSONObject res = new JSONObject();

        try {
            res.put("status", 1);
            res.put("access_token", accessToken.getToken());
            res.put("access_secret", accessToken.getTokenSecret());
        } catch (Exception e) {
            return "status: -1" ;
        }



        return res.toString();
    }




}
