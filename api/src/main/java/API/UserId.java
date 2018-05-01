package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sun.awt.image.ImageWatched;

import java.sql.ResultSet;
import java.util.LinkedHashMap;


// get user's public information for a third party
public class UserId extends LambdaSkeleton {
    public static final String UserId = "userId";
    public static final String Name = "name";
    public static final String ProfilePicUrl = "profilePicsLink";

    public JSONObject process(DatabaseConnection connection, Object body, LambdaLogger logger) throws Exception {

        LinkedHashMap<String, String> pathParams = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("pathParams"));
        int status = 0;


        logger.log("Getting Input...\n");
        String userId = pathParams.get("id");

        logger.log("Querying... User table and Setting table\n");
        //query for search
        ResultSet res1 = connection.SELECT("SELECT * FROM Utility.users u, Utility.settings s WHERE s.userId = u.userId AND (u.userId = '"+ userId+"');");


       logger.log("Querying... accounts table");
       ResultSet res2 = connection.SELECT("SELECT * FROM Utility.accounts where userId = '"+ userId+"' and visibility = 1;");

        logger.log("Formatting...\n");
        //Format results
        JSONObject formattedResults = formatSearch(res1,res2);

        return formattedResults;
    }

    private JSONObject formatSearch(ResultSet res1, ResultSet res2) throws Exception {
        JSONObject results = new JSONObject();

        JSONArray Profile = new JSONArray();

        JSONObject person = new JSONObject();

        res1.next();

        person.put(UserId, res1.getString("userId"));
        person.put(Name, res1.getString("name"));
        person.put(ProfilePicUrl, res1.getString("profilePicsLink"));
        person.put("Quotes", res1.getString("Quotes"));

        Profile.add(person);

        while (res2.next()) {
            JSONObject socialMedia = new JSONObject();
            socialMedia.put("type", res2.getString("type"));
            socialMedia.put("socialMediaID", res2.getString("socialMediaID"));

            Profile.add(socialMedia);
        }

        results.put("results", Profile);

        return results;
    }
}