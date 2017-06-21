# open-url-scheme

使用方法：

```javascript
window.openURLScheme('mailto://user@example.com', function() {
    alert('failure');
}, function() {
    alert('success');
})
```