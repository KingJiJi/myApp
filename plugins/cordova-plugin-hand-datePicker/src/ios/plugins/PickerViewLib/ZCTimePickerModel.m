//
//  ZCTimePickerModel.m
//  zuche
//
//  Created by zhangyuqing on 2016/9/26.
//  Copyright © 2016年 zuche. All rights reserved.
//

#import "ZCTimePickerModel.h"
#import "NSObject+ZCUtility.h"
#import "NSDate+ZCTimeModelHelper.h"
#import "NSDate+Utilities.h"
#import "ZCTimePickerDateModel.h"

#define kZCTimeFormatyyyyMMHH @"MM月dd日 星期"

@interface ZCTimePickerModel()

@end

@implementation ZCTimePickerModel
- (NSMutableArray *)getAllDaysOfMinDateAndMaxDate
{
    if (!self.maxDate || !self.minDate) {
        return nil;
    }
    NSMutableArray *arrayM = [NSMutableArray arrayWithCapacity:100];

    NSDate *tempDate = self.minDate;
    while(true) {
        if (![tempDate isLaterThanDate:self.maxDate]) {
            NSString *dateString = [tempDate dateToStringWithFormat:kZCTimeFormatyyyyMMHH];
            if (![NSObject isEmptyObj:dateString]) {
                NSString *date = [NSString stringWithFormat:@"%@%@",dateString,[self getDateStringWithWeekDay:tempDate.weekday]];
                
                if ([tempDate isEqualToDateIgnoringTime:[NSDate date]]) {
                    date = @"今天";
                }
                ZCTimePickerDateModel *model = [[ZCTimePickerDateModel alloc]init];
                model.name = date;
                model.dateString = [tempDate dateToStringWithFormat:@"yyyy-MM-dd"];
                [arrayM addObject:model];
            }
            tempDate = [tempDate dateByAddingDays:1];

        } else {
            break;
        }

    }
    
    return arrayM;
    
}

- (NSString *)getDateStringWithWeekDay:(NSInteger)weekDay
{
    NSString *str = nil;
    switch (weekDay) {
        case 1:
            str = @"日";
            break;
        case 2:
            str = @"一";
            break;
        case 3:
            str = @"二";
            break;
        case 4:
            str = @"三";
            break;
        case 5:
            str = @"四";
            break;
        case 6:
            str = @"五";
            break;
        case 7:
            str = @"六";
            break;
        default:
            str = @"";
            break;
    }
    return str;
}

-(NSMutableArray *)getAllMoments {
    NSMutableArray *arrayMom = [NSMutableArray array];
    if (!self.startMoment || !self.endMoment) {
        return nil;
    }
    NSString *temp = [NSString string];
    int start;
    int end;
    
    NSRange range = [self.startMoment rangeOfString:@":"];
    
    temp = [self.startMoment substringToIndex: range.location];
    start = [temp intValue];
    
    range = [self.endMoment rangeOfString:@":"];
    temp = [self.endMoment substringToIndex: range.location];
    end = [temp intValue];

    
    if (start < 0) {
        start = 0;
    }
    
    if (end > 23) {
        end = 23;
    }
    
    if ([self.startMoment containsString:@"30"]) {
        [arrayMom addObject:self.startMoment];
        start += 1;
    }

    for (int i = start; i < end; i++) {
        [arrayMom addObject:[NSString stringWithFormat:@"%d:00", i]];
        [arrayMom addObject:[NSString stringWithFormat:@"%d:30", i]];
    }
    
    [arrayMom addObject:[NSString stringWithFormat:@"%d:00", end]];
    
    if ([self.endMoment containsString:@"30"]) {
        [arrayMom addObject:[NSString stringWithFormat:@"%d:30", end]];
    }
    
    NSLog(@"arrayMom is:%@", arrayMom);
    return arrayMom;
}

- (NSMutableArray *)getAllTimesWithSelectDate:(NSString *)selectDate;
{
    NSMutableArray *arrayM = [NSMutableArray arrayWithCapacity:30];
    [arrayM addObject:@"上午"];
    [arrayM addObject:@"下午"];
    return arrayM;
}

- (NSDate *)getResultDateWithSelectDate:(NSString *)selectDate withSelectTime:(NSString *)selectTime
{
    if ([NSObject isEmptyObj:selectDate] || [NSObject isEmptyObj:selectTime]) {
        return [NSDate date];
    }
    
    NSString *timeString = [NSString stringWithFormat:@"%@ %@",selectDate,selectTime];
    NSDate *date = [NSDate dateFromString:timeString withFormat:@"yyyy-MM-dd HH:mm"];
    
    return date ? date : [NSDate date];
}
@end
