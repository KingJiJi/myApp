//
//  NSDate+ZCTimeModelHelper.h
//  zuche
//
//  Created by zhangyuqing on 16/9/22.
//  Copyright © 2016年 zuche. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSDate (ZCTimeModelHelper)

/**
 根据一定的格式生成对应的Date对象

 @param string 时间的字符串
 @param format 时间格式的字符串

 @return 时间的对象
 */
+ (NSDate *)dateFromString:(NSString *)string withFormat:(NSString *)format;


/**
 根据时间格式生成字符串

 @param dateFormat 时间的格式

 @return 时间的字符串
 */
- (NSString *)dateToStringWithFormat:(NSString *)dateFormat;

/**
 加上几个月后的时间

 @param month 月份

 @return date对象
 */
- (NSDate *)dateafterMonth:(int)month;
@end
