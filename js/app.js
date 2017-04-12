/**
 * Created by anton on 12.04.17.
 */


// HTML5 Notification
function sendNotification(title, options) {
    // Проверим, поддерживает ли браузер HTML5 Notifications
    if (!("Notification" in window)) {
        alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
    }

    // Проверим, есть ли права на отправку уведомлений
    else if (Notification.permission === "granted") {
        // Если права есть, отправим уведомление
        var notification = new Notification(title, options);
        notification.onclick = clickFunc;
        setTimeout(notification.close.bind(notification), 5000);
    }

    // Если прав нет, пытаемся их получить
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // Если права успешно получены, отправляем уведомление
            if (permission === "granted") {
                var notification = new Notification(title, options);
            } else {
                // Юзер отклонил наш запрос на показ уведомлений
                alert('Вы запретили показывать уведомления');
            }
        });
    } else {
        // Пользователь ранее отклонил наш запрос на показ уведомлений
        // В этом месте мы можем, но не будем его беспокоить. Уважайте решения своих пользователей.
    }
}

function clickFunc() {
    //alert('Нажата кнопка во всплывающем окне');

    // Open Blank window
    var myWindow = window.open("", "newWindow", "toolbar=no,scrollbars=no,resizable=no,top=500,left=500,width=400,height=400");
    myWindow.document.write("<p>This is 'newWindow' that was appeared after click.</p>");

    // Goto URL
    //window.open("https://www.w3schools.com", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");

}

function test() {
    sendNotification('Верните Линуса!', {
        body: 'Тестирование HTML5 Notifications',
        //icon: 'icon.jpg',
        dir: 'auto'
    });
}

// WebSocket client
function WebSocketTest() {
    // URL подключения к WebSocket
    var wsURL = "ws://localhost:8080/ws";

    // Проверка поддержки технологии
    if ("WebSocket" in window) {
        // Открываем подключение к сокету
        var ws = new WebSocket(wsURL);

        // Подключился к серверу
        ws.onopen = function() {
            sendNotification('Подключение к ws установлено!', {
                body: 'Подключен к ' + wsURL,
                dir: 'auto'
            });
            // Отправка данных через send
            //ws.send("Message to send");
        };

        // Отключился от сервера
        ws.onclose = function() {
            sendNotification('Отключен от ws!', {
                body: 'Отключился ' + wsURL,
                dir: 'auto'
            });
        };

        // Отключился от сервера
        ws.onerror = function() {
            sendNotification('Ошибка ws!', {
                body: 'Ошибка в работе сокета',
                dir: 'auto'
            });
        };

        // Получил сообщение от сервера
        ws.onmessage = function (receivedEvent) {
            var msg = JSON.parse(receivedEvent.data);
            sendNotification(msg.Event, {
                body: 'Абонент ' + msg.Params.code + ' | Клиент ' + msg.Params.phone,
                dir: 'auto'
            });
        };
    } else {
        sendNotification('WebSocket не поддерживается', {
            body: 'Ваш браузер не поддерживает WebSocket!',
            dir: 'auto'
        });
    }
}

window.onload = function () {
    sendNotification('Проверка нотификаций', {
        body: 'Работают',
        //icon: 'icon.jpg',
        dir: 'auto'
    });
    WebSocketTest();
};

/*
onmessage = function(event) {
    var f = document.getElementById("chatbox").contentDocument;
    var text = "";
    var msg = JSON.parse(event.data);
    var time = new Date(msg.date);
    var timeStr = time.toLocaleTimeString();

    switch(msg.type) {
        case "id":
            clientID = msg.id;
            setUsername();
            break;
        case "username":
            text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
            break;
        case "message":
            text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
            break;
        case "rejectusername":
            text = "<b>Your username has been set to <em>" + msg.name + "</em> because the name you chose is in use.</b><br>"
            break;
        case "userlist":
            var ul = "";
            for (i=0; i < msg.users.length; i++) {
                ul += msg.users[i] + "<br>";
            }
            document.getElementById("userlistbox").innerHTML = ul;
            break;
    }

*/