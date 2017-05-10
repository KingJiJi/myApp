
## cordova-plugin-encryption

=====
Author: Yongjia.Liu & Jie.Huang

### Supported Platforms

- Android
- iOS

### 加密方式

* AES加密模式: ECB模式
* 填充方式: PKCS5Padding
* 加密密码: handhand1234567
* 字符集: utf-8
* 加密结果编码方式: base64

### 插件使用

####设置密码(仅适用于 macOS 等 *unix 操作系统)
插件初始加密密码为 handhand12345678，未修改则保持不变，在终端进入插件根目录，然后执行如下命令：

```
chmod +x EncryptShell.shell
./EncryptShell.shell
```

跟随提示输入加密密码以完成修改。

####JS调用
__加密，返回加密后的字符串：__

```
success: 成功回调
failure: 失败回调
str: 需要加密的字符串
返回类型: String

encryptWithString(success, failure, str);
```

__解密，返回解密后的字符串：__

```
success: 成功回调
failure: 失败回调
str: 需要加密的字符串
返回类型: String

decryptWithString(success, failure, str);
```
