# open-url-scheme

使用方法：

```javascript
window.openURLScheme('mailto://user@example.com', function() {
    alert('failure');
}, function() {
    alert('success');
});
```
**注意：**iOS 系统打开 URLScheme 只能由事件触发，直接调用 JS 代码会无反应。