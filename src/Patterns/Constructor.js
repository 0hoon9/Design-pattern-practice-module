
class Constructor {
  constructor() {
    this.init();
  }

  init() {
    // Before
    (function () {
      function User(name, age) {
        this.name = name;
        this.age = age;
        this.getInfo = function () {
          console.log(this.name);
          console.log(this.age)
        };
      }

      // 인스턴스를 쉽게 식별할 수 있지만, 인스턴스마다 동일한 메서드가 생성돼 메모리가 낭비된다.
      let user1 = new User("Marteen", 17);
      let user2 = new User("Peter", 23);
      let user3 = new User("Lay", 30);

      user1.getInfo();
      user2.getInfo();
      user3.getInfo();
    })();

    // 위 메모리 낭비의 문제점을 프로토타입 패턴을 조합해 해결할 수 있다.
    // After
    (function () {
      function User(name, age) {
          this.name = name;
          this.age = age;
      }

      // 프로토타입의 프로퍼티와 메서드는 객체 인스턴스 전체에서 공유된다.
      User.prototype = {
          constructor: User,
          getInfo: function () {
              console.log(this.name);
              console.log(this.age);
          }
      }

      let user1 = new User("Marteen", 17);
      let user2 = new User("Peter", 23);
      let user3 = new User("Lay", 30);

      user1.getInfo();
      user2.getInfo();
      user3.getInfo();
    })();
  }
}

export default Constructor;