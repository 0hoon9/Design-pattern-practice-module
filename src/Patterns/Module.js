class Module {
  constructor() {
    this.init();
  }

  init() {
    // 클로저를 이용한 모듈 패턴

    // 독립된 모듈을 사용하는 것을 모듈 패턴이라한다.
    // 독립된 모듈은 내부 변수 및 함수를 전부 갖고 있어야 한다.
    // 내부 멤버에 접근하지 못하게 클로저를 이용한다.
    let module = (function () {
      // private 멤버 정의
      let privateValue = 0;

      function privateMethod() {
        return privateValue++;
      }

      return {
        publcValue: privateValue,
        publicMethod: function () {
          return privateMethod();
        }
      }
    })();

    console.log(module.publicMethod()); // 1
    console.log(module.publicMethod()); // 2
    console.log(module.publcValue); // 접근가능
    console.log(module.privateValue); // 내부멤버 접근 불가
  }
}

export default Module;