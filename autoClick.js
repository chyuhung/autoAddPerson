// 创建一个 MutationObserver 实例
var observer = new MutationObserver(function (mutations) {
  console.log("[INFO] DOM 发生变化");
});

// 开始监听DOM变化
console.log("[INFO] 开始监听DOM变化");
observer.observe(document, { childList: true, subtree: true });

// 点击刷新按钮
console.log("[INFO] 点击刷新按钮");
var confirmButton = document.getElementById(
  "operation_user_tagger_search_btn_search"
);
confirmButton.click();

// 等待两秒后开始检查页面中的待处理和处理中元素
setTimeout(function () {
  console.log("[INFO] 开始检查页面中的待处理和处理中元素");
  var waitElements = document.querySelectorAll('a[onclick*="waitFunction("]');
  var descElements = document.querySelectorAll('a[onclick*="descFunction("]');

  var maxParam = -Infinity;
  var maxElement = null;

  // 查找第一个参数数字最大的待处理元素
  for (var i = 0; i < waitElements.length; i++) {
    var element = waitElements[i];
    var onclickValue = element.getAttribute("onclick");
    var firstParam = parseInt(onclickValue.match(/\((\d+)/)[1]);

    if (firstParam >= maxParam) {
      maxParam = firstParam;
      maxElement = element;
    }
  }

  // 检查处理中元素的第一个参数最大值是否大于待处理元素的第一个参数
  for (var i = 0; i < descElements.length; i++) {
    var element = descElements[i];
    var onclickValue = element.getAttribute("onclick");
    var firstParam = parseInt(onclickValue.match(/\((\d+)/)[1]);

    if (firstParam >= maxParam) {
      // 如果处理中元素第一个参数值更大，则待处理元素无效，进行置空
      maxElement = null;
      break;
    }
  }

  // 如果最大参数对应的元素是待处理元素，则点击它
  if (maxElement) {
    console.log("[INFO] 发现待处理");
    console.log("[INFO] 待处理元素内容:", maxElement.getAttribute("onclick"));

    // 检查详细信息，综合判断
    console.log("[INFO] 检查详细信息，综合判断");
    var parentElement = maxElement.parentElement.parentElement.parentElement;
    console.log("[INFO] 待处理元素顶级父元素:", parentElement);
    // 定位到待检查列表元素的父元素（div）
    var nextParentElement =
      parentElement.nextElementSibling.children[0].children[0].children[0];
    console.log("[INFO] 待检查列表元素的父元素(div):", nextParentElement);

    // 获取 <div> 元素的文本内容
    var divText = nextParentElement.textContent.trim();
    console.log("[INFO] 获取的 <div> 元素的文本内容:)", divText);

    // 使用 "|" 符号分割文本内容
    var splitText = divText.split("|");
    console.log("[INFO] 使用 " | " 符号分割的文本内容:", splitText);

    // 数组第1个元素包含年龄
    var ageText = splitText[1].trim();
    var age = ageText.split(":")[1].trim();
    console.log("[INFO] 年龄:", age);
    // 数组第9个元素包含推荐人ID
    var ReferralPersonText = splitText[9].trim();
    var ReferralPersonID = ReferralPersonText.split(":")[1].trim();
    console.log("[INFO] 推荐人ID:", ReferralPersonID);
    // 数组第10个元素包含推荐公会ID
    var ReferralGuildText = splitText[10].trim();
    var ReferralGuildID = ReferralGuildText.split(":")[1].trim();
    console.log("[INFO] 推荐公会ID:", ReferralGuildID);

    // 判断年龄以及是否存在推荐人或推荐公会
    var personOK = false;
    if (age > 20 && ReferralPersonID != "null" && ReferralGuildID != "null") {
      personOK = true;
    }

    if (personOK) {
      console.log("[INFO] 条件不满足");
      return;
    }
    // 执行点击去处理
    console.log("[INFO] 点击待处理");
    eval(maxElement.getAttribute("onclick"));

    // 点击确认按钮
    console.log("[INFO] 点击确认按钮");
    // 获取顶层div元素
    var topDiv = document.querySelector(".panel-htop.messager-window");
    // 获取包含"确定"文本的按钮元素
    var confirmButton2 = topDiv.querySelector(".l-btn-text");
    // 模拟点击确认按钮
    confirmButton2.click();

    // 点击确认加入公会按钮
    console.log("[INFO] 点击确认加入公会按钮");
    // 获取顶层div元素
    var topDiv2 = document.getElementById("operation_user_tagger_wait_ok");
    // 获取包含"确定"文本的按钮元素
    var confirmButton2 = topDiv2.querySelector(".l-btn-text");
    // 模拟点击确认按钮
    confirmButton2.click();
    console.log("[INFO] 加入公会完成");
  } else {
    console.log("[INFO] 没有最新的待处理");
  }

  console.log("[INFO] 停止监听DOM变化");
  observer.disconnect(); // 停止监听DOM变化
}, 2000);
