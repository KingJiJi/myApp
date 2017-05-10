package laine.com.timepicker;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import laine.com.timepicker.base.BaseFragmentActivity;
import laine.com.timepicker.base.BaseFragmentListener;
import laine.com.timepicker.fragment.DateSpinnerWheelFragment;
import laine.com.timepicker.fragment.DateWheelWidget;
import laine.com.timepicker.fragment.YearSpinnerWheelFragment;


public class EntranceActivity extends BaseFragmentActivity {

    public static final String ONE = "TYPE1";
    public static final String TWO = "TYPE2";
    public static final String THREE = "TYPE3";
    public static final int responseCode = 1;
    private TextView mEndTime;
    private TextView mEndDate;
    private Date start_date;
    private Date end_date;
    private String selectedDate = null;
    private String backDate = null;
    private String backTime = null;
    private String startDate = null;
    private String endDate = null;
    private String startTime = null;
    private String endTime = null;
    private String title = null;
    private String dateType = null;
    private Intent mIntent = null;
    private LinearLayout mLinearLayout;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(getResId("activity_main"));
        mLinearLayout = (LinearLayout) findViewById(getId("linear"));
        mLinearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        mIntent = getIntent();
        selectedDate = mIntent.getStringExtra("selectedDate") == null? new SimpleDateFormat("yyyy-MM-dd").format(new Date()):mIntent.getStringExtra("selectedDate");
        startDate = mIntent.getStringExtra("startDate") == null? new SimpleDateFormat("yyyy-MM-dd").format(new Date()):mIntent.getStringExtra("startDate");
        endDate = mIntent.getStringExtra("endDate") == null? new SimpleDateFormat("yyyy-MM-dd").format(new Date(System.currentTimeMillis()+ 3600*1000*24*20)): mIntent.getStringExtra("endDate");
        startTime = mIntent.getStringExtra("startTime") == null?"08:00":mIntent.getStringExtra("startTime");
        endTime = mIntent.getStringExtra("endTime") == null?"18:00":mIntent.getStringExtra("endTime");
        title = mIntent.getStringExtra("title") == null?"发车时间":mIntent.getStringExtra("title");
        dateType = mIntent.getStringExtra("type") == null? TWO :mIntent.getStringExtra("type");

        showDate(dateType);
    }

    public Map<String, DateWheelWidget> wheelMap = new HashMap<String, DateWheelWidget>();
    public Map<String, DateSpinnerWheelFragment> spinnerWheel = new HashMap<String, DateSpinnerWheelFragment>();
    public Map<String, YearSpinnerWheelFragment> yearSpinnerWheel = new HashMap<String, YearSpinnerWheelFragment>();
    private void showDate(final String type) {
        DateWheelWidget da = wheelMap.get(type);
        DateSpinnerWheelFragment dateSpinnerWheelFragment = spinnerWheel.get(type);
        YearSpinnerWheelFragment yearSpinnerWheelFragment = yearSpinnerWheel.get(type);
        if (null == da || null == dateSpinnerWheelFragment || null == yearSpinnerWheelFragment) {
            Bundle bundle = new Bundle();
            bundle.putString("tag", "date_spinner");
            da = (DateWheelWidget) Fragment.instantiate(this, DateWheelWidget.class.getName(), bundle);
            dateSpinnerWheelFragment = (DateSpinnerWheelFragment) Fragment.instantiate(this, DateSpinnerWheelFragment.class.getName(), bundle);
            yearSpinnerWheelFragment = (YearSpinnerWheelFragment) Fragment.instantiate(this, YearSpinnerWheelFragment.class.getName(), bundle);
            spinnerWheel.put(type,dateSpinnerWheelFragment);
            wheelMap.put(type, da);
            yearSpinnerWheel.put(type, yearSpinnerWheelFragment);
        }
        if (da.isAdded() || dateSpinnerWheelFragment.isAdded() || yearSpinnerWheelFragment.isAdded()) {
            closeFragment("date_spinner");
        }
        if (type.equals(ONE)){
            if (true) {
                da.setTitle(title);
                da.setDateRange(startDate, endDate, "08:00-18:00", DateWheelWidget.DATE_2);
                da.setCurrentDate(getTime().getTime());
            }
            da.addListener(new BaseFragmentListener() {
                @Override
                public void onCallBack(final Object object) {
                    handler.post(new Runnable() {
                        @SuppressLint("NewApi")
                        @Override
                        public void run() {
                            if (object instanceof Date) {
                                if (type.equals(ONE)) {

                                    start_date = (Date) object;
                                    SimpleDateFormat sdf_1 = new SimpleDateFormat("yyyy-MM-dd");
                                    SimpleDateFormat sdf = new SimpleDateFormat("aa");

                                    backDate = sdf_1.format(start_date);
                                    backTime = sdf.format(start_date);
                                    transValue(backDate, backTime);
                                    finish();
                                }
                            }
                        }
                    });
                }
            });
            showFragment("date_spinner", -1, da);
        } else if(type.equals(TWO)){
            dateSpinnerWheelFragment.setTitle(title);
            dateSpinnerWheelFragment.setDate(startDate, endDate, false);
            dateSpinnerWheelFragment.setCurrentSelDate(getTime().getTime());
            dateSpinnerWheelFragment.setTime(startTime, endTime);
            dateSpinnerWheelFragment.addListener(new BaseFragmentListener() {
                @Override
                public void onCallBack(final Object object) {
                    handler.post(new Runnable() {
                        @SuppressLint("NewApi")
                        @Override
                        public void run() {
                            if (object instanceof Date) {
                                if (type.equals(TWO)) {

                                    start_date = (Date) object;
                                    SimpleDateFormat sdf_1 = new SimpleDateFormat("yyyy-MM-dd");
                                    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");

                                    backDate = sdf_1.format(start_date);
                                    backTime = sdf.format(start_date);
                                    transValue(backDate, backTime);
                                    finish();
                                }
                            }
                        }
                    });
                }
            });
            showFragment("date_spinner", -1, dateSpinnerWheelFragment);
        } else if (type.equals(THREE)){
            dateSpinnerWheelFragment.setTitle(title);
            dateSpinnerWheelFragment.setDate(startDate, endDate, false);
            dateSpinnerWheelFragment.setTime("08:00", "18:00");
            dateSpinnerWheelFragment.setCurrentSelDate(getTime().getTime());
            dateSpinnerWheelFragment.setShowTime(false);
            dateSpinnerWheelFragment.addListener(new BaseFragmentListener() {
                @Override
                public void onCallBack(final Object object) {
                    handler.post(new Runnable() {
                        @SuppressLint("NewApi")
                        @Override
                        public void run() {
                            if (object instanceof Date) {
                                if (type.equals(THREE)) {

                                    start_date = (Date) object;
                                    SimpleDateFormat sdf_1 = new SimpleDateFormat("yyyy-MM-dd");
                                    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
                                    backDate = sdf_1.format(start_date);
                                    backTime = sdf.format(start_date);
                                    transValue(backDate, backTime);
                                    finish();
                                }
                            }
                        }
                    });
                }
            });
            showFragment("date_spinner", -1, dateSpinnerWheelFragment);
        }
    }

    @Override
    public void finish() {
        super.finish();
        this.overridePendingTransition(getAnimId("bottom_out"), 0);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    private int getResId(String resourceName){
        Resources resources = getResources();
        int resId = resources.getIdentifier(resourceName,"layout",getPackageName());
        return resId;
    }

    private int getStringId(String stringName){
        Resources resources = getResources();
        int resId =resources.getIdentifier(stringName,"string", getPackageName());
        return resId;
    }
    private int getId(String idName){
        Resources resources = getResources();
        int resId = resources.getIdentifier(idName, "id", getPackageName());
        return resId;
    }
    private int getAnimId(String idName){
        Resources resources = getResources();
        int resId = resources.getIdentifier(idName, "anim", getPackageName());
        return resId;
    }
    public void transValue(String backDate, String backTime){
        Intent intent = new Intent();
        intent.putExtra("backDate", backDate);
        intent.putExtra("backTime", backTime);
        setResult(responseCode, intent);
    }
    public Calendar getTime() {
        long t = System.currentTimeMillis();
        Calendar cal = Calendar.getInstance();
        try {
            cal.setTime(new Date(new SimpleDateFormat("yyyy-MM-dd").parse(selectedDate).getTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return cal;
    }

}
