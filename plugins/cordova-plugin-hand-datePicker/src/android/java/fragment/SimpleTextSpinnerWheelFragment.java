package laine.com.timepicker.fragment;

import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import laine.com.timepicker.base.BaseFragmentActivity;
import laine.com.timepicker.base.BaseFragmentListener;
import laine.com.timepicker.third.spinnerwheel.AbstractWheel;
import laine.com.timepicker.third.spinnerwheel.AbstractWheelTextAdapter;


public class SimpleTextSpinnerWheelFragment extends Fragment {

	private Context context;

	private View view;

	private BaseFragmentListener listener;

	public SimpleTextSpinnerWheelFragment(){

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
	}


	public void addListener(BaseFragmentListener listener) {
		this.listener = listener;
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
	private void initView() {
		final AbstractWheel day = (AbstractWheel) view.findViewById(getId("date"));
		day.setVisibility(View.GONE);

		final AbstractWheel time = (AbstractWheel) view.findViewById(getId("time"));
		final TimeArrayAdapter timeAdapter = new TimeArrayAdapter(context);
		time.setViewAdapter(timeAdapter);
		time.setCurrentItem(0);

		view.findViewById(getId("cancel")).setOnClickListener(
				new View.OnClickListener() {

					@Override
					public void onClick(View v) {
						if (context instanceof BaseFragmentActivity) {
							((BaseFragmentActivity) context).displayFragment(
									false, "simple_time_spinner", null, listener);
						}
					}
				});

		view.findViewById(getId("complete")).setOnClickListener(
				new View.OnClickListener() {

					@Override
					public void onClick(View v) {
						if (context instanceof BaseFragmentActivity) {
							((BaseFragmentActivity) context).displayFragment(
									false, "simple_time_spinner", null, listener);
						}
						if (listener != null) {
							listener.onCallBack(timeAdapter.getItemText(
									time.getCurrentItem()).toString());
						}
					}
				});
		view.findViewById(getId("mark_layout")).setOnClickListener(
				new View.OnClickListener() {

					@Override
					public void onClick(View v) {
						if (context instanceof BaseFragmentActivity) {
							((BaseFragmentActivity) context).displayFragment(
									false, "simple_time_spinner", null, listener);
						}
					}
				});
	}

	/**
	 * text adapter
	 * 
	 */
	private class TimeArrayAdapter extends AbstractWheelTextAdapter {

		private final int daysCount = 8;

		String[] times;
		/**
		 * Constructor
		 */
		protected TimeArrayAdapter(Context context) {
			super(context, getResId("time_picker_custom_time"), getId("NO_RESOURCE"));
			times = new String[] { "1", "2", "3", "4", "5", "6", "7", "8" };
			setItemTextResource(getId("time_value"));
		}

		public int checkIndex(int index) {
			if (index <= 0) {
				return 0;
			} else if (index >= times.length) {
				return times.length - 1;
			}
			return index;
		}

		@Override
		public View getItem(int index, View cachedView, ViewGroup parent) {
			String time = times[checkIndex(index)];
			View view = super.getItem(index, cachedView, parent);
			TextView t = (TextView) view.findViewById(getId("time_value"));
			t.setText(time + "小时");
			view.setTag(time);
			return view;
		}

		@Override
		public int getItemsCount() {
			return daysCount;
		}

		@Override
		protected CharSequence getItemText(int index) {
			index = checkIndex(index);
			return times[index] + "小时";
		}
	}

}
