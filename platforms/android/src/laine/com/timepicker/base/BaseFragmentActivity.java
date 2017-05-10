package laine.com.timepicker.base;

import android.content.Context;
import android.content.res.Resources;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import java.lang.ref.WeakReference;

import laine.com.timepicker.fragment.DataEmptyFragment;
import laine.com.timepicker.fragment.DateSpinnerWheelFragment;
import laine.com.timepicker.fragment.SimpleTextSpinnerWheelFragment;
import laine.com.timepicker.fragment.YearSpinnerWheelFragment;

/**
 * 基本Activity抽象类，继承FragmentActivity
 *
 * @author zj
 */
public abstract class BaseFragmentActivity extends FragmentActivity {

    /**
     * 页面统一使用的handler
     * <p>
     * {@link ZCHandler}
     */
    public ZCHandler handler = null;

    public Context context;



    public FragmentManager fragmentManager;

    private boolean isShow = true;

    private TelephonyManager tm;

    /**
     * 3.0.5 新增加 软键盘与edittext遮盖冲突问题，提高界面交互体验
     */



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        context = this;
        fragmentManager = getSupportFragmentManager();
        init();
    }

    @Override
    protected void onDestroy() {
        if (handler != null) {
            //handler.sendMessage(new Message());
            handler.removeCallbacksAndMessages(null);
            handler = null;
            // handler.getLooper().quit();
            // handler = null;
        }
        super.onDestroy();
    }

    private void init() {
        handler = new ZCHandler(this);

        // TODO add more soon
    }




    @Override
    public void onBackPressed() {
        // BaseOperate.closeRequest(this);
        super.onBackPressed();
    }



    public void showToast(final String msg) {
        if (!isFinishing() && handler != null) {
            handler.post(new Runnable() {

                @Override
                public void run() {
                    if (isFinishing() || !isShow) {
                        return;
                    }
                    Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_SHORT).show();
                }
            });
        }
    }




    /**
     * 拥有软引用更好释放context的handler
     *
     * @author zj
     */
    public static class ZCHandler extends Handler {

        private WeakReference<BaseFragmentActivity> activities = null;

        public ZCHandler(BaseFragmentActivity activity) {
            activities = new WeakReference<BaseFragmentActivity>(activity);
        }

        @Override
        public void handleMessage(Message msg) {
            BaseFragmentActivity activity = activities.get();
            if (activity == null) {
                return;
            }
            activity.dispatchMsgToSub(msg);
        }
    }

    protected void dispatchMsgToSub(Message message) {

    }



    public void showFragment(String tag, int layoutId, Fragment fragment) {
        if (this.isFinishing()) {
            return;
        }
        if (fragment == null || TextUtils.isEmpty(tag)) {
            return;
        }
        FragmentTransaction ft = fragmentManager.beginTransaction();
        ft.setCustomAnimations(getAnimId("bottom_in"), getAnimId("bottom_out"));
        Fragment prev = fragmentManager.findFragmentByTag(tag);
        if (prev != null) {
            ft.remove(prev);
        }
        int fragLayoutId = getId("base_extra_layout");
        ft.addToBackStack(null);
        ft.replace(layoutId <= 0 ? fragLayoutId: layoutId, fragment,
                tag).commitAllowingStateLoss();
    }

    public void displayFragment(boolean isOpen, String tag, Bundle bundle,
                                BaseFragmentListener listener) {
        if (isOpen) {
            showFragment(tag, bundle, listener);
        } else {
            closeFragment(tag);
        }
    }

    public void closeFragment(final String tag) {
        if (this.isFinishing()) {
            return;
        }
        FragmentTransaction ft = fragmentManager.beginTransaction();
        ft.setCustomAnimations(getAnimId("bottom_out"), getAnimId("bottom_in"));
        Fragment prev = fragmentManager.findFragmentByTag(tag);
        if (prev != null) {
            ft.remove(prev);
        }
        if (fragmentManager.getBackStackEntryCount() > 0) {
            try {
                fragmentManager.popBackStackImmediate();
            } catch (IllegalStateException e) {
                Log.e("jjw", e.toString());
            }

        }
        ft.commitAllowingStateLoss();
    }

    public void showFragment(final String tag, final Bundle bundle,
                             final BaseFragmentListener listener) {
        if (isFinishing() || handler == null) {
            return;
        }
        handler.post(new Runnable() {

            @Override
            public void run() {
                FragmentTransaction ft = fragmentManager.beginTransaction();
                ft.setCustomAnimations(getAnimId("bottom_in"), getAnimId("bottom_out"));
                Fragment prev = fragmentManager.findFragmentByTag(tag);
                if (prev != null) {
                    ft.remove(prev);
                }

                ft.addToBackStack(null);
                Fragment frag = createFragment(tag, bundle, listener);
                if (frag == null) {
                    return;
                }
                if (!frag.isAdded()) {
                    ft.replace(getId("base_extra_layout"), frag, tag)
                            .commitAllowingStateLoss();
                }


            }
        });
    }

    public Fragment createFragment(final String tag, Bundle bundle,
                                   BaseFragmentListener listener) {
        if (tag.equals("date_spinner")) {
            Bundle b = new Bundle();
            bundle.putString("tag", "date_spinner");
            DateSpinnerWheelFragment dswf = (DateSpinnerWheelFragment) Fragment.instantiate(context, DateSpinnerWheelFragment.class.getName(), b);
            if (listener != null) {
                dswf.addListener(listener);
            }
            return dswf;
        } else if (tag.equals("simple_time_spinner")) {
            SimpleTextSpinnerWheelFragment dswf = new SimpleTextSpinnerWheelFragment(
            );
            if (listener != null) {
                dswf.addListener(listener);
            }
            return dswf;
        }  else if (tag.equals("year_spinner")) {
            Bundle bundle1 = new Bundle();
            bundle1.putString("tag", tag);
            YearSpinnerWheelFragment dswf = (YearSpinnerWheelFragment) Fragment.instantiate(context, YearSpinnerWheelFragment.class.getName(), bundle1);
            if (listener != null) {
                dswf.addListener(listener);
            }
            return dswf;
        }  else if (tag.equals("no_data_fragment")) {
            bundle.putString("tag", tag);
            DataEmptyFragment dataEmptyFragment = (DataEmptyFragment) Fragment.instantiate(context, DataEmptyFragment.class.getName(), bundle);
            return dataEmptyFragment;
        }
        return null;
    }

    private int getId(String idName){
        Resources resources = getResources();
        int resId = resources.getIdentifier(idName, "id", context.getPackageName());
        return resId;
    }
    private int getAnimId(String drawableName){
        Resources resources = getResources();
        int resId =resources .getIdentifier(drawableName,"anim", getPackageName());
        return resId;
    }
    /**
     * 3.0.5版本 以下为新增
     */
    //获得设备号
    public String getDeviceNo() {
        String deviceNo = tm.getDeviceId();
        return deviceNo;
    }

    //获得手机型号
    public String getMobileType() {
        String mobileType = Build.MANUFACTURER + " " + Build.MODEL;
        return mobileType;
    }


}
