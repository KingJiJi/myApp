//
//  Encryption.h
//  HelloCordova
//
//  Created by Yongjia Liu on 2016/10/8.
//
//

#import <Cordova/CDVPlugin.h>

@interface Encryption : CDVPlugin
-(void)encryptWithString:(CDVInvokedUrlCommand *)command;
-(void)decryptWithString:(CDVInvokedUrlCommand *)command;
@end
