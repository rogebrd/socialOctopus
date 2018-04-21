package API;

import Connection.DatabaseConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.ResultSet;

public class UserProfile extends LambdaSkeleton {

    public JSONObject process(DatabaseConnection connection, Object body, LambdaLogger logger) throws Exception {
        logger.log("Verifying...\n");
        String id =  EncryptionManager.verify(connection, body);

        ResultSet res1 = connection.SELECT("select * from Utility.settings where userId ='" + id+"' ");
        ResultSet res2 = connection.SELECT("select * from Utility.accounts where userId ='" + id+"' ");

        JSONObject formattedResults = formatUserGet(res1,res2);

        return formattedResults;
    }

    private JSONObject formatUserGet(ResultSet res1, ResultSet res2) throws Exception{

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
            socialMediaAccounts.put("visibility", res2.getString("visibility"));

            socialMediaArray.add(socialMediaAccounts);
        }

        Person.add(socialMediaArray);
        results.put("results", Person);

        return results;
    }
}
