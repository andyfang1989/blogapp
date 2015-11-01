package controllers.util;

import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;

/**
 * Created by kfang on 10/28/15.
 */
public class commonUtils {
    public static ObjectNode buildJsonResponse(String type, String message) {
        ObjectNode wrapper = Json.newObject();
        ObjectNode msg = Json.newObject();
        msg.put("message", message);
        wrapper.put(type, msg);
        return wrapper;
    }
}
