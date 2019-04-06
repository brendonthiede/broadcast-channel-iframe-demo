# Broadcast Channel Demo

You can try this demo out at [http://www.digestibledevops.com/broadcast-channel-iframe-demo/](http://www.digestibledevops.com/broadcast-channel-iframe-demo/)

This is a simple example of using the [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API), currently available in Chrome and Firefox. This API uses [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) behind the scenes, and can allow communication between different windows, tabs, frames, and iframes with the same origin, something that typically would have been done through AJAX requests in the past.

## Basic Usage

To join a broadcast channel, you need to know the name of the channel (in this demo, `crossFrameCommunication`) so you can create a reference to it like this:

```javascript
const broadcastChannel = new BroadcastChannel('crossFrameCommunication');
```

From this point you can start posting and receiving messages.

To post a message, just call the `postMessage` method on the BroadcastChannel object and pass in any object (JSON, DOMString, etc.). Here's an example of passing in a JSON value:

```javascript
broadcastChannel.postMessage({
    user: 'brendon',
    product: 'banana',
    quantity: 8
});
```

To receive messages, add a listener for the `onmessage` event. When you respond to the event, the message will be in the `data` property of the event. Here a simple listener:

```javascript
broadcastChannel.onmessage = function (event) {
    console.log(`${event.data.user} wants to buy ${event.data.quantity} ${event.data.product}`);
};
```

It's important to keep in mind that any messages posted by an instance (window, tab, frame, or iframe) will not trigger its own `onmessage` event.

## Things to Keep in Mind

First and foremost, this API only works with the same origin, so for different origins (different domain, a sub-domain, etc.), the Broadcast Channel API won't work.

The example I created is obviously very contrived, but I found it to be a simple way of showing the power of this API. That said, the way that I created this example has what are essentially four different web pages, three being loaded into a fourth, and as such, their resources are completely separate, meaning that, for example, the `main.css` is downloaded four times, since each page references it. If you want to have more control over shared resources, you should look into the [SharedWorker API](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker), where you can have a lot more control.

The reason I found this API in the first place was that I wanted to synchronize multiple windows of the same thing, in particular, a Reveal.js presentation, for which I found the Broadcast Channel API to be very effective. You can see a post I made about it here: [Presenter Mode for Reveal.js](https://www.digestibledevops.com/devops/2019/04/02/revealjs-presenter-remote.html)