package laine.com.timepicker.fragment;

import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.SparseArray;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import laine.com.timepicker.base.BaseFragmentActivity;
import laine.com.timepicker.base.BaseFragmentListener;
import laine.com.timepicker.third.spinnerwheel.AbstractWheel;
import laine.com.timepicker.third.spinnerwheel.AbstractWheelTextAdapter;

public class YearSpinnerWheelFragment extends Fragment {

    private Context context;

    private View view;

    private BaseFragmentListener listener;

    private TextView titleTv;

    private String mTitle;

    private int date_length = 10;

    private int month_length = 12;

    public String tag = "";

    private Calendar startC;

    private boolean isShowTime = true;

    public YearSpinnerWheelFragment() {

    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        context = activity;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Bundle bundle = getArguments();
        if (bundle != null) {
            tag = bundle.getString("tag");
        }
    }


    public void addListener(BaseFragmentListener listener) {
        this.listener = listener;
    }

    public void setDateLength(int length) {
        this.date_length = length;
    }

    public void setShowTime(boolean isShowTime) {
        this.isShowTime = isShowTime;
    }

    public void setDate(String start, int dateLength, boolean time) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(
                    time ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd");
            Date s = sdf.parse(start);
            startC = Calendar.getInstance();
            startC.setTime(s);
            this.date_length = dateLength;
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public void setDate(String start, String end, boolean time) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(
                    time ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd");
            Date s = sdf.parse(start);
            Date e = sdf.parse(end);
            Date c = new Date();
            startC = Calendar.getInstance();
            startC.setTime(s.after(c) ? s : c);
            Calendar ec = Calendar.getInstance();
            ec.setTime(e);
            int sd = startC.get(Calendar.DAY_OF_YEAR);
            int ed = ec.get(Calendar.DAY_OF_YEAR);
            this.date_length = Math.abs(ed - sd) + 1;
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
    public void setTitle(String title) {
        mTitle = title;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(getResId("fragment_date_spinner_wheel_layout"),
                null);
        initView();
        return view;
    }
    private int getResId(String resourceName){
        Resources resources = getResources();
        int resId = resources.getIdentifier(resourceName,"layout",context.getPackageName());
        return resId;
    }
    private int getId(String idName){
        Resources resources = getResources();
        int resId = resources.getIdentifier(idName, "id", context.getPackageName());
        return resId;
    }
    private void onCallBack(Date date) {
        if (listener != null) {
            listener.onCallBack(date);
        }
    }

    private void initView() {
        titleTv = (TextView) view.findViewById(getId("title_text"));
        titleTv.setText(mTitle);
        final AbstractWheel day = (AbstractWheel) view.findViewById(getId("date"));
        final DayArrayAdapter dayAdapter = new DayArrayAdapter(context);
        day.setViewAdapter(dayAdapter);
        day.setCurrentItem(0);
        day.setVisibleItems(5);
        if (!isShowTime) {
            view.findViewById(getId("time")).setVisibility(View.GONE);
        }
        final AbstractWheel time = (AbstractWheel) view.findViewById(getId("time"));
        final TimeArrayAdapter timeAdapter = new TimeArrayAdapter(context);
        time.setViewAdapter(timeAdapter);
        time.setCurrentItem(40);
        time.setVisibleItems(5);
        time.setCyclic(true);

        view.findViewById(getId("cancel")).setOnClickListener(
                new View.OnClickListener() {

                    @Override
                    public void onClick(View v) {
                        if (context instanceof BaseFragmentActivity) {
                            ((BaseFragmentActivity) context).displayFragment(
                                    false, "single_spinner", null, listener);
                        }
                    }
                });

        view.findViewById(getId("complete")).setOnClickListener(
                new View.OnClickListener() {

                    @Override
                    public void onClick(View v) {
                        if (context instanceof BaseFragmentActivity) {
                            ((BaseFragmentActivity) context).displayFragment(
                                    false, tag, null, listener);
                        }
                        Date year = dayAdapter.getItemTime(day.getCurrentItem());
                        Date month = timeAdapter.getItemTime(time.getCurrentItem());
                        onCallBack(parserDate(year, month));
                    }
                });
        view.findViewById(getId("mark_layout")).setOnClickListener(
                new View.OnClickListener() {

                    @Override
                    public void onClick(View v) {
                        if (context instanceof BaseFragmentActivity) {
                            ((BaseFragmentActivity) context).displayFragment(
                                    false, tag, null, listener);
                        }
                    }
                });
    }

    private Date parserDate(Date year, Date month) {
        Calendar y = Calendar.getInstance(Locale.getDefault());
        Calendar m = Calendar.getInstance(Locale.getDefault());
        Calendar c = Calendar.getInstance(Locale.getDefault());
        y.setTime(year);
        m.setTime(month);
        c.set(y.get(Calendar.YEAR), m.get(Calendar.MONTH), 1);
        return c.getTime();
    }

    /**
     * Day adapter
     */
    private class DayArrayAdapter extends AbstractWheelTextAdapter {
        private Calendar calendar;

        private SparseArray<Date> timeMap;

        private SimpleDateFormat sformat = new SimpleDateFormat("yyyy年");

        protected DayArrayAdapter(Context context) {
            super(context, getResId("time_picker_custom_time"), getId("time_value"));
            this.calendar = startC == null ? Calendar.getInstance() : startC;
            timeMap = new SparseArray<Date>(date_length);
        }

        @Override
        public View getItem(int index, View cachedView, ViewGroup parent) {
            View view = super.getItem(index, cachedView, parent);
            TextView date = (TextView) view.findViewById(getId("time_value"));

            Date d = null;
            int i = timeMap.indexOfKey(index);
            if (i >= 0) {
                d = timeMap.get(index);
            } else {
                Calendar calendar_ = (Calendar) calendar.clone();
                calendar_.add(Calendar.YEAR, index);
                d = calendar_.getTime();
                timeMap.put(index, d);
            }
            date.setText(sformat.format(d));
            return view;
        }

        @Override
        public int getItemsCount() {
            return date_length;
        }

        public Date getItemTime(int index) {
            if (timeMap.indexOfKey(index) >= 0) {
                return timeMap.get(index);
            }
            return new Date();
        }

        @Override
        protected CharSequence getItemText(int index) {
            return "";
        }
    }

    /**
     * Day adapter
     */
    private class TimeArrayAdapter extends AbstractWheelTextAdapter {

        private Calendar calendar;

        private SparseArray<Date> timeMap;

        private SimpleDateFormat sformat = new SimpleDateFormat("MM月");

        protected TimeArrayAdapter(Context context) {
            super(context, getResId("time_picker_custom_time"), getId("time_value"));
            this.calendar = startC == null ? Calendar.getInstance() : startC;
            timeMap = new SparseArray<Date>(month_length);
        }

        @Override
        public View getItem(int index, View cachedView, ViewGroup parent) {

            View view = super.getItem(index, cachedView, parent);
            TextView date = (TextView) view.findViewById(getId("time_value"));

            Date d = null;
            int i = timeMap.indexOfKey(index);
            if (i >= 0) {
                d = timeMap.get(index);
            } else {
                Calendar calendar_ = (Calendar) calendar.clone();
                calendar_.add(Calendar.MONTH, index);
                d = calendar_.getTime();
                timeMap.put(index, d);
            }
            date.setText(sformat.format(d));
            return view;
        }

        public Date getItemTime(int index) {
            if (timeMap.indexOfKey(index) >= 0) {
                return timeMap.get(index);
            }
            return new Date();
        }

        @Override
        public int getItemsCount() {
            return month_length;
        }

        @Override
        protected CharSequence getItemText(int index) {
//			Date d = timeMap.get(index);
            return "";
        }
    }

}
