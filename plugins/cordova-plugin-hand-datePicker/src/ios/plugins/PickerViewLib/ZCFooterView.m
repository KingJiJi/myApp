//
//  FooterView.m
//  CustomsControls
//
//  Created by XUE on 14-1-17.
//  Copyright (c) 2014年 XUE. All rights reserved.
//

#import "ZCFooterView.h"

#define UI_SCREEN_WIDTH ([UIScreen mainScreen].bounds.size.width)
#define FOOTER_HEIGHT 44
@interface ZCFooterView ()

@end

@implementation ZCFooterView

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.cancelIndex = 0;
        self.sureIndex = 1;
        self.selectIndex = -1;
        _bgImageView = [[UIImageView alloc] initWithFrame:self.frame];
        _bgImageView.userInteractionEnabled = YES;        
        [self addSubview:_bgImageView];
        
    }
    return self;
}

+ (ZCFooterView *)getFooterView{
    ZCFooterView *footerView = [[[self class] alloc] initWithFrame:CGRectMake(0, 0, UI_SCREEN_WIDTH, FOOTER_HEIGHT)];
    footerView.backgroundColor = [UIColor clearColor];
    CGPathRef path = [UIBezierPath bezierPathWithRect:footerView.bounds].CGPath;
    [footerView.layer setShadowPath:path];
    footerView.layer.backgroundColor = [UIColor whiteColor].CGColor;
    footerView.layer.shadowOffset = CGSizeMake(0, 1);
    footerView.layer.shadowColor = [UIColor darkGrayColor].CGColor;
    footerView.layer.shadowOpacity = 0.5f;
    return footerView;
}

- (void)layoutSubviews{
    
    self.frame = CGRectMake(0, self.superview.frame.size.height - FOOTER_HEIGHT, UI_SCREEN_WIDTH, FOOTER_HEIGHT);
    CGFloat btnWidth = 70;
    CGFloat btnHeight = 30;
    CGFloat selfWidth = self.frame.size.width;
    CGFloat selfHeight = self.frame.size.height;
    if (1 == [_titles count]) {
        CGFloat widthBtn = [self getWidthWithString:[_titles lastObject] withFont:[UIFont systemFontOfSize:15.0f] withHight:30];
        UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
        btn.frame = CGRectMake((selfWidth-widthBtn)/2.0, (selfHeight-btnHeight)/2.0, widthBtn, btnHeight);
        [btn setTitle:[_titles lastObject] forState:UIControlStateNormal];
        btn.titleLabel.font = [UIFont systemFontOfSize:15.0f];
        [btn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
        [btn setTitleColor:[UIColor grayColor] forState:UIControlStateHighlighted];
        [btn addTarget:self action:@selector(buttonTouched:) forControlEvents:UIControlEventTouchUpInside];
        [self addSubview:btn];
    }else if(2 == [_titles count]){
        CGFloat inv = selfWidth - 5 - btnWidth;
        
        NSUInteger titlesCount = [_titles count];
        for (NSUInteger i = 0; i < titlesCount; i ++) {
            UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
            button.frame = CGRectMake(2 + i * inv, (selfHeight-btnHeight)/2.0, btnWidth, btnHeight);
            button.tag = i + 100;
            [button setTitle:[_titles objectAtIndex:i] forState:UIControlStateNormal];
            button.titleLabel.font = [UIFont systemFontOfSize:15.0f];
            [button setTitleColor:[UIColor orangeColor] forState:UIControlStateNormal];
            [button setTitleColor:[UIColor grayColor] forState:UIControlStateHighlighted];
            [button addTarget:self action:@selector(buttonTouched:) forControlEvents:UIControlEventTouchUpInside];
            [self addSubview:button];
            if (i == 0) {
                self.cancelButton = button;
            }else{
                self.sureButton = button;
            }
        }
    }

}

- (void)setBgImage:(UIImage *)image{
    if (image == _bgImage) {
        return;
    }
    _bgImage = image;
    _bgImageView.image = image;
}


- (void)buttonTouched:(UIButton *)sender{
    if (2 == [_titles count]) {
        self.selectIndex = sender.tag - 100;
    }
    
    if ([self.delegate respondsToSelector:@selector(footerViewHandle:)]) {
        [self.delegate footerViewHandle:self];
    }
    
}

- (CGFloat )getWidthWithString:(NSString *)text withFont:(UIFont *)font withHight:(CGFloat)height{
    CGSize titleSize = [text boundingRectWithSize:CGSizeMake(500,height)
                                          options:NSStringDrawingUsesLineFragmentOrigin
                                       attributes:@{NSFontAttributeName: font}
                                          context:nil].size;
    
    return titleSize.width + 40;
}

@end
