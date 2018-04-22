package Misc;

import API.LambdaSkeleton;
import Connection.DatabaseConnection;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.ResultSet;

public class Connector extends LambdaSkeleton {
    @Override
    public JSONObject process(DatabaseConnection connection, Object body, LambdaLogger logger) throws Exception {
        logger.log("Querying...\n");
        ResultSet res = connection.SELECT(body.toString());
        JSONArray ar = new JSONArray();

        while(res.next()){
            JSONObject obj = new JSONObject();
            //obj.put("id", res.getString("id"));
            obj.put("userId", res.getString("userId"));
            obj.put("password", res.getString("password"));
            obj.put("name", res.getString("name"));
            obj.put("Token", res.getString("Token"));

            ar.add(obj);
        }

        JSONObject jo = new JSONObject();
        jo.put("res", ar);

        return jo;

    }
}
