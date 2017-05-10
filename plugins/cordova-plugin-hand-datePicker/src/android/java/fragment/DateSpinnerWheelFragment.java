package laine.com.timepicker.fragment;

import android.annotation.SuppressLint;
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
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import laine.com.timepicker.base.BaseFragmentActivity;
import laine.com.timepicker.base.BaseFragmentListener;
import laine.com.timepicker.model.ZCEntry;
import laine.com.timepicker.third.spinnerwheel.AbstractWheel;
import laine.com.timepicker.third.spinnerwheel.AbstractWheelTextAdapter;
import laine.com.timepicker.third.spinnerwheel.OnWheelChangedListener;

@SuppressLint("ValidFragment")
public class DateSpinnerWheelFragment extends Fragment {

    private Context context;

    private View view;

    private BaseFragmentListener listener;
    private ArrayList<? extends ZCEntry> list;


    private TextView titleTv;

    private String mTitle;

    private int offset_index = 0;

    private int step_min = 15;

    private int date_length = 30;

    private int time_length = 96;

    public String tag = "";

    private Calendar startC, startCTime;

    private boolean isShowTime = true;

    private AbstractWheel day, time;

//    private ZuCheApp app = ZuCheApp.getInstance();

    private TimeArrayAdapter timeAdapter;


    private int dayIndex = -1;
    private int timeIndex = -1;

    public DateSpinnerWheelFragment() {
        super();
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
            this.tag = bundle.getString("tag");
        }
    }

    public void addListener(BaseFragmentListener listener) {
        this.listener = listener;
    }

    public void setOffsetHour(int offset_index) {
        this.offset_index = offset_index;
    }

    public void setStepMin(int step_min) {
        this.step_min = step_min;
    }

    public void setDateLength(int length) {
        this.date_length = length;
    }

    public void setTimeLength(int length) {
        this.time_length = length;
    }

    public void setShowTime(boolean isShowTime) {
        this.isShowTime = isShowTime;
    }

    public void setData(Calendar start) {
        startC = start;
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
            startC.setTime(s);
//            startC.setTime(s.after(c) ? s : c);
            Calendar ec = Calendar.getInstance();
            ec.setTime(e);

            int sd = startC.get(Calendar.DAY_OF_YEAR);
            int ed = ec.get(Calendar.DAY_OF_YEAR);
//            this.date_length = Math.abs(ed - sd) + 1;
            float number = (ec.getTimeInMillis() - startC.getTimeInMillis())/(1000*3600*24);
            this.date_length = (int) Math.abs(number) + 1;
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public void setTime(String start, String end) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
            Date s = sdf.parse(start);
            Date e = sdf.parse(end);
            startCTime = Calendar.getInstance();
            startCTime.setTime(s);
            Calendar cal = Calendar.getInstance();
            cal.setTime(e);

            int sh = startCTime.get(Calendar.HOUR_OF_DAY);
            int eh = cal.get(Calendar.HOUR_OF_DAY);
            if (sh != eh) {
                int l = Math.abs(eh - sh);
                int c = 30 / step_min;
                this.time_length = c * l + 1;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setDate(Calendar start, Calendar end) {
        try {
            Date s = start.getTime();
            Date e = end.getTime();
            Date c = new Date();
            startC = startCTime = start;
            startC.setTime(s.after(c) ? s : c);
            Calendar ec = Calendar.getInstance();
            ec.setTime(e);
            int sd = startC.get(Calendar.DAY_OF_YEAR);
            int ed = ec.get(Calendar.DAY_OF_YEAR);
            this.date_length = Math.abs(ed - sd) + 1;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setData(ArrayList<? extends ZCEntry> list) {
        this.list = list;
    }

    public void setCurrentSelDate(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        setCurrentSelDate(c);
    }

    public void setCurrentSelDate(Calendar cal) {
        setCurrentDay(cal);
        setCurrentTime(cal);
    }

    private void setCurrentDay(Calendar cal) {
        Calendar calendar = startC == null ? getTime() : startC;
        int index = -1;
        for (int j = 0; j < date_length; j++) {
            Calendar calendar_ = (Calendar) calendar.clone();
            calendar_.add(Calendar.DAY_OF_YEAR, j);
            int d = calendar_.get(Calendar.DAY_OF_YEAR);
            int c = cal.get(Calendar.DAY_OF_YEAR);
            if (d == c) {
                index = j;
                break;
            }
        }
        dayIndex = index;
    }

    private void setCurrentTime(Calendar cal) {
        Calendar calendar = startCTime == null ? getTime() : startCTime;
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);

        int index = -1;
        for (int j = 0; j < time_length; j++) {
            Calendar calendar_ = (Calendar) calendar.clone();
            calendar_.add(Calendar.MINUTE, j * step_min);
            int m = calendar_.get(Calendar.MINUTE);
            int h = calendar_.get(Calendar.HOUR_OF_DAY);

            int cm = cal.get(Calendar.MINUTE);
            int ch = cal.get(Calendar.HOUR_OF_DAY);

            if (m == cm && h == ch) {
                index = j;
                break;
            }
        }
        timeIndex = index;
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

    private void onCallBack(Date date) {
        if (listener != null) {
            listener.onCallBack(date);
        }
    }
    private int getResId(String resourceName){
        Resources resources = getResources();
        int resId = resources.getIdentifier(resourceName,"layout",context.getPackageName());
        return resId;
    }
    private int getStringId(String stringName){
        Resources resources = getResources();
        int resId =resources.getIdentifier(stringName,"string", context.getPackageName());
        return resId;
    }
    private int getId(String idName){
        Resources resources = getResources();
        int resId = resources.getIdentifier(idName, "id", context.getPackageName());
        return resId;
    }
    private void initView() {
        titleTv = (TextView) view.findViewById(getId("title_text"));
        titleTv.setText(mTitle);
        day = (AbstractWheel) view.findViewById(getId("date"));
        final DayArrayAdapter dayAdapter = new DayArrayAdapter(context);
        day.setViewAdapter(dayAdapter);
        day.setVisibleItems(5);
        if (!isShowTime) {
            view.findViewById(getId("time")).setVisibility(View.GONE);
        }

        time = (AbstractWheel) view.findViewById(getId("time"));
        timeAdapter = new TimeArrayAdapter(context);
        time.setViewAdapter(timeAdapter);
        time.setVisibleItems(5);
        time.setCyclic(false);

        view.findViewById(getId("cancel")).setOnClickListener(
                new View.OnClickListener() {

                    @Override
                    public void onClick(View v) {
                        getActivity().finish();
                        if (context instanceof BaseFragmentActivity) {
                            ((BaseFragmentActivity) context).displayFragment(
                                    false, tag, null, listener);
                        }
                    }
                });

        view.findViewById(getId("complete")).setOnClickListener(
                new View.OnClickListener() {

                    @Override
                    public void onClick(View v) {
                        // getActivity().finish();
                        if (context instanceof BaseFragmentActivity) {
                            ((BaseFragmentActivity) context).displayFragment(
                                    false, tag, null, listener);
                        }
                        Date date = dayAdapter.getItemTime(day.getCurrentItem());
                        Date time_ = timeAdapter.getItemTime(time
                                .getCurrentItem());
                        onCallBack(parserDate(date, time_));
                    }
                });
        view.findViewById(getId("mark_layout")).setOnClickListener(
                new View.OnClickListener() {

                    @Override
                    public void onClick(View v) {
                        getActivity().finish();
                        if (context instanceof BaseFragmentActivity) {
                            ((BaseFragmentActivity) context).displayFragment(
                                    false, tag, null, listener);
                        }
                    }
                });

        day.addChangingListener(new OnWheelChangedListener() {

            @Override
            public void onChanged(AbstractWheel wheel, int oldValue,
                                  int newValue) {
                // Date date = dayAdapter.getItemTime(newValue);
                // refreshTimeAdapter(date);
            }
        });
        initDefaultTime();
    }

    private void refreshTimeAdapter(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);

        int d = cal.get(Calendar.DAY_OF_YEAR);
        int sd = this.getTime().get(Calendar.DAY_OF_YEAR);
        if (d == sd) {
            int st = this.getTime().get(Calendar.MINUTE);
            int i = 0;
            int s = 60 / step_min;
            for (; i < s; i++) {
                int t = i + step_min;
                if (st <= t) {
                    break;
                }
            }

            timeAdapter = new TimeArrayAdapter(context);
        }
    }

    private void initDefaultTime() {
        if (dayIndex != -1) {
            day.setCurrentItem(dayIndex);
        }
        if (timeIndex != -1 && isShowTime) {
            time.setCurrentItem(timeIndex);
        }
    }

    private Date parserDate(Date date, Date time) {
        Calendar c = Calendar.getInstance(Locale.getDefault());
        c.setTime(date);
        Calendar t = Calendar.getInstance(Locale.getDefault());
        t.setTime(time);
        if (isShowTime) {
            c.set(Calendar.HOUR_OF_DAY, t.get(Calendar.HOUR_OF_DAY));
            c.set(Calendar.MINUTE, t.get(Calendar.MINUTE));
            c.set(Calendar.SECOND, t.get(Calendar.SECOND));
        }
        return c.getTime();
    }

    /**
     * Day adapter
     */
    private class DayArrayAdapter extends AbstractWheelTextAdapter {
        private Calendar calendar;

        private SparseArray<Date> timeMap;

        private SimpleDateFormat sformat = new SimpleDateFormat("MM月dd日 E");
        private SimpleDateFormat sformat1 = new SimpleDateFormat("E");

        Calendar c = getTime();
        Date dates = c.getTime();
        protected DayArrayAdapter(Context context) {
            super(context, getResId("time_picker_custom_time"), getId("time_value"));
            this.calendar = startC == null ? getTime() : startC;
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
                calendar_.add(Calendar.DAY_OF_YEAR, index);
                d = calendar_.getTime();
                timeMap.put(index, d);
            }
            if (sformat.format(dates).equals(sformat.format(d))){
                date.setText(getResources().getString(
                        getStringId("wheel_current_date"))
                        + sformat1.format(d));
            } else {
                date.setText(sformat.format(d));
            }
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
        private SparseArray<Date> timeMapA;

        private SimpleDateFormat sformat = new SimpleDateFormat("HH:mm");

        protected TimeArrayAdapter(Context context) {
            super(context, getResId("time_picker_custom_time"), getId("time_value"));
            this.calendar = startCTime == null ? getTime() : startCTime;
            timeMapA = new SparseArray<Date>(date_length);
            if (startCTime == null) {
                this.calendar.set(Calendar.HOUR_OF_DAY, 0);
                this.calendar.set(Calendar.MINUTE, 0);
                this.calendar.set(Calendar.SECOND, 0);
            }
        }

        @Override
        public View getItem(int index, View cachedView, ViewGroup parent) {
            View view = super.getItem(index, cachedView, parent);
            TextView date = (TextView) view.findViewById(getId("time_value"));

            Date d = null;
            int i = timeMapA.indexOfKey(index);
            if (i >= 0) {
                d = timeMapA.get(index);
            } else {
                Calendar calendar_ = (Calendar) calendar.clone();
                calendar_.add(Calendar.MINUTE, index * step_min*2);
                d = calendar_.getTime();
                timeMapA.put(index, d);
            }
            date.setText(sformat.format(d));
            return view;
        }

        @Override
        public int getItemsCount() {
            return time_length;
        }

        public Date getItemTime(int index) {
            if (timeMapA.indexOfKey(index) >= 0) {
                return timeMapA.get(index);
            }
            return new Date();
        }

        @Override
        protected CharSequence getItemText(int index) {
            return "";
        }
    }

    public Calendar getTime() {
        long t = System.currentTimeMillis() ;
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date(t));
        return cal;
    }

}
