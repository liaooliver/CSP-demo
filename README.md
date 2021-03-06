Content Security Policy Demo Starter Files

# 網站防身術之 內容安全政策(CSP) 防護

## 常見的網站安全漏洞

**攻方的手段**
- 常見注入型弱點： **XSS**、 **SQL injection** 、Command injection、Code injection
- Session 相關弱點：Session 劫持、Session 固定
- 前端相關弱點：**CSRF**、點擊劫持、DOM base、
- 進階弱點：SSRF、XXE、Insecure Deserialization、WebSockets

## XSS

type:
- 反射型 (Reflected) : 通常是將惡意程式會藏在網址列裡

    `http://www.example.com/upload.asp?id=<script>alert(1);</script>`
    ```html
        <h2 id="title"></h2>
        <script>
            localStorage.setItem('token', 'I\'m Token')
            const title = document.querySelector('#title')
            title.innerHTML = (new URL(location).searchParams.get('q'))
        </script>
    ```

- 儲存型 (Stored) : 攻擊的方式是 Hacker 將 Javascript 儲存在伺服器的資料庫中，進而引起使 User 遭受攻擊

    `<img src=# onerror=alert(123)>`

- DOM : 使 User 點擊 URL 攻擊才會生效

    `我是壞人！ <script>alert(1);</script>`

Demo XSS

防禦手法:
- 驗證使用者輸入的資訊
- 設定 Cookie
- **設定 Http-Header > CSP**

## CSP 防護

### 什麼是 CSP

- 全名: Content Security Policy 內容安全政策
- CSP 提供一份白名單給瀏覽器，用來告訴瀏覽器有哪些"來源"可以載入到網站內，不在白名單內的"來源"都不能加載到網站內。
- 簡單來說告知瀏覽器，該網頁有哪些位置可以連、哪些位置不能連

### 好處

- CSP 主要是用來防護減少 XSS 的攻擊
- 提供額外的安全措施來抵禦代碼注入攻擊，使得攻擊者更難以注入內容
  
### 來源(origin)

origin 的組成：scheme + host + port 

scheme
host
port 

## CSP 怎麼設定

- 後端設定 http-header
  
  以 Node.js 為例
    ![nodejs](./assets/nodejs.png)
  
- 前端設定 meta

  透過 HTML `meta` 標籤
    ![nodejs](./assets/html.png)

- 伺服器 IIS、nginx
    ![nginx](./assets/nginx.png)
## CSP 指令

### 常見指令
- default-src 預設所有類型的載入都使用這個規則。
- connect-src 載入 Ajax、Web Socket 套用的規則。
- font-src 載入字型套用的規則。
- frame-src 載入 IFrame 套用的規則。
- img-src 載入圖片套用的規則。
- media-src 載入影音標籤套用的規則。如：`<audio>`、`<video>` 等。
- object-src 載入非影音標籤物件套用的規則。如：`<object>`、`<embed>` 等。
- script-src 載入 JavaScript 套用的規則。
- style-src 載入 Stylesheets (CSS) 套用的規則。
- report-uri 當瀏覽器發現 CSP 安全性問題時，就會提報錯誤給 report-uri 指定的網址。

### 指令可設定的參數
每個 CSP 指令可以限制一個或多個能發出 Request 的位置，設定參數如下：

- '*'
允許對任何位置發出 Request。
如：`default-src *;`，允許載入來自任何地方、任何類型的資源。
![image](assets/all.png)
- 'none'
不允許對任何位置發出 Request。
如：`media-src 'none'`;，不允許載入影音標籤。
![image](assets/none.png)
- 'self'
只允許同網域的位置發出 Request。
如：`script-src 'self';`，只允許載入同網域的 *.js。
![image](assets/self.png)
- 'unsafe-inline'
允許執行 inline-script ，但不建議開啟此指令，會增加注入攻擊的風險。
如：`script-src 'unsafe-inline';`
![image](assets/unsafe-inline.png)
- URL
指定允許發出 Request 的位置，可搭配 * 使用。
如：img-src http://cdn.johnwu.cc https:;，只允許從 http://cdn.johnwu.cc 或其他 HTTPS 的位置載入 *.css。
![image](assets/url.png)

### 監控違反 CSP 的行為 

啟用 CSP 之後，如果有攻擊者試圖利用 XSS 攻擊，可以開啟 CSP 主動報告機制將違反 CSP 的訊息發佈到指定位置上。

增加額外的標頭來指定 report 的位置
![image](assets/report.png)

`/__cspreport__` 路由也需要存在於 server 上
![image](assets/cspreport.png)


- report-to 指令用於替換 report-uri 指令，但目前瀏覽器的支援度還有待加強
  
- 為了確保與未來瀏覽器版本兼容
  - 建議同時使用 report-to 指令 與 report-uri 指令

hash-source​

CSP 2 新增的功能​

Hash 的產生是基於 script 本身，透過 SHA-256、SHA-384、SHA-512 等加密算法產生

## 其他的防禦手段

- 同源政策（same-origin policy）
  - 規範了哪些資源可以跨源存取，哪些會受到限制。

- 跨來源資源共用（cross-origin-resource-sharing, CORS）
## Live Demo Time

https://www.digitalocean.com/community/tutorials/how-to-secure-node-js-applications-with-a-content-security-policy
https://ithelp.ithome.com.tw/articles/10196896


