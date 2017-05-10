//
//  NSObject+ZCUtility.m
//  zuche
//
//  Created by shaneZhang on 15/12/23.
//  Copyright © 2015年 zuche. All rights reserved.
//

#import "NSObject+ZCUtility.h"

@implementation NSObject (ZCUtility)
+ (BOOL)isEmptyObj:(id)obj
{
    if (obj==nil) {
        return YES;
    }
    if (obj==NULL) {
        return YES;
    }
    if (obj==[NSNull null]) {
        return YES;
    }
    if ([obj isKindOfClass:[NSString class]]) {
        
        if ([[obj stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] length]==0) {
            return YES;
        }
        if ([obj isEqualToString:@"(null)"]) {
            return YES;
        }
        return NO;
    }
    if ([obj isKindOfClass:[NSData class]]) {
        return [((NSData *)obj) length]<=0;
    }
    if ([obj isKindOfClass:[NSDictionary class]]) {
        return [((NSDictionary *)obj) count]<=0;
    }
    if ([obj isKindOfClass:[NSArray class]]) {
        return [((NSArray *)obj) count]<=0;
    }
    if ([obj isKindOfClass:[NSSet class]]) {
        return [((NSSet *)obj) count]<=0;
    }
    return NO;
}
@end
