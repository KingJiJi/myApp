//
//  ZCCustomTimePickerView.m
//  zuche
//
//  Created by Leo on 15/10/5.
//  Copyright © 2015年 zuche. All rights reserved.
//

#import "ZCCustomTimePickerView.h"
#import "ZCFooterView.h"
#import "AppDelegate.h"
#import "UIColor+HexString.h"
#import "NSObject+ZCUtility.h"
#import "ZCTimePickerModel.h"
#import "ZCTimePickerDateModel.h"
#import "Masonry.h"
#import "NSDate-Helper.h"

#define SCREEN_HEIGHT           CGRectGetHeight([[UIScreen mainScreen] bounds])
#define UI_SCREEN_WIDTH [UIScreen mainScreen].bounds.size.width
@interface ZCCustomTimePickerView () <UIPickerViewDataSource,UIPickerViewDelegate> {
    BOOL isSelectedFromTime;
}
@property (nonatomic, strong) UIPickerView *datePicker; // 日期控件
@property (nonatomic, strong) UIPickerView *timePicker; // 时间控件
@property (nonatomic, strong) UIPickerView *momentPicker;// 时刻控件
@property (nonatomic,strong)  UILabel *toolTitleLabel;  // 工具栏
@property (nonatomic,strong)  UIView *pickerBackView;   // pickerView的背景View
@property (nonatomic, strong) NSMutableArray *timeArray; // 时间的数据源
@property (strong,nonatomic)  NSMutableArray *dateArray; // 日期的数据源
@property (strong, nonatomic) NSMutableArray *momentArray;//具体时间的数据源
@property (strong,nonatomic)  NSString *selectDate; // 选择的日期
@property (strong,nonatomic)  NSString *selectTime; // 选择的时间
@property (strong, nonatomic) NSString *selectMoment;//选择分钟小时
@property (strong,nonatomic)  NSString *resultTime;
@property (strong,nonatomic)  ZCTimePickerModel *timModel; //
@property (strong,nonatomic)  UIView *toolView;
@end

@implementation ZCCustomTimePickerView
//- (id)init {
//    self = [super init];
//    if (self) {
//    }
//  
//    return self;
//}

-(void)removeFromSuperview {
    [super removeFromSuperview];
    
    self.resultTime = nil;
    
    if (self.timePickerBlock) {
        self.timePickerBlock(self.resultTime);
    }
}
- (void)createUI
{
    
    //self.mode = [NSString string];
    self.timModel = [[ZCTimePickerModel alloc]init];
    self.timeArray = [NSMutableArray array];
    self.dateArray = [NSMutableArray arrayWithCapacity:100];
    self.momentArray = [NSMutableArray array];
    
    self.clipsToBounds = YES;
    self.backgroundColor = [UIColor clearColor];
    UIView *bgView = [UIView new];
    bgView.backgroundColor = [UIColor blackColor];
    bgView.alpha = 0.5;
    [self addSubview:bgView];
    [bgView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.edges.mas_equalTo(0);
    }];
    
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(pickerHide)];
    [bgView addGestureRecognizer:tap];
    
    // picker 父View
    self.pickerBackView = [[UIView alloc]init];
    [self addSubview:self.pickerBackView];
    
    [self.pickerBackView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.mas_equalTo(self.mas_left).offset(0);
        make.height.mas_equalTo(266);
        make.width.mas_equalTo((UI_SCREEN_WIDTH));
        make.bottom.mas_equalTo(self.mas_bottom).offset(0);
    }];
    
    // 上面工具条
    UIView *toolView = [self creatToolView];
    self.toolView = toolView;
    toolView.backgroundColor = [UIColor whiteColor];
    [self.pickerBackView addSubview:toolView];
    
    // 日期选择器
    self.datePicker = [[UIPickerView alloc]init];
    self.datePicker.backgroundColor = [UIColor whiteColor];
    self.datePicker.showsSelectionIndicator = YES;
    self.datePicker.dataSource	= self;
    self.datePicker.delegate	= self;
    [self.pickerBackView addSubview:self.datePicker];
    
    // autoLayout
    [toolView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.mas_equalTo(self.pickerBackView.mas_left).offset(0);
        make.right.mas_equalTo(self.pickerBackView.mas_right).offset(0);
        make.height.mas_equalTo(50);
        make.top.mas_equalTo(self.pickerBackView.mas_top).offset(0);
    }];
    
    
    
    if ([self.mode isEqualToString:@"TYPE1"]) {
        // 时间选择器
        self.timePicker = [[UIPickerView alloc]init];
        self.timePicker.backgroundColor = [UIColor whiteColor];
        self.timePicker.showsSelectionIndicator = YES;
        self.timePicker.accessibilityIdentifier = @"customTimePickertimePicker";
        self.timePicker.dataSource	= self;
        self.timePicker.delegate	= self;
        [self.pickerBackView addSubview:self.timePicker];
        
        //auto Layout
        [self.datePicker mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.mas_equalTo(toolView.mas_bottom).offset(0);
            make.left.mas_equalTo(self.pickerBackView.mas_left).offset(0);
            make.bottom.mas_equalTo(self.pickerBackView.mas_bottom).offset(0);
            make.width.mas_equalTo(((UI_SCREEN_WIDTH) * 0.7f));
        }];
        
        [self.timePicker mas_makeConstraints:^(MASConstraintMaker *make) {
            make.left.mas_equalTo(self.datePicker.mas_right).offset(0);
            make.top.mas_equalTo(toolView.mas_bottom).offset(0);
            make.right.mas_equalTo(self.pickerBackView.mas_right).offset(0);
            make.bottom.mas_equalTo(self.pickerBackView.mas_bottom).offset(0);
        }];
    } else if ([self.mode isEqualToString:@"TYPE2"]) {
        //时刻选择器
        self.momentPicker = [[UIPickerView alloc] init];
        self.momentPicker.backgroundColor = [UIColor whiteColor];
        self.momentPicker.showsSelectionIndicator = YES;
        //self.momentPicker.accessibilityIdentifier = @"";
        self.momentPicker.dataSource = self;
        self.momentPicker.delegate = self;
        [self.pickerBackView addSubview:self.momentPicker];
        
        //auto Layout
        [self.datePicker mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.mas_equalTo(toolView.mas_bottom).offset(0);
            make.left.mas_equalTo(self.pickerBackView.mas_left).offset(0);
            make.bottom.mas_equalTo(self.pickerBackView.mas_bottom).offset(0);
            make.width.mas_equalTo(((UI_SCREEN_WIDTH) * 0.7f));
        }];
        
        [self.momentPicker mas_makeConstraints:^(MASConstraintMaker *make) {
            make.left.mas_equalTo(self.datePicker.mas_right).offset(0);
            make.top.mas_equalTo(toolView.mas_bottom).offset(0);
            make.right.mas_equalTo(self.pickerBackView.mas_right).offset(0);
            make.bottom.mas_equalTo(self.pickerBackView.mas_bottom).offset(0);
        }];
    } else if ([self.mode isEqualToString:@"TYPE3"]) {
        //auto Layout
        [self.datePicker mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.mas_equalTo(toolView.mas_bottom).offset(0);
            make.left.mas_equalTo(self.pickerBackView.mas_left).offset(0);
            make.bottom.mas_equalTo(self.pickerBackView.mas_bottom).offset(0);
            make.width.mas_equalTo(((UI_SCREEN_WIDTH) * 1.0f));
        }];
    }

    
}



#pragma mark -  new 规则后 设置timePicker
- (void)setTimePickerContentView {
    // 设置日期选择器
    [self setDatePickerModel];
    // 设置时间选择器
    [self setTimePickerModel];
    // 设置小时分钟选择器
    [self setMomentPickerModel];
    
    if ([self.mode isEqualToString:@"TYPE1"]) {
        self.resultTime = [NSString stringWithFormat:@"%@ %@", self.selectDate, self.selectTime];
    } else if ([self.mode isEqualToString:@"TYPE2"]) {
        self.resultTime = [NSString stringWithFormat:@"%@ %@", self.selectDate, self.selectMoment];
    } else if ([self.mode isEqualToString:@"TYPE3"]) {
        self.resultTime = [NSString stringWithFormat:@"%@", self.selectDate];
    }
    
    
}




// 点击选择 时间 确定 or 取消
- (void)clickedButtonAction:(UIButton *)sender {
    
    if (sender.tag == 101) { // 取消       
        [self pickerHide];
        self.resultTime = nil;
        if (self.timePickerBlock) {
            self.timePickerBlock(self.resultTime);
        }
        return;
    } else { // 确定
        [self pickerHide];
        if (self.resultTime) {
            if (self.timePickerBlock) {
                
                self.timePickerBlock(self.resultTime);
            }
        }
    }
}

#pragma mark - views
-(UIView *)creatToolView{
    // 背景图
    UIView *backView = [[UIView alloc]init];
    
    // 取消按钮
    UIButton *cancelbutn = [[UIButton alloc]init];
    [backView addSubview:cancelbutn];
    cancelbutn.tag = 101;
    [cancelbutn setTitleColor:[UIColor colorWithHexString:@"93939e"] forState:UIControlStateNormal];
    [cancelbutn setTitleColor:[UIColor colorWithHexString:@"5093939e"] forState: UIControlStateHighlighted];
    [cancelbutn addTarget:self action:@selector(clickedButtonAction:) forControlEvents:UIControlEventTouchUpInside];
    [cancelbutn setTitle:@"取消" forState:UIControlStateNormal];
    
    // 确定按钮
    UIButton *okButn = [UIButton new];
    [backView addSubview:okButn];
    okButn.tag = 102;
    [okButn setTitle:@"确定" forState:UIControlStateNormal];
    okButn.accessibilityIdentifier = @"customTimePickerOKButton";
    [okButn setTitleColor:[UIColor colorWithHexString:@"fabe00"] forState:UIControlStateNormal];
    [okButn setTitleColor:[UIColor colorWithHexString:@"50fabe00"] forState:UIControlStateHighlighted];
    [okButn addTarget:self action:@selector(clickedButtonAction:) forControlEvents:UIControlEventTouchUpInside];
    
    // 标题栏
    self.toolTitleLabel = [UILabel new];
    [backView addSubview:self.toolTitleLabel];
    self.toolTitleLabel.font = [UIFont systemFontOfSize:18.0];
    self.toolTitleLabel.backgroundColor = [UIColor clearColor];
    self.toolTitleLabel.text = self.title;
    self.toolTitleLabel.textAlignment = NSTextAlignmentCenter;
    self.toolTitleLabel.textColor =[UIColor colorWithHexString:@"60606c"];
    

    [cancelbutn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_equalTo(backView.mas_top).offset(0);
        make.left.mas_equalTo(backView.mas_left).offset(0);
        make.height.mas_equalTo(backView.mas_height).offset(0);
        make.width.mas_equalTo(60);
    }];
    
    [self.toolTitleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_equalTo(backView.mas_top).offset(0);
        make.bottom.mas_equalTo(backView.mas_bottom).offset(0);
        make.left.mas_equalTo(cancelbutn.mas_right).offset(10);
        make.right.mas_equalTo(okButn.mas_left).offset(-10);
    }];

    [okButn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.mas_equalTo(backView.mas_top).offset(0);
        make.bottom.mas_equalTo(backView.mas_bottom).offset(0);
        make.right.mas_equalTo(backView.mas_right).offset(0);
        make.width.mas_equalTo(60);
    }];
    
    return backView;
}

-(void)pickerHide {
    [UIView animateWithDuration:0.3 animations:^{
        self.alpha = 0.0f;
    }completion:^(BOOL finished){
        if ([self superview])
        {
            [self removeFromSuperview];
        }
    }];
}

#pragma mark - uipicker datasource
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView {
    return 1;
}
- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component {
    
    if (pickerView == self.datePicker) {
        return self.dateArray.count;
    } else if (pickerView == self.timePicker) {
        return self.timeArray.count;
    } else {
        return self.momentArray.count;
    }
//    NSArray *array = (pickerView == self.datePicker) ? self.dateArray : self.timeArray;
//    return array.count;
}


- (NSAttributedString *)pickerView:(UIPickerView *)pickerView attributedTitleForRow:(NSInteger)row forComponent:(NSInteger)component
{
    NSInteger inter = [pickerView selectedRowInComponent:component];
    if (row == inter) {
        for(UIView *speartorView in pickerView.subviews)
        {
            if (speartorView.frame.size.height < 1)//取出分割线view
            {
                speartorView.backgroundColor = [UIColor colorWithHexString:@"e5e5e5"];//分割线
            }
        }
        
    }
    NSString *title = @"";
    if (pickerView == self.datePicker) {
        ZCTimePickerDateModel *dateModel = [self.dateArray objectAtIndex:row];
        title = dateModel.name;
    } else if (pickerView == self.timePicker) {
        title = [self.timeArray objectAtIndex:row];
    } else {
        title = [self.momentArray objectAtIndex:row];
    }
    NSMutableAttributedString *attrStr = [[NSMutableAttributedString alloc]initWithString:title];
    //设置字体和设置字体的范围
    [attrStr addAttribute:NSFontAttributeName value:[UIFont systemFontOfSize:20.0f] range:NSMakeRange(0, title.length)];
    //添加文字颜色
    [attrStr addAttribute:NSForegroundColorAttributeName value:[UIColor colorWithHexString:@"60606c"] range:NSMakeRange(0,title.length)];
    return attrStr;
}

- (void)pickerView:(UIPickerView *)thePickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component {
    if (thePickerView == self.datePicker) {
        // 日期的选择控件
        ZCTimePickerDateModel *dateModel = [self.dateArray objectAtIndex:row];
        self.selectDate = dateModel.dateString;
        // 设置时间选择器
        [self setTimePickerModel];
//        [self setMomentPickerModel];
        // 刷新时间设置
        if ([self.mode isEqualToString:@"TYPE1"]) {
            self.resultTime = [NSString stringWithFormat:@"%@ %@", self.selectDate, self.selectTime];
        } else if ([self.mode isEqualToString:@"TYPE2"]) {
            self.resultTime = [NSString stringWithFormat:@"%@ %@", self.selectDate, self.selectMoment];
        } else if ([self.mode isEqualToString:@"TYPE3"]) {
            self.resultTime = [NSString stringWithFormat:@"%@", self.selectDate];
        }
        
    } else if (thePickerView == self.timePicker) {
        // 时间的选择控件
        self.selectTime = [self.timeArray objectAtIndex:row];
        // 设置时间选择器
        
        // 刷新时间设置
        if ([self.mode isEqualToString:@"TYPE1"]) {
            self.resultTime = [NSString stringWithFormat:@"%@ %@", self.selectDate, self.selectTime];
        } else if ([self.mode isEqualToString:@"TYPE2"]) {
            self.resultTime = [NSString stringWithFormat:@"%@ %@", self.selectDate, self.selectMoment];
        } else if ([self.mode isEqualToString:@"TYPE3"]) {
            self.resultTime = [NSString stringWithFormat:@"%@", self.selectDate];
        }
    } else if (thePickerView == self.momentPicker) {
        self.selectMoment = [self.momentArray objectAtIndex:row];
        
        if ([self.mode isEqualToString:@"TYPE1"]) {
            self.resultTime = [NSString stringWithFormat:@"%@ %@", self.selectDate, self.selectTime];
        } else if ([self.mode isEqualToString:@"TYPE2"]) {
            self.resultTime = [NSString stringWithFormat:@"%@ %@", self.selectDate, self.selectMoment];
        } else if ([self.mode isEqualToString:@"TYPE3"]) {
            self.resultTime = [NSString stringWithFormat:@"%@", self.selectDate];
        }
    }
}

- (void)setDatePickerModel
{
    self.timModel.minDate = self.minDate;
    self.timModel.maxDate = self.maxDate;
    [self.dateArray removeAllObjects];
    [self.dateArray addObjectsFromArray:[self.timModel getAllDaysOfMinDateAndMaxDate]];
    [self.datePicker reloadAllComponents];
    self.selectDate = [self.defaultDate stringWithFormat:@"yyyy-MM-dd"];
    
    
    // 设置默认的时间选择
    NSUInteger index = 0;
    for (NSUInteger i = 0; i < self.dateArray.count; i++) {
        ZCTimePickerDateModel *model = [self.dateArray objectAtIndex:i];
        if ([model.dateString isEqualToString:self.selectDate]) {
            index = i;
            break;
        }
    }
    
    if (self.dateArray && (self.dateArray.count > (NSUInteger)index)) {
        ZCTimePickerDateModel *model = [self.dateArray objectAtIndex:index];
        self.selectDate = model.dateString;
        [self.datePicker selectRow:index inComponent:0 animated:NO];
    }
}

- (void)setTimePickerModel
{
    NSArray *array = [self.timModel getAllTimesWithSelectDate:self.selectDate];
    [self.timeArray removeAllObjects];
    [self.timeArray addObjectsFromArray:array];
    [self.timePicker reloadAllComponents];
    
    if (self.defaultTime != [NSString string]) {
        self.selectTime = self.defaultTime;
    } else {
        self.selectTime = @"上午";
    }
    
    NSLog(@"selectTime is :%@", self.selectTime);
    // 设置默认的selectTime
    NSInteger index = 0;
    for (NSUInteger i = 0; i < self.timeArray.count; i++) {
        NSString *time = [self.timeArray objectAtIndex:i];
        if ([time isEqualToString:self.selectTime]) {
            index = i;
            break;
        }
    }
    
    if (array && (array.count > (NSUInteger)index)) {
        self.selectTime = [array objectAtIndex:index];
        [self.timePicker selectRow:index inComponent:0 animated: NO];
    }
    
}

-(void)setMomentPickerModel {
    
    self.timModel.startMoment = self.startMoment;
    self.timModel.endMoment = self.endMoment;
    
    if (self.defaultMoment != [NSString string]) {
        self.selectMoment = self.defaultMoment;
    } else {
        self.selectMoment = self.startMoment;
    }
    
    NSArray *array = [self.timModel getAllMoments];
    [self.momentArray removeAllObjects];
    [self.momentArray addObjectsFromArray:array];
    [self.momentPicker reloadAllComponents];
    
    NSInteger index = 0;
    for (NSUInteger i = 0; i < self.momentArray.count; i++) {
        NSString *moment = [self.momentArray objectAtIndex:i];
        if ([moment isEqualToString:self.selectMoment]) {
            index = i;
            break;
        }
    }
    
    
    if (array && (array.count > (NSUInteger)index)) {
        self.selectMoment = [array objectAtIndex:index];
        [self.momentPicker selectRow:index inComponent:0 animated: NO];
    }
    
}


- (void)setTitle:(NSString *)title
{
    _title = title;
    self.toolTitleLabel.text = title;
}
@end
