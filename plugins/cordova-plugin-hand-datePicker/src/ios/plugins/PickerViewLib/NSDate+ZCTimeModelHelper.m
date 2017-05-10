//
//  NSDate+ZCTimeModelHelper.m
//  zuche
//
//  Created by zhangyuqing on 16/9/22.
//  Copyright © 2016年 zuche. All rights reserved.
//

#import "NSDate+ZCTimeModelHelper.h"

@implementation NSDate (ZCTimeModelHelper)
+ (NSDate *)dateFromString:(NSString *)string withFormat:(NSString *)format {
    NSDateFormatter *inputFormatter = [[NSDateFormatter alloc] init];
    [inputFormatter setDateFormat:format];
    NSDate *date = [inputFormatter dateFromString:string];
    return date;
}

- (NSString *)dateToStringWithFormat:(NSString *)dateFormat {
    NSDateFormatter *inputFormatter1 = [[NSDateFormatter alloc] init];
    [inputFormatter1 setDateFormat:dateFormat];
    NSString *dateStr1 = [inputFormatter1 stringFromDate:self];
    return dateStr1;
}

- (NSDate *)dateafterMonth:(int)month
{
    NSCalendar *calendar = [NSCalendar currentCalendar];
    NSDateComponents *componentsToAdd = [[NSDateComponents alloc] init];
    [componentsToAdd setMonth:month];
    NSDate *dateAfterMonth = [calendar dateByAddingComponents:componentsToAdd toDate:self options:0];
    
    return dateAfterMonth;
}
@end
