# Expense Tracker
利用Node.js + Express打造的簡易支出記帳網站
![index image](https://github.com/chriszychen/ac_expense-tracker/blob/main/public/images/index.PNG)
## Features - 專案功能描述
1. 可以總覽所有支出的名稱、分類和支出金額
2. 可以選擇支出的分類進行支出記錄的篩選，篩選後會看到該類別支出記錄和篩選後的總金額
3. 可以點擊按鈕新增支出記錄
4. 可以點擊編輯按鈕修改任一筆支出記錄的內容
5. 可以點擊刪除按鈕刪除任一筆支出記錄

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

3.啟動MongoDB資料庫
4.啟動伺服器
```
npm run dev
```

終端機顯示 ```App is running on http://localhost:3000``` 代表伺服器成功啟動<br/>
顯示 ```mongodb connected!``` 代表伺服器成功與資料庫連接 <br/>
5.新增種子資料
```
npm run seed
```
終端機出現 ```record seeder done!``` 和 ```category seeder done!``` 後 <br/>
即可至瀏覽器網址輸入 http://localhost:3000 瀏覽專案功能
