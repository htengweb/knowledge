# react-native

## 开发环境配置
* 安装依赖（node、react-native、Android Studio、JDK）
> 安装npm
```javscript
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```
> 安装react-native
```javscript
npm install -g react-native-cli

react-native --version

```
* 创建react-native项目
> \>react-native init < project name >
* 启动项目(首次启动慢，需要下载大量编译依赖。此过程依赖科学上网)
> \>react-native run-android

> [安装 Android Studio](https://developer.android.com/studio/)

> [安装JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

> 安装 Android SDK
```javscript
配置环境变量
```
* 设置Android Studio中SDK Manager
> 1、进入Android Studio中设置
```javscript
File>Setting...> System Settings>Android SDK
选择本地安装SDK的目录地址
Android SDK Location: D:\xxx\Android\Sdk
选择安装SDK Platform和SDK Tools对应的包
```
> 2、项目文件中配置SDK地址
```javscript
android目录下创建文件local.properties
> sdk.dir=D\:\\xxx\\Android\\sdk
```

* 设置生成签名秘钥
> D:\xxx\Java\jdk1.8.0_191\bin
```javscript
进入安装的jdk目录下，bin中有keytool.exe文件
执行命令
xxx\bin>keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
my-release-key.keystore为生成的秘钥文件名，my-key-alias为keyAlias对应的名称。
执行命令后会提示设置相应的密码。
```
* 项目中应用设置签名秘钥
```javscript
将生成的签名秘钥文件拷到\android\app\目录下，与build.gradle同级（这里完全可以自定义文件路径）

```
> \android\app\build.gradle
```javscript
android {
	signingConfigs{
		//调试中也使用正式签名
		debug {
			storeFile file("my-release-key.keystore")//引用签名秘钥文件
			keyAlias "my-key-alias" //keytool中-alias对应设置的名称
			keyPassword "password" //生成签名秘钥文件时设置的密码
			storePassword "password" //生成签名秘钥文件时设置的密码
		}
		release {
			storeFile file("my-release-key.keystore")//引用签名秘钥文件
			keyAlias "my-key-alias" //keytool中-alias对应设置的名称
			keyPassword "password" //生成签名秘钥文件时设置的密码
			storePassword "password" //生成签名秘钥文件时设置的密码
		}
	}
	buildTypes {
		debug {
			minifyEnabled  false
			proguardFiles "proguard-rules.pro"
			signingConfig signingConfigs.debug
		}
		release {
			minifyEnabled enableProguardInReleaseBuilds
			proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
			signingConfig signingConfigs.release
		}
	}
}
```

* 打包APK
> 进入项目的android目录下，执行 gradlew assembleRelease 命令即可
```javscript
cd android
\android>gradlew assembleRelease
```

* 打包好的apk地址
> \android\app\build\outpts\apk\relese\app-release.apk



* 启动报错
```javscript
报错信息：unable to load script from assets 'index.android bundle'  ,make sure your bundle is packaged correctly or youu're runing a packager server......
解决方法：
1、在项目目录：android/app/src/main 目录下创建一个 assets 空文件夹。
2、react-native新版本，目录下有index.js和App.js。执行命令：> react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```