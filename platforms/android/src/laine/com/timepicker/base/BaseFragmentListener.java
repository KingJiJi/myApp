package laine.com.timepicker.base;

import java.io.Serializable;

public interface BaseFragmentListener extends Serializable {

    public void onCallBack(Object object);

    public interface BaseFragmentListenerEx extends BaseFragmentListener {
        void onCancel();
    }

}
