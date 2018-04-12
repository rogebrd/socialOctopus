package API;

import com.amazonaws.services.lambda.runtime.ClientContext;
import com.amazonaws.services.lambda.runtime.CognitoIdentity;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import org.junit.Before;
import org.junit.Test;

import java.util.LinkedHashMap;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertTrue;

public class Test_TwitterConnector {

    private static final String TOKEN = "TEST";
    private TwitterConnector tc;

    @Before
    public void setup(){
        tc = new TwitterConnector();
    }

    @Test
    public void test_twitter_valid(){
        Object body = setUpBody(TOKEN);

        //assertTrue("No Error", !tc.get(body, setUpContext()).contains("ERROR"));
    }

    @Test
    public void test_twitter_invalid(){
        Object body = setUpBody("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

       // assertTrue("Throws Error", tc.get(body, setUpContext()).contains("ERROR"));
    }

    private Object setUpBody(String token){
        LinkedHashMap<String, String> header = new LinkedHashMap<>();
        LinkedHashMap<String, Object> body = new LinkedHashMap<>();

        header.put("SOToken", token);
        body.put("headers", header);

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
