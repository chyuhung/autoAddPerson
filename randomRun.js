function getRandomTime() {
  return Math.floor(Math.random() * (30000 - 5000 + 1) + 5000);
}

function refreshAndCheck() {
  console.log("[INFO]", new Date().toLocaleString(), "点击刷新按钮");
  var confirmButton = document.getElementById(
    "operation_user_tagger_search_btn_search"
  );
  confirmButton.click();

  setTimeout(function () {
    console.log(
      "[INFO]",
      new Date().toLocaleString(),
      "开始检查页面中的待处理和处理中元素"
    );
    var waitElements = document.querySelectorAll('a[onclick*="waitFunction("]');
    var descElements = document.querySelectorAll('a[onclick*="descFunction("]');

    var maxParam = -Infinity;
    var maxElement = null;

    for (var i = 0; i < waitElements.length; i++) {
      var element = waitElements[i];
      var onclickValue = element.getAttribute("onclick");
      var firstParam = parseInt(onclickValue.match(/\((\d+)/)[1]);

      if (firstParam >= maxParam) {
        maxParam = firstParam;
        maxElement = element;
      }
    }

    for (var i = 0; i < descElements.length; i++) {
      var element = descElements[i];
      var onclickValue = element.getAttribute("onclick");
      var firstParam = parseInt(onclickValue.match(/\((\d+)/)[1]);

      if (firstParam >= maxParam) {
        maxElement = null;
        break;
      }
    }

    if (maxElement) {
      console.log("[INFO]", new Date().toLocaleString(), "发现待处理");
      console.log(
        "[INFO]",
        new Date().toLocaleString(),
        "待处理元素内容:",
        maxElement.getAttribute("onclick")
      );

      console.log(
        "[INFO]",
        new Date().toLocaleString(),
        "检查详细信息，综合判断"
      );
      var parentElement = maxElement.parentElement.parentElement.parentElement;
      var nextParentElement =
        parentElement.nextElementSibling.children[0].children[0].children[0];

      var divText = nextParentElement.textContent.trim();
      var splitText = divText.split("|");

      var ageText = splitText[1].trim();
      var age = ageText.split(":")[1].trim();

      var ReferralPersonText = splitText[9].trim();
      var ReferralPersonID = ReferralPersonText.split(":")[1].trim();

      var ReferralGuildText = splitText[10].trim();
      var ReferralGuildID = ReferralGuildText.split(":")[1].trim();

      var personOK = false;
      if (age > 20 && ReferralPersonID != "null" && ReferralGuildID != "null") {
        personOK = true;
      }

      if (personOK) {
        console.log("[INFO]", new Date().toLocaleString(), "条件不满足");
        return;
      }

      console.log("[INFO]", new Date().toLocaleString(), "点击待处理");
      eval(maxElement.getAttribute("onclick"));

      console.log("[INFO]", new Date().toLocaleString(), "点击确认按钮");
      var topDiv = document.querySelector(".panel-htop.messager-window");
      var confirmButton2 = topDiv.querySelector(".l-btn-text");
      confirmButton2.click();

      console.log(
        "[INFO]",
        new Date().toLocaleString(),
        "点击确认加入公会按钮"
      );
      var topDiv2 = document.getElementById("operation_user_tagger_wait_ok");
      var confirmButton2 = topDiv2.querySelector(".l-btn-text");
      confirmButton2.click();
      console.log("[INFO]", new Date().toLocaleString(), "加入公会完成");
    } else {
      console.log("[INFO]", new Date().toLocaleString(), "没有最新的待处理");
    }

    setTimeout(refreshAndCheck, getRandomTime());
  }, 2000);
}

refreshAndCheck();
