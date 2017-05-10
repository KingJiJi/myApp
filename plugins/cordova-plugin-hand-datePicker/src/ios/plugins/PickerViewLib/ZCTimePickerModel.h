//
//  ZCTimePickerModel.h
//  zuche
//
//  Created by zhangyuqing on 2016/9/26.
//  Copyright © 2016年 zuche. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef NS_ENUM(NSUInteger, ENUMSelectTimeType) {
    ENUM_SelectTime_Type_PickUpCar = 1,       //1 取车
    ENUM_SelectTime_Type_ReturnCar,           //2 还车
    ENUM_SelectTime_Type_Other                //3 其他
};
@interface ZCTimePickerModel : NSObject
@property (strong,nonatomic) NSDate *minDate;
@property (strong,nonatomic) NSDate *maxDate;
@property (assign,nonatomic) NSString *startMoment;
@property (assign,nonatomic) NSString * endMoment;
@property (assign,nonatomic) ENUMSelectTimeType type;
@property (strong,nonatomic) NSString *fromTime; // 默认时间段的开始时间
@property (strong,nonatomic) NSString *toTime;   // 默认时间段的结束时间

/**
 获取到最小时间和最大时间的所有天的字符串

 @return 集合
 */
- (NSMutableArray *)getAllDaysOfMinDateAndMaxDate;

/**
 根据选择的日期生成相应的时间选项

 @param selectDate 选择的日期

 @return 集合
 */
- (NSMutableArray *)getAllTimesWithSelectDate:(NSString *)selectDate;


/**
 生成 24 小时的数组
 
 @return 集合
 */
-(NSMutableArray *)getAllMoments;

/**
 根据生成的时间选项,生成对应的时间

 @param selectDate 选择的日期
 @param selectTime 选择的时间

 @return 最终的日期
 */
- (NSDate *)getResultDateWithSelectDate:(NSString *)selectDate withSelectTime:(NSString *)selectTime;
@end
