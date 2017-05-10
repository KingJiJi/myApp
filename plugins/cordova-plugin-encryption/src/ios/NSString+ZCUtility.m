
//  NSString+Utility.m
//
//  Created by Liebrom Liu on 16-10-10.
//  Copyright (c) 2013年 . All rights reserved.
//

#import "NSString+ZCUtility.h"

@implementation NSString (ZCUtility)
+ (NSString *)generalKey
{
	
//    char key[17];
//    key[0] = 104/*'h'*/;
//    key[1] = 97/*'a'*/;
//    key[2] = 110/*'n'*/;
//    key[3] = 100/*'d'*/;
//    key[4] = 104/*'h'*/;
//    key[5] = 97/*'a'*/;
//    key[6] = 110/*'n'*/;
//    key[7] = 100/*'d'*/;
//    key[8] = 49/*'1'*/;
//    key[9] = 50/*'2'*/;
//    key[10] = 51/*'3'*/;
//    key[11] = 52/*'4'*/;
//    key[12] = 53/*'5'*/;
//    key[13] = 54/*'6'*/;
//    key[14] = 55/*'7'*/;
//    key[15] = 56/*'8'*/;
//    key[16] = 0;
//    
//    return [NSString stringWithCString:key encoding:NSASCIIStringEncoding];

	return [NSString stringWithFormat:@"ucarincadmin2016"];
}
@end
