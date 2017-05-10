//
//  Encryption.m
//  HelloCordova
//
//  Created by Yongjia Liu on 2016/10/8.
//
//

#import "Encryption.h"
#import "NSData+AES256.h"

@implementation Encryption
-(void)encryptWithString:(CDVInvokedUrlCommand *)command {
    
    if ([command.arguments[0] isKindOfClass:[NSDictionary class]]) {
        NSDictionary *dic = command.arguments[0];
        NSString *string = [NSString stringWithFormat:@"%@", dic];
        NSString *encryptedString = [NSData AES256EncryptWithPlainTextExt:string];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:encryptedString];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else if ([command.arguments[0] isKindOfClass:[NSString class]]) {
        NSString *string = command.arguments[0];
        NSString *encryptedString = [NSData AES256EncryptWithPlainTextExt:string];
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:encryptedString];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
    
    
}
-(void)decryptWithString:(CDVInvokedUrlCommand *)command {
    
    if ([command.arguments[0] isKindOfClass:[NSDictionary class]]) {
        NSDictionary *dic = command.arguments[0];
        NSString *string = [NSString stringWithFormat:@"%@", dic];
        NSString *encryptedString = [NSData AES256DecryptWithCiphertextExt:string];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:encryptedString];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else if ([command.arguments[0] isKindOfClass:[NSString class]]) {
        NSString *string = command.arguments[0];
        NSString *encryptedString = [NSData AES256DecryptWithCiphertextExt:string];
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:encryptedString];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }

}

@end
