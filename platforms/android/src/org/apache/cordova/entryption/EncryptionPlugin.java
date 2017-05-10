package org.apache.cordova.entryption;
import android.text.TextUtils;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.entryption.DataEncryption;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by huangjie on 2016/10/8.
 */

public class EncryptionPlugin extends CordovaPlugin {

    private CallbackContext mCallbackContext;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.mCallbackContext = callbackContext;
        String data = args.getString(0);
        DataEncryption dataEncryption = new DataEncryption();
        if (TextUtils.isEmpty(data)) {
            if (mCallbackContext!=null){
                mCallbackContext.error("数据为空");
            }
            return false;
        }
        if (action.equals("encryptWithString")) {
            try {
                String entryData = dataEncryption.encryptData(data);
                if (mCallbackContext != null) {
                    mCallbackContext.success(entryData);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            return true;
        } else if (action.equals("decryptWithString")) {
            try {
                String decryData = dataEncryption.decryptData(data);
                if (mCallbackContext!=null){
                    mCallbackContext.success(decryData);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return true;
        }

        return false;
    }


}