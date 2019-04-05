const broadcastChannel = new BroadcastChannel('crossFrameCommunication');

const setContent = (label) => {
    const contentClass = label.toLowerCase().replace(/[ ]/g, '-');
    postMessage('nav', contentClass);
    postMessage('label', label);
};

const setFrameReady = (frameName) => {
    postMessage('frameReady', frameName);
};

const postMessage = (type, body) => {
    broadcastChannel.postMessage({
        type: type,
        body: body
    });
};

broadcastChannel.onmessage = function (event) {
    const messages = document.getElementById('messages');
    if (messages) {
        const newMessage = document.createElement('DIV');
        newMessage.innerHTML = `<pre>${JSON.stringify(event.data, null, "  ")}</pre>`;
        messages.appendChild(newMessage);
    }

    if (event.data.type === 'nav') {
        document.querySelectorAll('.content>div').forEach(element => {
            if (element.classList.contains(event.data.body)) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
    }

    if (event.data.type === 'label') {
        document.querySelectorAll('.label').forEach(element => {
            element.innerHTML = event.data.body;
        });
    }
};
