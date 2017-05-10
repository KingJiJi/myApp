//
//  FooterView.h
//  CustomsControls
//
//  Created by XUE on 14-1-17.
//  Copyright (c) 2014年 XUE. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ZCFooterView : UIView

@property (nonatomic, strong) NSArray *titles;
@property (nonatomic, assign) id delegate;
@property (nonatomic, assign) NSInteger selectIndex;
@property (nonatomic, assign) NSInteger cancelIndex;
@property (nonatomic, assign) NSInteger sureIndex;

@property (nonatomic, strong) UIImage *bgImage;
@property (nonatomic, strong) UIImageView *bgImageView;

@property (nonatomic, strong) UIButton *cancelButton;
@property (nonatomic, strong) UIButton *sureButton;

+ (ZCFooterView *)getFooterView;
@end

@protocol FooterViewDelegate <NSObject>

- (void)footerViewHandle:(ZCFooterView *)footer;

@end
