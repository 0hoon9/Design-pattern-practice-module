// 단 하나의 인스턴스를 생성해 사용하는 패턴.

class Singleton {
  constructor() {
    this.init();
  }

  init() {
    // 모든 속성이 공개됨
    var obj = {
      string: 'hello',
      func: function() {
          console.log('hello')
      }
    };

    // 모든 속성 비공개(즉시 실행 함수를 이용함)
    let singleton = (function () {
      let instance;
      let property = 'singleton';

      function init() {
          return {
              property: property,
              func: function () {
                  console.log(property);
              }
          }
      }

      return {
          getInstance: function () {
              //인스턴스 초기화가 안됐다면 새로 생성
              if (!instance) {
                  instance = init();
              }
              //이미 인스턴스를 초기화한적이 있다면 해당 인스턴스를 리턴
              console.log(instance)
              return instance;
          }
      }
    })();

    let singleton1 = singleton.getInstance();
    let singleton2 = singleton.getInstance();
    console.log(singleton1 === singleton2); //true
  }
}

export default Singleton;