class Observer {
  constructor() {
    this.init();
  }

  init() {
    (function() {
      let observer = {
        handlers: {},
        bindEvent: function(eventName, handler, context) {
          let handlerArray = this.handlers[eventName];

          if (handlerArray === undefined) handlerArray = this.handlers[eventName] = [];
          handlerArray.push({ handler, context });
        },
        unbindEvent: function(eventName, handler, context) {
          let handlerArray = this.handlers[eventName];
          if (handlerArray === undefined) return;

          for (let i = 0; i < handlerArray.length; i++) {
            let currentHandler = handlerArray[i];

            if (handler === currentHandler['handler'] && context === currentHandler['context']) {
              handlerArray.splice(idx, 1); // 찾을 경우 배열에서 삭제.
              return;
            }
          }
        },
        run: function(eventName, data) {
          let handlerArray = this.handlers[eventName];
          if (handlerArray === undefined) return;

          for (let i = 0; i < handlerArray.length; i++) {
            let currentHandler = handlerArray[i];
            currentHandler['handler'].call(currentHandler['context'], data); // 등록된 핸들러 호출. this는 등록된 context로 바인딩.
          }
        }
      }
      global.observer = observer;
  })();
  
  (function() {
    let Person = function() {};

    let ceo = new Person();
    let manager = new Person();
    let parttimer = new Person();

    ceo.speak = function(comment) {
      console.log(comment);
      observer.run('ceoSpeak', comment);
    }

    manager.listen = function(comment) {
      console.log('manager listen..');
      this.ceoComment = comment;
    }
    observer.bindEvent('ceoSpeak', manager.listen, manager);

    parttimer.ignore = function(comment) {
      console.log('parttimer ignore..');
      return comment;
    }
    observer.bindEvent('ceoSpeak', parttimer.ignore, parttimer);

    ceo.speak('ceo: Just do it!');

    console.log('ceo: Hey Manager what did I say?')
    console.log('manager: You say ' + manager.ceoComment);
    console.log('ceo: Hey Part-timer what did I say?')
    console.log('parttimer: You say ' + parttimer.ceoComment);
  })();
  }
}

export default Observer;