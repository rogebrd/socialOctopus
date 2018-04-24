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
import com.tumblr.jumblr.types.*;
import com.tumblr.jumblr.*;

public class User extends LambdaSkeleton {
    private static final String consumer_key = "Mem1pyzoHKlyr4lDIKUo1xolEVAEcWY22n0EvWDPdez40yoD9g";
    private static final String consumer_secret = "FnCwfbkRl941DJw9tCBccAKIdVjyJQIvnIO8Dkyop0X8zyJlnJ";

    public JSONObject process(DatabaseConnection connection, Object body, LambdaLogger logger) throws Exception {

        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        String id = "TODO";
        int status = 1;


        logger.log("Verifying...\n");
        id =  EncryptionManager.verify(connection, body);


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

        logger.log("request twitter API to get client id client scerect access token etc ... \n");
        String client_id = "clientid";
        String client_secret = "clientsecrect";
        String access_token = "";
        String access_secret = "";

        if (type.equals("twitter")) {
            try {
                access_token = postBody.get("access_token");
                access_secret = postBody.get("access_secret");
            } catch (Exception e) {

            }

            if (access_token == null || access_secret == null) {
                access_token = "212813534-ARZMp2v4fA0bZv1Tm7MbbL5DI8oqAIXnms8HLCbr";
                access_secret = "2FEHLMVg5oTl1M4pwKHRFGwE9wsiSblFa6e071fbytlcK";
            }
        } else {

            try {
                client_id = postBody.get("client_id");
                client_secret = postBody.get("client_secret");
            } catch (Exception e) {

            }

            access_token = "a0lZ1NTur68U9DUvpHynQe8a32J7MhPqcxBI83wYH8sGZ950kr";
            access_secret = "7thrBJAgusIkNXGV5sy2GhLbm6TmBNfUtR7Dw4zNBLJVuUUffY";

        }


        // parse the visibility into an integer
        int view = Integer.parseInt(visibility);

        logger.log("Update User social media account in database... \n");

        if (connection.UPDATE("UPDATE Utility.accounts SET type ='"+ type+"' , client_id ='" + client_id+ "', client_secret ='" + client_secret+"' , access_token ='"+ access_token+"' , access_secret = '"+access_secret+"', visibility = "+view+", socialMediaID ='"+ socialMediaID+"' where userId = '" + id+"'") == 0) {

        } else {
            throw new Exception("social media account update failed ");
        }

        JSONObject results = new JSONObject();
        results.put("status", status);
        results.put("message", "Update Complete");

        return results;
    }
}
