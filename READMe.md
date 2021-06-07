# Expense Tracker
利用Node.js + Express打造的簡易支出記帳網站
![login image](https://github.com/chriszychen/ac_expense-tracker/blob/main/public/images/login.PNG)
![index image](https://github.com/chriszychen/ac_expense-tracker/blob/main/public/images/index.PNG)
## Features - 專案功能描述
### Updated
* 使用自訂用戶名稱、Email和密碼進行註冊
* 使用註冊好的Email與密碼或使用Facebook帳號進行登入
* 選擇日期區間進行支出記錄篩選，篩選後會看到位於該日期區間的支出內容與總金額



### Original features
* 總覽所有支出的名稱、分類和支出金額
* 選擇支出的分類進行支出記錄的篩選，篩選後會看到該類別支出記錄和篩選後的總金額
* 新增一筆支出記錄
* 修改任一筆支出記錄的內容
* 刪除任一筆支出記錄

## Prerequisites - 環境建置與需求

* [Node.js v14.16.1](https://nodejs.org/en/)
* [MongoDB v4.2.14](https://www.mongodb.com/try/download/community)

## Installation and Execution - 安裝與執行步驟
1.打開終端機，使用git clone將專案下載至本地資料夾
```
git clone https://github.com/chriszychen/ac_expense-tracker.git
```

2.進入專案資料夾
```
cd ac_expense-tracker
```

3.安裝專案需求套件
```
npm install 
npm i nodemon
```

4.啟動MongoDB資料庫
5.修改.env.example檔名為.env並將自己的Facebook App ID和Facebook App Secret填入後存檔<br/>
6.啟動伺服器
```
npm run dev
```

終端機顯示 ```App is running on http://localhost:3000``` 代表伺服器成功啟動<br/>
顯示 ```mongodb connected!``` 代表伺服器成功與資料庫連接 <br/>
7.新增種子資料
```
npm run seed
```
終端機出現 ```category seeder done!``` 和 ```record seeder done!``` 後 <br/>
即可至瀏覽器網址輸入 http://localhost:3000 瀏覽專案功能
