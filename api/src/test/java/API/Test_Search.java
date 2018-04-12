package API;

import com.amazonaws.services.lambda.runtime.ClientContext;
import com.amazonaws.services.lambda.runtime.CognitoIdentity;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.junit.Before;
import org.junit.Test;

import java.util.LinkedHashMap;

import static org.junit.Assert.assertEquals;

public class Test_Search {

    private static final String TOKEN = "TEST";
    private Search search;

    @Before
    public void setup(){
        search = new Search();
    }

    @Test
    public void test_search_valid() throws Exception {
        //no result term
        Object body = setUpBody(TOKEN, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");

        //JSONObject res = (JSONObject) new JSONParser().parse(search.post(body, setUpContext()));

        //assertEquals("Search status", 1, res.get("status"));
    }

    @Test
    public void test_search_valid2() throws Exception {
        //should return test user
        Object body = setUpBody(TOKEN, "TEST");

        //JSONObject res = (JSONObject) new JSONParser().parse(search.post(body, setUpContext()));

       // assertEquals("Search status", 1, res.get("status"));
    }

    private Object setUpBody(String token, String term){
        LinkedHashMap<String, String> header = new LinkedHashMap<>();
        LinkedHashMap<String, Object> body = new LinkedHashMap<>();
        LinkedHashMap<String, String> postBody = new LinkedHashMap<>();

        postBody.put("term", term);

        header.put("SOToken", token);
        body.put("headers", header);
        body.put("body", postBody);

        return (body);
    }

    private Context setUpContext(){
        return (new Context() {
            @Override
            public String getAwsRequestId() {
                return null;
            }

            @Override
            public String getLogGroupName() {
                return null;
            }

            @Override
            public String getLogStreamName() {
                return null;
            }

            @Override
            public String getFunctionName() {
                return null;
            }

            @Override
            public String getFunctionVersion() {
                return null;
            }

            @Override
            public String getInvokedFunctionArn() {
                return null;
            }

            @Override
            public CognitoIdentity getIdentity() {
                return null;
            }

            @Override
            public ClientContext getClientContext() {
                return null;
            }

            @Override
            public int getRemainingTimeInMillis() {
                return 0;
            }

            @Override
            public int getMemoryLimitInMB() {
                return 0;
            }

            @Override
            public LambdaLogger getLogger() {
                return new LambdaLogger() {
                    @Override
                    public void log(String s) {
                        System.out.println(s);
                    }
                };
            }
        });
    }
}
