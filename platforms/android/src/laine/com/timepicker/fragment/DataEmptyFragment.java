package laine.com.timepicker.fragment;


import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import laine.com.timepicker.base.BaseFragmentActivity;


@SuppressLint("ValidFragment")
public class DataEmptyFragment extends Fragment {
    private View view;
    private TextView warn_message1, warn_message2;
    private Context context;
    private String tag = "";
    private String dataType = "";

    public DataEmptyFragment() {
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
        Bundle bundle = new Bundle();
        if (bundle != null) {
            dataType = bundle.getString("data_type");
            this.tag = bundle.getString("tag");
        }
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(getResId("no_data_layout"),
                null);
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
    public void initView() {
        warn_message1 = (TextView) view.findViewById(getId("warn_message_1"));
        warn_message2 = (TextView) view.findViewById(getId("warn_message_2"));
        if (!TextUtils.isEmpty(dataType)) {
            if (dataType.equals("all_type")) {
                warn_message1.setText(context.getString(getStringId("no_car_mes")));
                warn_message2.setText(context.getString(getStringId("no_car_mes_1")));
            } else if (dataType.equals("filter_type")) {
                warn_message1.setText(context.getString(getStringId("no_filter_car_mes")));
                warn_message2.setText(context.getString(getStringId("no_filter_car_mes_1")));
            }
        }
        view.findViewById(getId("mark_layout")).setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        if (context instanceof BaseFragmentActivity) {
                            ((BaseFragmentActivity) context).displayFragment(
                                    false, tag, null, null);
                        }
                    }
                });
    }
}
