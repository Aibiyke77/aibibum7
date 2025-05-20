const socket = io();

function sendInvite() {
    const from = document.getElementById("username").value.trim();
    const to = document.getElementById("to_user").value.trim();
    if (!from || !to) {
        alert("Введите имя и кому отправляете");
        return;
    }
    const sipMessage = `INVITE sip:${to}@sip.local SIP/2.0\nFrom: ${from}\nTo: ${to}`;
    socket.emit("sip_message", sipMessage);
}

function sendMessage() {
    const from = document.getElementById("username").value.trim();
    const text = document.getElementById("message").value.trim();
    if (!from || !text) {
        alert("Введите имя и сообщение");
        return;
    }
    const sipMessage = `MESSAGE sip:* SIP/2.0\nFrom: ${from}\nBody: ${text}`;
    socket.emit("sip_message", sipMessage);
    document.getElementById("message").value = "";
}

socket.on("sip_message", function(data) {
    const chat = document.getElementById("chat");
    chat.innerHTML += data + "\n\n";
    chat.scrollTop = chat.scrollHeight;
});
