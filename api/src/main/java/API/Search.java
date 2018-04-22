package API;

import Connection.DatabaseConnection;
import Connection.RDSConnection;
import Security.EncryptionManager;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sun.reflect.annotation.ExceptionProxy;

import java.sql.ResultSet;
import java.util.LinkedHashMap;

public class Search extends LambdaSkeleton {

    public static final String userId = "userId";
    public static final String name = "name";
    public static final String profilePicUrl = "profilePicsLink";

    public JSONObject process(DatabaseConnection connection, Object body, LambdaLogger logger) throws Exception{
        LinkedHashMap<String, String> postBody = (LinkedHashMap<String, String>)(((LinkedHashMap<String, Object>) body).get("body"));

        logger.log("Verifying...\n");
        String userId = EncryptionManager.verify(connection, body);

        logger.log("Querying...\n");
        //query for search
        String term = postBody.get("term");
        ResultSet res = connection.SELECT("SELECT * FROM Utility.users u,Utility.settings s WHERE u.userId = s.userId AND (u.userId LIKE '%" + term + "%' OR u.name LIKE '%" + term + "%')");

        logger.log("Formatting...\n");
        //Format results
        JSONObject results = formatSearch(res);

        return (results);
    }

    private JSONObject formatSearch(ResultSet res) throws Exception {
        JSONObject results = new JSONObject();

        JSONArray people = new JSONArray();
        while(res.next()){
            JSONObject person = new JSONObject();

            person.put(userId, res.getString(userId));
            person.put(name, res.getString(name));
            person.put(profilePicUrl, res.getString(profilePicUrl));

            people.add(person);
        }

        if(people.size() == 0){
            results.put("status",0);
            results.put("message", "0 results returned");
        }else{
            results.put("status",1);
            results.put("results", people);
        }

        return results;
    }

}
