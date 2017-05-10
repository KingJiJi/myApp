package laine.com.timepicker;

import android.content.Intent;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by：Cral-Gates on 2016/12/1 19:19
 * EMail：zhangxia2013105@gmail.com
 * Date: 2016/12/1
 * Description:
 */
public class DatePickerPlugin extends CordovaPlugin {

    private CallbackContext mCallbackContext;

    private final int requestCode = 1;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private String title;
    private String type;
    private String selectedDate;

    @Override

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.mCallbackContext = callbackContext;
        try {
            JSONObject js=new JSONObject(args.getString(0));
            selectedDate = js.getString("selectedDate");
            startDate=js.getString("startDate");
            endDate=js.getString("endDate");
            startTime=js.getString("startTime");
            endTime=js.getString("endTime");
            title=js.getString("title");
            type=js.getString("type");

        } catch (JSONException e) {
            e.printStackTrace();
        }

        Intent intent = new Intent(cordova.getActivity(),EntranceActivity.class);
        intent.putExtra("startDate", startDate);
        intent.putExtra("endDate", endDate);
        intent.putExtra("selectedDate", selectedDate);
        intent.putExtra("startTime", startTime);
        intent.putExtra("endTime", endTime);
        intent.putExtra("title", title);
        intent.putExtra("type", type);
        cordova.startActivityForResult(this,intent, requestCode);
        return true;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == requestCode){
            mCallbackContext.success(data.getStringExtra("backDate") + " " +data.getStringExtra("backTime"));
        }else {
            mCallbackContext.error("您传入的值为空!");
        }
    }

}
