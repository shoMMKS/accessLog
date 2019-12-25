# accessLog
Apacheのアクセスログファイルを読み込み、以下の観点でアクセス件数を集計する。
- 各時間帯毎のアクセス件数
- リモートホスト別のアクセス件数: アクセスの多いリモートホストの順にアクセス件数の一覧を表示する。

## Node Environment
Node    v10.0.0

## Usage
node index.js [-h `<dateString>` `<dateString>`] [file ...]

command sample: 
```sh
$ node index.js access_log1 accesslog2
$ node index.js -h 2017/04/01 2017/04/30 access_log3
$ node index.js -h 2019-01-01 2019-10-31 access_log4 access_log5
```

## Output
sample: 
```sh
$ node index.js access_log
- リモートホスト別のアクセス件数 -
192.168.1.0 : 25
192.168.0.1 : 17
192.24.0.1 : 14
96.45.156.217 : 2
28.87.170.137 : 1
- 時間帯別のアクセス件数 -
2:00 ~ 2:59 : 1
4:00 ~ 4:59 : 1
7:00 ~ 7:59 : 2
9:00 ~ 9:59 : 6
11:00 ~ 11:59 : 2
13:00 ~ 13:59 : 34
16:00 ~ 16:59 : 7
21:00 ~ 21:59 : 6
```
