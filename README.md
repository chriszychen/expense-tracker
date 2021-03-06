# Expense Tracker

利用 Node.js + Express 打造的簡易支出與收入記帳網站  

#### 登入畫面

![login image](https://github.com/chriszychen/expense-tracker/blob/main/public/images/login.PNG)

#### Balance 畫面

![balance image](https://github.com/chriszychen/expense-tracker/blob/main/public/images/balance.png)

#### Expense 畫面

![balance image](https://github.com/chriszychen/expense-tracker/blob/main/public/images/expense.png)

#### Income 畫面

![balance image](https://github.com/chriszychen/expense-tracker/blob/main/public/images/income.png)

## Live Demo

[My Expense Tracker](https://expense-tracker-demo-chris.herokuapp.com/)

Demo account - ```root@example.com / 12345678```

## Features

* 可使用自訂用戶名稱、Email 和密碼進行註冊。
* 使用註冊的 Email 與密碼進行登入，也能使用 Facebook、Google、GitHub 進行第三方登入。
* Balance 頁面可以總覽固定日期區間的支出與收入明細，並透過圖表查看比例。
* Expense 和 Income 頁面分別可以對支出與收入明細進行CRUD操作。
* Expense 和 Income 頁面也具有篩選功能，能夠使用分類及日期區間篩選符合條件的紀錄。

## Prerequisites

* [Node.js v14.16.1](https://nodejs.org/en/)
* [MongoDB v4.2.13](https://www.mongodb.com/try/download/community)

## Installation and Execution

1.使用git clone下載至本地並安裝套件

```sh
git clone https://github.com/chriszychen/expense-tracker.git
cd expense-tracker
npm install 
```

2.啟動本地 MongoDB 資料庫  

3.利用 .env.example 建立 .env 檔案並將對應的 ID 與 SECRET 填入  

4.啟動伺服器

```sh
npm run start
```

終端機顯示 ```App is running on http://localhost:3000``` 代表伺服器成功啟動  

顯示 ```mongodb connected!``` 代表伺服器成功與資料庫連接  

5.新增種子資料

```sh
npm run seed
```

終端機出現 ```category seeder done!``` 和 ```record seeder done!``` 後  

即可至瀏覽器網址輸入 [http://localhost:3000](http://localhost:3000) 瀏覽專案功能
