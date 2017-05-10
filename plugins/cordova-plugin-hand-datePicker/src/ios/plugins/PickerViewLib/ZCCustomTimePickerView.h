//
//  ZCCustomTimePickerView.h
//  zuche
//
//  Created by Leo on 15/10/5.
//  Copyright © 2015年 zuche. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void (^ARPickerTimeDicDictBlock) (NSString *selectDate);

@interface ZCCustomTimePickerView : UIView
@property(nonatomic, copy) ARPickerTimeDicDictBlock timePickerBlock;
@property (nonatomic, strong) NSDate *minDate;//最小日期
@property (nonatomic, strong) NSDate *maxDate;//最大日期
@property (nonatomic, strong) NSString *startMoment;
@property (nonatomic, strong) NSString *endMoment;
@property (nonatomic, strong) NSDate *defaultDate; // 默认的初识选择时间
@property (nonatomic, strong) NSString *defaultTime;// 默认的上下午
@property (nonatomic, strong) NSString *defaultMoment; //默认的小时分钟
@property (nonatomic, strong) NSString *title;
@property (nonatomic, strong) NSString *mode;

- (void)setTimePickerContentView;
- (void)createUI;
@end
