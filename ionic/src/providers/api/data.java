import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class data {

	JSONObject results = new JSONObject();
	
	public getResults(){
		results.put("status", status);
        results.put("token", token);
		return results;
	}

}