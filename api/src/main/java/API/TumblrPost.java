package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.tumblr.jumblr.types.*;
import com.tumblr.jumblr.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.ResultSet;
import java.util.List;
import java.util.*;
import com.tumblr.jumblr.request.RequestBuilder;


public class TumblrPost {
    public static int debug;
    private static final String consumer_key = "Mem1pyzoHKlyr4lDIKUo1xolEVAEcWY22n0EvWDPdez40yoD9g";
    private static final String consumer_secret = "FnCwfbkRl941DJw9tCBccAKIdVjyJQIvnIO8Dkyop0X8zyJlnJ";

    public String post(Object body, Context context){

        LambdaLogger logger = context.getLogger();
        logger.log("Creating Connection...\n");
        String access_token = "";
        String access_secret="";

        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        try {
            logger.log("Connecting...\n");

            logger.log("Verifying...\n");

            logger.log("Creating Tumblr Client...\n");

            logger.log("Connecting to Tumblr Client...\n");
            JumblrClient client = new JumblrClient(consumer_key, consumer_secret);




            logger.log("set tumblr token...\n");

            access_token = "zxG4S4aSihK3bMNs8yZYo7U3bJ6QrwJtDJVuGhepRWReyiHoAO";
            access_secret = "6paipcfyasYojCacdQN3N9XUQtxSxunjj8sZCcJzY36k3vfXb2";
            client.setToken(access_token, access_secret);


            logger.log("generating new post ... \n");
            TextPost newPost = client.newPost(client.user().getBlogs().get(0).getName(),TextPost.class);
            String title = postBody.get("title");
            String text = postBody.get("status");
            newPost.setTitle(title);
            newPost.setBody("<p>" + text + "</p>");

            logger.log("creating new post ...\n");

            newPost.save();


            return ("Post created successful ");
        }catch(Exception e){
          return ("Error: Posting is un successful");
        }
    }

}
