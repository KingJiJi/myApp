package laine.com.timepicker.fragment;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import laine.com.timepicker.base.BaseFragmentActivity;
import laine.com.timepicker.base.BaseFragmentListener;
import laine.com.timepicker.third.spinnerwheel.AbstractWheel;
import laine.com.timepicker.third.spinnerwheel.AbstractWheelTextAdapter;
import laine.com.timepicker.third.spinnerwheel.OnWheelChangedListener;
import laine.com.timepicker.third.spinnerwheel.OnWheelScrollListener;

@SuppressLint("ValidFragment")
public class DateWheelWidget extends Fragment {

    public static final String DATE_1 = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_2 = "yyyy-MM-dd";
    public static final String DATE_3 = "HH:mm";
    public static final String DATE_4 = "MM月dd日 E";
    public static final String DATE_5 = "yyyy-MM-dd HH:mm";

    private Context context;

    private View view;

    private TextView titleTv;

    private String mTitle;

    private String tag = "";

    private BaseFragmentListener listener;

    private int delay_time = 30;

    public int time_step = 30;

    public int time_offset = 30;

    public boolean isShowTime = true;

    private DayArrayAdapter dayAdapter;
    private TimeArrayAdapter timeAdapter;
    private AbstractWheel day, time;

    private ArrayList<Long> timeArray;
    private ArrayList<Long> dayArray;

    private int dayIndex = 0;
    private int timeIndex = 0;

    private int dayRange = 10000;

//    private ZuCheApp app = ZuCheApp.getInstance();

    private String mHHmm = "00:00-24:00";

    public int offset_hour = 0;
    public int offset_min = 0;

    private long startTime = -1;
    private Calendar calendar;
    private Calendar today;

    public DateWheelWidget() {
        super();
        dayRange = 10000;
        initTimeArray();
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
    }


    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Bundle bundle = getArguments();
        if (bundle != null) {
            this.tag = bundle.getString("tag");
        }
    }

    private void initTimeArray() {
        timeArray = new ArrayList<Long>();
        dayArray = new ArrayList<Long>();
        setDateRange(dayRange);

    }

    public void setTitle(String title) {

        mTitle = title;

    }

    public void setCalendar(Calendar calendar) {
        this.calendar = calendar;

    }

    private Calendar getCalendar() {
        if (calendar != null) {
            return calendar;
        }
//        return (Calendar) app.getTime().clone();
        return getTime();

    }

    /**
     * 设置延时时间, 如现在2点,设置120,起始时间为4点
     *
     * @param delay 分钟
     */
    public void setDelayTime(int delay) {
        delay_time = delay;
    }

    public void addListener(BaseFragmentListener listener) {
        this.listener = listener;
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        context = activity;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        this.view = inflater.inflate(
                getResId("fragment_date_spinner_wheel_layout"), null);
        initView();
        return view;
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
    private int getColorId(String idName){
        Resources resources = getResources();
        int resId = resources.getIdentifier(idName, "color", context.getPackageName());
        return resId;
    }
    private void onCallBack(Date date) {
        if (listener != null) {
            listener.onCallBack(date);
        }
    }

    public void setCurrentDate(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        setCurrentDate(c);
    }

    public void setCurrentDate(Calendar cal) {
        int d = cal.get(Calendar.DAY_OF_YEAR);
        int dy = cal.get(Calendar.YEAR);

        int s = dayArray.size();
        int index = -1;
        for (int i = 0; i < s; i++) {
            Date de = new Date(dayArray.get(i));
            Calendar c = Calendar.getInstance();
            c.setTime(de);
            int cy = c.get(Calendar.YEAR);
            int cd = c.get(Calendar.DAY_OF_YEAR);

            if (d == cd && dy == cy) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            dayIndex = index;
        }

        int tindex = -1;
        int ts = timeArray.size();
        for (int i = 0; i < ts; i++) {
            Date de = new Date(timeArray.get(i));
            Calendar c = Calendar.getInstance();
            c.setTime(de);

            int h = c.get(Calendar.HOUR_OF_DAY);
            int m = c.get(Calendar.MINUTE);

            int ch = cal.get(Calendar.HOUR_OF_DAY);
            int cm = cal.get(Calendar.MINUTE);
            if (h == ch && m == cm) {
                tindex = i;
                break;
            }
        }
        if (tindex != -1) {
            timeIndex = tindex;
        }
    }

    private void setDateRange(int range) {
        setDateRange(getCalendar().getTime(), "00:00-24:00", range);
    }

    /**
     * @param start
     * @param HHmm_HHmm   表示区间 格式为:00:00-22:00,真是日了狗了
     * @param range       天数 从当前时间 +range =结束时间
     * @param timeFormate
     */
    public void setDateRange(String start, String HHmm_HHmm, int range,
                             String timeFormate) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(timeFormate);
            if (TextUtils.isEmpty(start)) {
                start = sdf.format(getCalendar().getTime());
            }

            Date s = sdf.parse(start);

            Calendar cal = getCalendar();
            cal.setTime(s);

            if (offset_hour > 0) {
                cal.add(Calendar.HOUR_OF_DAY, offset_hour);
            }
            if (offset_min > 0) {
                cal.add(Calendar.MINUTE, offset_min);
            }
            s = cal.getTime();
            Date c = getCalendar().getTime();
            if (!s.after(c)) {
                s = c;
            }
            setDateRange(s, HHmm_HHmm, range);
        } catch (ParseException e) {
            e.printStackTrace();
            setDateRange(dayRange);
        }
    }

    public void setDateRange(String start, String end, String HHmm_HHmm,
                             String timeFormate) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(timeFormate);
            if (TextUtils.isEmpty(start)) {
                start = sdf.format(getCalendar().getTime());
            }

            Date s = sdf.parse(start);
            Date e = sdf.parse(end);

            Calendar cal = getCalendar();
            cal.setTime(s);

            if (offset_hour > 0) {
                cal.add(Calendar.HOUR_OF_DAY, offset_hour);
            }
            if (offset_min > 0) {
                cal.add(Calendar.MINUTE, offset_min);
            }
            s = cal.getTime();
//            Date c = getCalendar().getTime();
//            if (!s.after(c)) {
//                s = c;
//            }
            Log.e("length", s.toString());
            Log.e("length2", sdf.format(s));
            setDateRange(s, e, HHmm_HHmm);
        } catch (ParseException e) {
            e.printStackTrace();
            setDateRange(dayRange);
        }
    }

    private void setDateRange(Date start, Date end, String HHmm_HHmm) {
//        Date cc = getCalendar().getTime();
//        if (!start.after(cc)) {
//            start = cc;
//        }
        Calendar c = Calendar.getInstance();
        c.setTime(start);
        Calendar ec = Calendar.getInstance();
        ec.setTime(end);

        int range = 0;

        long s = c.getTimeInMillis();
        long e = ec.getTimeInMillis();

        Log.e("length4", new SimpleDateFormat("yyyy-MM-dd").format(start));
        Log.e("length3", s+"");

        range = (int) ((e - s) / (1000 * 3600 * 24)) + 1;

        setDateRange(start, HHmm_HHmm, range);
    }

    private void setDateRange(Date start, String HHmm_HHmm, int range) {
        dayArray.clear();
        if (HHmm_HHmm.contains("24:00")) {
            HHmm_HHmm = HHmm_HHmm.replace("24:00", "23:59");
        }
        mHHmm = HHmm_HHmm;
        Calendar ca = Calendar.getInstance();
        ca.setTime(start);
//        if (!ca.after(getCalendar())) {
//            ca = getCalendar();
//            start = ca.getTime();
//        }
        if (!isValidTimeToday(ca)) {
            ca.add(Calendar.DAY_OF_YEAR, 1);
            start = ca.getTime();
        } else {
            startTime = ca.getTimeInMillis();
        }

        dayRange = range;
        for (int i = 0; i < range; i++) {
            Calendar c = Calendar.getInstance();
            c.setTime(start);
            c.add(Calendar.DAY_OF_YEAR, i);
            dayArray.add(c.getTimeInMillis());
        }
        initTimes(getCalendar(), 24);
    }

    private boolean isValidTimeToday(Calendar cal) {
        try {
            int i = mHHmm.indexOf("-");
            String ss = mHHmm.substring(0, i);
            String es = mHHmm.substring(i + 1, mHHmm.length());

            SimpleDateFormat sdf = new SimpleDateFormat(DATE_3);
            Date sd = sdf.parse(ss);
            Date ed = sdf.parse(es);
            Calendar sc = Calendar.getInstance();
            sc.setTime(sd);
            Calendar ec = Calendar.getInstance();
            ec.setTime(ed);

            int sh = 0;
            int sm = 0;

            int eh = 24;
            int em = 60;

            if (ec.getTimeInMillis() - sc.getTimeInMillis() >= 1000 * 3600 * 24) {
                sh = 0;
                sm = 0;

                eh = 23;
                em = 30;
            } else {
                sh = sc.get(Calendar.HOUR_OF_DAY);
                sm = sc.get(Calendar.MINUTE);
                eh = ec.get(Calendar.HOUR_OF_DAY);
                em = ec.get(Calendar.MINUTE);
            }

            int ch = cal.get(Calendar.HOUR_OF_DAY);
            int cm = cal.get(Calendar.MINUTE);

            // if (ch < sh || (ch == sh && cm < sm)) {
            // return false;
            // }
            if (ch > eh || (ch == eh && cm > em)) {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    public boolean isTimeRange(String HHmm_HHmm, Calendar cur) {
        try {
            if (HHmm_HHmm.contains("-")) {
                int i = HHmm_HHmm.indexOf("-");
                String ss = HHmm_HHmm.substring(0, i);
                String es = HHmm_HHmm.substring(i + 1, HHmm_HHmm.length());

                SimpleDateFormat sdf = new SimpleDateFormat(DATE_3);
                Date sd = sdf.parse(ss);
                Date ed = sdf.parse(es);
                Calendar sc = Calendar.getInstance();
                sc.setTime(sd);
                Calendar ec = Calendar.getInstance();
                ec.setTime(ed);

                if (ec.getTimeInMillis() - sc.getTimeInMillis() >= 1000 * 3600 * 24) {
                    return true;
                } else {
                    int eh = ec.get(Calendar.HOUR_OF_DAY);
                    int ch = cur.get(Calendar.HOUR_OF_DAY);
                    int em = ec.get(Calendar.MINUTE);
                    int cm = cur.get(Calendar.MINUTE);

                    if (ch > eh || (ch == eh && cm > em)) {
                        return false;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    public void setTimeRange(String HHmm_HHmm) {
        try {
            if (HHmm_HHmm.contains("-")) {
                mHHmm = HHmm_HHmm;
                int i = HHmm_HHmm.indexOf("-");
                String ss = HHmm_HHmm.substring(0, i);
                SimpleDateFormat sdf = new SimpleDateFormat(DATE_3);
                Date sd = sdf.parse(ss);
                Calendar sc = Calendar.getInstance();
                sc.setTime(sd);
                initTimes(sc, 24);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void initTimes(Calendar start, int range) {
        timeArray.clear();
        int h = start.get(Calendar.HOUR_OF_DAY);
        int m = start.get(Calendar.MINUTE);
        Calendar cal = getCalendar();
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);

        long ss = cal.getTimeInMillis();
        int index = 60 / time_step;
        int s = range * index + (24 == range ? 0 : 1);
//        for (int i = 0; i < s; i++) {
//            int j = i * time_step;
//            long ss_ = ss + j * 60 * 1000;
//            Log.e("jjw--initTimeArr",new SimpleDateFormat("aa").format(new Date(ss)));
//            timeArray.add(ss_);
//        }
        timeArray.add(1479956400000L);
        timeArray.add(1479963600000L);
        String localeString = cal.getTime().toLocaleString();

    }

    private boolean justTime(long mils, boolean today) {
        Calendar c = Calendar.getInstance();
        c.setTime(new Date(mils));
        if (today) {
            Calendar cal;
            if (startTime != -1) {
                cal = Calendar.getInstance();
                cal.setTime(new Date(startTime));
            } else {
                cal = getCalendar();
            }
            int cmm = cal.get(Calendar.MINUTE);
            int offset = 60 - cmm;
            // 加入半小时限制
            if (offset >= time_step) {
                int off = offset == 60 ? delay_time
                        : (time_step - cmm + delay_time);
                cal.add(Calendar.MINUTE, off);
            } else {
                cal.add(Calendar.MINUTE, offset + delay_time);
            }
            return isCurValidTime(cal, c);
        }
        return isValidTime(c);
    }

    private boolean isCurValidTime(Calendar cal, Calendar cur) {
        try {
            int i = mHHmm.indexOf("-");
            String ss = mHHmm.substring(0, i);
            String es = mHHmm.substring(i + 1, mHHmm.length());

            SimpleDateFormat sdf = new SimpleDateFormat(DATE_3);
            Date sd = sdf.parse(ss);
            Date ed = sdf.parse(es);
            Calendar sc = Calendar.getInstance();
            sc.setTime(sd);
            Calendar ec = Calendar.getInstance();
            ec.setTime(ed);

            int eh = 23;
            int em = 60;

            int sh = cal.get(Calendar.HOUR_OF_DAY);
            int sm = cal.get(Calendar.MINUTE);

            // if (ec.get(Calendar.DAY_OF_YEAR) - sc.get(Calendar.DAY_OF_YEAR)
            // >= 1) {
            if (ec.getTimeInMillis() - sc.getTimeInMillis() >= 1000 * 3600 * 24) {
                eh = 23;
                em = 60;
            } else {
                eh = ec.get(Calendar.HOUR_OF_DAY);
                em = ec.get(Calendar.MINUTE);
            }

            int ch = cur.get(Calendar.HOUR_OF_DAY);
            int cm = cur.get(Calendar.MINUTE);

            if (ch < sh || (ch == sh && cm < sm)) {
                return false;
            }
            if (ch > eh || (ch == eh && cm > em)) {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    private boolean isValidTime(Calendar cal) {
        try {
            int i = mHHmm.indexOf("-");
            String ss = mHHmm.substring(0, i);
            String es = mHHmm.substring(i + 1, mHHmm.length());

            SimpleDateFormat sdf = new SimpleDateFormat(DATE_3);
            Date sd = sdf.parse(ss);
            Date ed = sdf.parse(es);
            Calendar sc = Calendar.getInstance();
            sc.setTime(sd);
            Calendar ec = Calendar.getInstance();
            ec.setTime(ed);

            int sh = 0;
            int sm = 0;

            int eh = 24;
            int em = 60;

            // if (ec.get(Calendar.DAY_OF_YEAR) - sc.get(Calendar.DAY_OF_YEAR)
            // >= 1) {
            if (ec.getTimeInMillis() - sc.getTimeInMillis() >= 1000 * 3600 * 24) {
                sh = 0;
                sm = 0;

                eh = 23;
                em = 30;
            } else {
                sh = sc.get(Calendar.HOUR_OF_DAY);
                sm = sc.get(Calendar.MINUTE);
                eh = ec.get(Calendar.HOUR_OF_DAY);
                em = ec.get(Calendar.MINUTE);
            }

            int ch = cal.get(Calendar.HOUR_OF_DAY);
            int cm = cal.get(Calendar.MINUTE);

            if (ch < sh || (ch == sh && cm < sm)) {
                String localeString = cal.getTime().toLocaleString();
                return false;
            }
            if (ch > eh || (ch == eh && cm > em)) {
                String localeString = cal.getTime().toLocaleString();
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        String localeString = cal.getTime().toLocaleString();

        return true;
    }

    private Date parserDate(Date date, Date time) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        Calendar t = Calendar.getInstance();
        t.setTime(time);
        if (isShowTime) {
            c.set(Calendar.HOUR_OF_DAY, t.get(Calendar.HOUR_OF_DAY));
            c.set(Calendar.MINUTE, t.get(Calendar.MINUTE));
            c.set(Calendar.SECOND, t.get(Calendar.SECOND));
        }
        return c.getTime();
    }

    private void initView() {
        titleTv = (TextView) view.findViewById(getId("title_text"));
        titleTv.setText(mTitle);
        day = (AbstractWheel) view.findViewById(getId("date"));
        dayAdapter = new DayArrayAdapter(getActivity());
        dayAdapter.setTimes(dayArray);
        day.setViewAdapter(dayAdapter);
        day.setVisibleItems(5);
        if (!isShowTime) {
            view.findViewById(getId("time")).setVisibility(View.GONE);
        }

        time = (AbstractWheel) view.findViewById(getId("time"));
        if(null==getActivity()){
            return;
        }
        timeAdapter = new TimeArrayAdapter(getActivity());
        timeAdapter.setTimes(timeArray);
        time.setViewAdapter(timeAdapter);
        time.setVisibleItems(5);

        view.findViewById(getId("cancel")).setOnClickListener(
                new View.OnClickListener() {

                    @Override
                    public void onClick(View v) {
                        getActivity().finish();
                        if (getContext() instanceof BaseFragmentActivity) {
                            ((BaseFragmentActivity) getActivity()).displayFragment(
                                    false, tag, null, listener);
                        }
                    }
                });

        view.findViewById(getId("complete")).setOnClickListener(
                new View.OnClickListener() {

                    @Override
                    public void onClick(View v) {
                        // getActivity().finish();
                        Date date = dayAdapter.getItemTime(day.getCurrentItem());
                        Date time_ = timeAdapter.getItemTime(time
                                .getCurrentItem());
                        if (getContext() instanceof BaseFragmentActivity) {
                            ((BaseFragmentActivity) getContext()).displayFragment(
                                    false, tag, null, listener);
                        }
                        onCallBack(parserDate(date, time_));
                    }
                });
        view.findViewById(getId("mark_layout")).setOnClickListener(
                new View.OnClickListener() {

                    @Override
                    public void onClick(View v) {
                        getActivity().finish();
                        if (getContext() instanceof BaseFragmentActivity) {
                            ((BaseFragmentActivity) getContext()).displayFragment(
                                    false, tag, null, listener);
                        }
                    }
                });

        day.addChangingListener(new OnWheelChangedListener() {

            @Override
            public void onChanged(AbstractWheel wheel, int oldValue,
                                  int newValue) {
                if(null==getContext()){
                    return;
                }
                timeAdapter = new TimeArrayAdapter(getContext());
                timeAdapter.setTimes(timeArray);
                time.setViewAdapter(timeAdapter);
                time.setVisibleItems(5);
                initValidItem();
            }
        });
        time.addScrollingListener(new OnWheelScrollListener() {

            @Override
            public void onScrollingStarted(AbstractWheel wheel) {

            }

            @Override
            public void onScrollingFinished(AbstractWheel wheel) {
                initValidItem();
            }
        });
        day.setCurrentItem(dayIndex);
        time.setCurrentItem(timeIndex);
        if (timeIndex >= 0) {
            initValidItem();
        }
    }

    private void initValidItem() {
        Date time_ = timeAdapter.getItemTime(time.getCurrentItem());
        if (!invalidTime(time_.getTime())) {
            int vi = timeAdapter.getValidIndex();
            time.setCurrentItem(vi, true);
        }
    }

    public void setToday(Calendar today) {
        this.today = today;
    }

    private boolean checkToday(int index) {
        Date c = dayAdapter.getItemTime(index);
        Calendar c0 = Calendar.getInstance();
        c0.setTime(c);
        Calendar cc = getCalendar();

        int y = c0.get(Calendar.YEAR);
        int d = c0.get(Calendar.DAY_OF_YEAR);

        int cy = cc.get(Calendar.YEAR);
        int cd = cc.get(Calendar.DAY_OF_YEAR);
        return y == cy && d == cd;
    }

    private boolean invalidTime(long s) {
        int dayc = day.getCurrentItem();
        boolean today = false;
        if (dayc == 0 && checkToday(dayc)) {
            Calendar d = Calendar.getInstance();
            d.setTime(dayAdapter.getItemTime(dayc));
            int dd = d.get(Calendar.DAY_OF_YEAR);
            int dy = d.get(Calendar.YEAR);

            Calendar cur;
            if (startTime != -1) {
                cur = Calendar.getInstance();
                cur.setTime(new Date(startTime));
            } else {
                cur = getCalendar();
            }
            int sdd = cur.get(Calendar.DAY_OF_YEAR);
            int sdy = cur.get(Calendar.YEAR);
            today = (dy == sdy && dd == sdd);
        }

        return justTime(s, today);
    }

    /**
     * Day adapter
     */
    private class DayArrayAdapter extends AbstractWheelTextAdapter {

        private SimpleDateFormat sformat = new SimpleDateFormat("MM月dd日 E");
        private SimpleDateFormat sformat1 = new SimpleDateFormat("E");
        Calendar c = getTime();
        Date dates = c.getTime();
        private ArrayList<Long> timeList;

        protected DayArrayAdapter(Context context) {
            super(context, getResId("time_picker_custom_time"), getId("time_value"));
            timeList = new ArrayList<Long>();
        }

        public void setTimes(ArrayList<Long> timeList) {
            this.timeList = timeList;
        }

        @Override
        public View getItem(int index, View cachedView, ViewGroup parent) {
            View view = super.getItem(index, cachedView, parent);
            TextView date = (TextView) view.findViewById(getId("time_value"));
            if (isAdded()) {
                long s = timeList.get(index);
                Date d = new Date(s);
                if (sformat.format(dates).equals(sformat.format(d))) {

                    date.setText(getResources().getString(
                            getStringId("wheel_current_date"))
                            + sformat1.format(d));
                } else {

                    date.setText(sformat.format(d));

                }
            }
            return view;
        }

        @Override
        public int getItemsCount() {
            return timeList.size();
        }

        public Date getItemTime(int index) {
            long s = timeList.get(index);
            return new Date(s);
        }

        @Override
        protected CharSequence getItemText(int index) {
            return "";
        }
    }

    /**
     * time adapter
     */
    private class TimeArrayAdapter extends AbstractWheelTextAdapter {

        private ArrayList<Long> timeList;

        private SimpleDateFormat sformat = new SimpleDateFormat("aa");

        private int validIndex = 0;

        protected TimeArrayAdapter(Context context) {
            super(context, getResId("time_picker_custom_time"), getId("time_value"));
            timeList = new ArrayList<Long>();
        }

        public void setTimes(ArrayList<Long> timeList) {
            this.timeList = timeList;
            int s = timeList.size();
            for (int i = 0; i < s; i++) {
                long j = timeList.get(i);
                if (invalidTime(j)) {
                    validIndex = i;
                    break;
                }
            }
        }

        @Override
        public View getItem(int index, View cachedView, ViewGroup parent) {
            View view = super.getItem(index, cachedView, parent);
            TextView date = (TextView) view.findViewById(getId("time_value"));
            if (isAdded()) {
                long s = timeList.get(index);
                date.setTextColor(context.getResources()
                        .getColor(getColorId("black")));
                Date d = new Date(s);
                Log.e("jjw",sformat.format(d));
                date.setText(sformat.format(d));
            }
            return view;
        }

        @Override
        public int getItemsCount() {
            return timeList.size();
        }

        public Date getItemTime(int index) {
            long s = timeList.get(index);
            return new Date(s);
        }

        public int getValidIndex() {
            return validIndex;
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
