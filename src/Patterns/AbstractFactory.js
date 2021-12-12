class AbstractFactory{
  constructor() {
    this.init();
  }

  init() {
    class Theater {
      constructor(name) {
        this.name = name;
      }
      chooseMovie() {
        console.log(this.name + " 상영 영화 선택");
      }
  
      chooseSeat() {
        console.log(this.name + " 영화 좌석 선택");
      }
  
      reservation() {
        console.log(this.name + " 12시 예매");
      }
    }
    
    class CGV extends Theater {
        constructor() {
          super('CGV');
        }
    }
    
    class Lotte extends Theater {
        constructor() {
          super('롯데시네마');
        }
    }
    
    class MegaBox extends Theater {
        constructor() {
          super('메가박스');
        }
    }
    
    // Before
    (function () {
        function chooseTheater(name) {
          let theater;
  
          if (name === 'CGV') theater = new CGV();
          else if (name === 'Lotte') theater = new Lotte();
          else if (name === 'MegaBox') theater = new MegaBox();
  
          theater.chooseMovie();
          theater.chooseSeat();
          theater.reservation();
  
          return theater;
        }
        chooseTheater('CGV');
        // chooseTheater('Lotte');
        // chooseTheater('MegaBox');
    })();
    // 새로운 영화관이 추가되는 경우 if문이 계속 추가된다.
    // chooseTheater 함수의 내용이 계속 추가된다.
    
    // After1
    (function () {
        function chooseTheater(name) {
          let theater = TheaterFactory(name);
  
          theater.chooseMovie();
          theater.chooseSeat();
          theater.reservation();
  
          return theater;
        }
    
        // 영화관 이름을 넘겨 인스턴스를 만든다.
        function TheaterFactory(name) {
          let theater;
  
          if (name === 'CGV') theater = new CGV();
          else if (name === 'Lotte') theater = new Lotte();
          else if (name === 'MegaBox') theater = new MegaBox();
  
          return theater;
        }
        // chooseTheater('CGV');
        chooseTheater('Lotte');
        // chooseTheater('MegaBox');
    })();

    // chooseTheater 함수를 더 이상 고칠 필요가 없다.
    // 하지만, if문이 계속 추가되는 것은 해결 되지 않았다.
    // After2

    (function () {
      // 인스턴스를 만드는 행위를 추상화 한다.
      // 추상 팩토리는 인스턴스 생성을 서브클래스에 위임, 의존성을 낮춘다.
      class TheaterFactory {
        static createTheater(factory) {
          return factory.createTheater();
        }
      }

      class CGVFactory {
        static createTheater() {
          return new CGV;
        }
      }
  
      class LotteFactory {
        static createTheater() {
          return new Lotte;
        }
      }
  
      class MegaBoxFactory {
        static createTheater() {
          return new MegaBox;
        }
      }
  
      function chooseTheater(factory) {
        let theater = TheaterFactory.createTheater(factory);

        theater.chooseMovie();
        theater.chooseSeat();
        theater.reservation();

        return theater;
      }
      // chooseTheater(CGVFactory);
      // chooseTheater(LotteFactory);
      chooseTheater(MegaBoxFactory);
    })();
  }
}

export default AbstractFactory;