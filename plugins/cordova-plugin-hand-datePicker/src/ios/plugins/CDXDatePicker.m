//
//  CDXDatePicker.m
//  PluginDemo
//
//  Created by Yongjia Liu on 2016/11/29.
//
//

#import "CDXDatePicker.h"
#import "ZCCustomTimePickerView.h"
#import "Masonry.h"
#import "NSDate+Utilities.h"


@implementation CDXDatePicker
-(void)selectDate: (CDVInvokedUrlCommand *)cmd {
    NSLog(@"dic is:%@", cmd.arguments);
    
    NSDictionary *data = [cmd.arguments firstObject];
    
    NSString *startDateString = [NSString string];
    NSString *endDateString = [NSString string];
    NSString *startTime = [NSString string];
    NSString *endTime = [NSString string];
    NSString *title = [NSString string];
    NSString *pickMode = [NSString string];
    NSString *selectedDateString = [NSString string];
    NSString *selectedTimeString = [NSString string];
    NSString *selectedMomentString = [NSString string];
    
    ZCCustomTimePickerView *timePickerView = [[ZCCustomTimePickerView alloc] init];
    
    if ([data isEqual: [NSNull null]]) {
        
        NSDate *currentDate = [NSDate date];
        NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
        [dateFormatter setDateFormat:@"yyyy-MM-dd"];
        NSString *currentDateString = [dateFormatter stringFromDate:currentDate];
        
        NSDate *endDate = [NSDate dateWithDaysFromNow:20];
        NSString *endString = [dateFormatter stringFromDate:endDate];
        
        startDateString = currentDateString;
        endDateString = endString;
        startTime = @"8:00";
        endTime = @"18:00";
        title = @"取车时间";
        pickMode = @"TYPE1";
    } else {
        if (data[@"startDate"]) {
            startDateString = data[@"startDate"];
        } else {
            NSDate *currentDate = [NSDate date];
            NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
            [dateFormatter setDateFormat:@"yyyy-MM-dd"];
            NSString *currentDateString = [dateFormatter stringFromDate:currentDate];
            startDateString = currentDateString;
        }
        
        if (data[@"endDate"]) {
            endDateString = data[@"endDate"];
        } else {
            NSDate *endDate = [NSDate dateWithDaysFromNow:20];
            NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
            [dateFormatter setDateFormat:@"yyyy-MM-dd"];
            NSString *endString = [dateFormatter stringFromDate:endDate];
            endDateString = endString;
        }
        
        if (data[@"startTime"]) {
            startTime = data[@"startTime"];
        } else {
            startTime = @"8:00";
        }
        
        if (data[@"endTime"]) {
            endTime = data[@"endTime"];
        } else {
            endTime = @"18:00";
        }
        
        if (data[@"title"]) {
            title = data[@"title"];
        } else {
            title = @"取车时间";
        }
        
        if (data[@"type"]) {
            pickMode = data[@"type"];
        } else {
            pickMode = @"TYPE1";
        }
        
        if (data[@"selectedDate"]) {
            selectedDateString = [data[@"selectedDate"] substringToIndex:[data[@"selectedDate"] rangeOfString:@" "].location];
            if ([pickMode isEqual:@"TYPE1"]) {
                selectedTimeString = [data[@"selectedDate"] substringFromIndex:[data[@"selectedDate"] rangeOfString:@" "].location + 1];
                NSLog(@"selectedTimeString is :%@", selectedTimeString);
            } else if ([pickMode isEqual:@"TYPE2"]) {
                selectedMomentString = [data[@"selectedDate"] substringFromIndex:[data[@"selectedDate"] rangeOfString:@" "].location + 1];
            }
        } else {
            timePickerView.defaultDate = [NSDate dateWithDaysFromNow:0];
        }
    }
    
    NSString *startMoment = startTime;
    NSString *endMoment = endTime;
    
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init] ;
    [formatter setDateFormat:@"yyyy-MM-dd"];
    NSDate *startDate=[formatter dateFromString:startDateString];
    NSDate *endDate = [formatter dateFromString:endDateString];
    NSDate *selectedDate = [formatter dateFromString:selectedDateString];
    
    timePickerView.defaultDate = selectedDate;
    timePickerView.defaultTime = selectedTimeString;
    timePickerView.defaultMoment = selectedMomentString;
    timePickerView.title = title;
    timePickerView.mode = pickMode;
    
    timePickerView.startMoment = startMoment;
    timePickerView.endMoment = endMoment;
    
    [timePickerView createUI];
    UIWindow *keyWindow = [[UIApplication sharedApplication]keyWindow];
    if (keyWindow) {
        [keyWindow addSubview:timePickerView];
        [timePickerView mas_makeConstraints:^(MASConstraintMaker *make) {
            make.edges.mas_equalTo(0);
        }];
    }
    
    timePickerView.minDate= startDate;
    timePickerView.maxDate = endDate;
    
    
    //        __weak ZCCustomTimePickerView *weakPicker = timePickerView;
    timePickerView.timePickerBlock = ^(NSString *selectDate) {
        
        if (selectDate) {
            NSString *dateString = [NSString stringWithFormat:@"%@", selectDate];
            CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:dateString];
            
            [self.commandDelegate sendPluginResult:result callbackId:cmd.callbackId];
        } else {
            CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@""];
            [self.commandDelegate sendPluginResult:result callbackId:cmd.callbackId];
        }
        
    };
    
    [timePickerView setTimePickerContentView];
}
@end
