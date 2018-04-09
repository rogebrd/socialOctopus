package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.sun.org.apache.xpath.internal.operations.Quo;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.ResultSet;
import java.util.LinkedHashMap;

public class User {

    public String get(Object body, Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection();

        //LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        String id = "TODO";

        try {
            logger.log("Connecting...\n");
            connection.connect();

            logger.log("Verifying...\n");
           id =  EncryptionManager.verify(connection, body);

            //TODO write query
            ResultSet res1 = connection.SELECT("select * from Utility.settings where userId ='" + id+"' ");
            ResultSet res2 = connection.SELECT("select * from Utility.accounts where userId ='" + id+"' ");

            JSONObject formattedResults = formatUserGet(res1,res2);

            logger.log("Disconnecting...\n");
            connection.disconnect();

            //return results
            return (formattedResults.toJSONString());

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");
        }

        return ("");
    }

    public String post(Object body, Context context){
        DatabaseConnection connection;

        LambdaLogger logger = context.getLogger();

        logger.log("Creating Connection...\n");
        connection = new RDSConnection();

        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        String id = "TODO";
        int status = 1;

        try {
            logger.log("Connecting...\n");
            connection.connect();

            logger.log("Verifying...\n");
           id =  EncryptionManager.verify(connection, body);


            //get update queries
          //  String userID= postBody.get("userId");
            logger.log("Processing user request ... \n");
            String profilePic= postBody.get("profilePicUrl");
            String Quotes = postBody.get("quotes");
            String name = postBody.get("name");
            String viewPreference = postBody.get("viewPreference");
            //int view = Integer.parseInt(viewPreference);


            String type = postBody.get("type");
            String socialMediaID= postBody.get("socialMediaID");
            String socialMediaPassword= postBody.get("socialMediaPassword");
            String visibility = postBody.get("visibility");

            if (profilePic == null ||
                    Quotes == null ||
                    name== null ||
                    viewPreference== null ||
                    type== null ||
                    socialMediaID== null ||
                    socialMediaPassword== null ||
                    visibility == null ) {
                status = 0;
                throw new Exception("account creation failed");
            }



            logger.log("Update User Setting... \n");

            if (connection.UPDATE("UPDATE Utility.users SET name = '"+ name+"' where userId = '" + id+"'") == 0) {
                status = 0;
                throw new Exception("social octopus display name update failed userId is " + id );
            }
            if (connection.UPDATE("UPDATE Utility.settings SET profilePicsLink = '"+ profilePic + "', Quotes = '"+ Quotes
                    +"', viewPreference ='"+ viewPreference+"' where userId = '" + id+"'") == 0) {
                status = 0;
                throw new Exception("user setting table update failed ");
            }

            // worry about the duplication of type later

            logger.log("request twitter API to get client id client scerect access token etc ... \n");
            String client_id = "clientid";
            String client_secret = "clientsecrect";
            String access_token = "accesstoken";
            String access_secret = "accesssecret";

            // parse the visibility into an integer
            int view = Integer.parseInt(visibility);


            logger.log("Update User social media account in database... \n");

            if (connection.UPDATE("UPDATE Utility.accounts SET type ='"+ type+"' , client_id ='" + client_id+ "', client_secret ='" + client_secret+"' , access_token ='"+ access_token+"' , access_secret = '"+access_secret+"', visibility = "+view+", socialMediaID ='"+ socialMediaID+"' where userId = '" + id+"'") == 0) {
                status = 0;
                throw new Exception("social media account update failed ");
            }






            logger.log("Disconnecting...\n");
            connection.disconnect();

        }catch(Exception e){
            logger.log("ERROR: " + e.getMessage() + "\n");
            return ("update unsuccessul due to " + e.getMessage());
        }

        if (status == 1) {
            return ("update successful");
        }

        return ("unsuccessful due to unknown reasons");
    }

    private JSONObject formatUserGet(ResultSet res1, ResultSet res2) throws Exception{
        //TODO

        JSONObject results = new JSONObject();

        JSONArray Person = new JSONArray();

        JSONObject userSetting = new JSONObject();

        JSONArray socialMediaArray = new JSONArray();


        userSetting.put("userID", res1.getString("userId"));
        userSetting.put("profilePics", res1.getString("profilePicUrl"));
        userSetting.put("Quotes", res1.getString("Quotes"));
        userSetting.put("viewPreference", res1.getString("viewPreference"));

        Person.add(userSetting);

        while (res2.next()) {
            JSONObject socialMediaAccounts = new JSONObject();
            socialMediaAccounts.put("type", res2.getString("type"));
            socialMediaAccounts.put("socialMediaID", res2.getString("socialMediaID"));
       //     socialMediaAccounts.put("client_id", res2.getString("client_id"));
         //   socialMediaAccounts.put("client_secret", res2.getString("client_secret"));
           // socialMediaAccounts.put("access_token", res2.getString("access_token"));
            //socialMediaAccounts.put("access_secret", res2.getString("access_secret"));
            socialMediaAccounts.put("visibility", res2.getString("visibility"));


            socialMediaArray.add(socialMediaAccounts);
        }

        Person.add(socialMediaArray);

        results.put("results", Person);



        return results;
    }

    private JSONObject formatUserUpdates(String input){
        //TODO

        return null;
    }
}
