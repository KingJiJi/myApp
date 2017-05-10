package laine.com.timepicker.model;

import java.io.Serializable;

/**
 * 所有数据类的基类
 * 
 * @author zj
 * 
 */
public abstract class ZCEntry implements Serializable {

	private static final long serialVersionUID = -2253892370881608111L;

	//spinner显示的内容
	public String spinner_txt = "";
	
	public String extra_flag = "";
	
}
