class Iterator {
  constructor() {
    this.init();
  }

  init() {
    // 개념 정리
    // iterable: iterator를 리턴하는 [Symbol.iterator]() 를 가진 값.
    // iterator: {value: any, done:boolean} 객체를 리턴하는 next() 메서드를 가진 객체.
    // iterable/iterator protocol: iterable을 for...of, 전개 연산자 등과 함께 동작하도록 한 규약.
    // Array, Map, Set과 같은 리스트 데이터들은 기본적으로 Iterable이다.
    // iterable은 for...of 나 spread 연산같은 순회작업이 가능하다.

    // Array
    (function () {
      const arr = [1, 2, 3];

      for (const i of arr) {
        console.log(i);
      }

      const Iterator = arr[Symbol.iterator]();
      console.log('array =>', Iterator.next()); // array => {value: 1, done: false}
      console.log('array =>', Iterator.next()); // array => {value: 2, done: false}
      console.log('array =>', Iterator.next()); // array => {value: 3, done: false}
      console.log('array =>', Iterator.next()); // array => {value: undefined, done: true}
      console.log('end of arr \n ======================================');
    })();

    // Map
    (function () {
      const map = new Map([[0, 1], [1, 2], [2, 3]]);
      const Iterator = map[Symbol.iterator]();

      for (const i of Iterator) {
        console.log(i);
      }
      console.log(Iterator.next()); // {value: undefined, done: true}
    })();

    // Set
    (function () {
      const set = new Set([1, 2, 3]);

      const Iterator = set[Symbol.iterator]();
      for (const i of Iterator) {
        console.log(i);
      }
      console.log(Iterator.next()); // {value: undefined, done: true}
    })();


    // Custom
    (function () {
      const iterable = {
        [Symbol.iterator]() {
          let i = 3;
          return {
            next() {
              return i === 0 ? { value : undefined, done: true } : { value: i--, done: false };
            },
            [Symbol.iterator]() {
              // 자기자신 iterator를 반환. iterator이자, iterable이다.
              return this;
            }
          }
        }
      }

      for (const item of iterable) {
        console.log(item);
      }

      const iterator = iterable[Symbol.iterator]();
      console.log(iterator.next());

      for (const i of iterator) { // 여기서 iterator는 iterator({ value: ture || false } + next()) 이며, Iterable이다.
        console.log(i);
      }
    })();

    // Generator
    (function () {
      // Generator란 iterator이면서 iterable한 값을 반환하는 함수이다.
      // 함수명 앞에 *를 붙여 선언. arrow function 에서는 사용하지 못한다.
      // yield 명령어를 이용해서 순회시킬 데이터를 결정한다.

      function *gen() {
        yield 1;
        if (false) yield 2;
        yield 3;
        return 99; // optional. 마지막에 출력(순회할 때에는 return 값을 가지지 않는다). {value : 99, done : true}
      }

      const iter = gen();
      console.log(iter[Symbol.iterator]() === iter); // true

      for (const a of gen()) {
        console.log(a); // 1,3
      }
    })();

    (function () {
      function *infinity(i = 0) {
        while (true) yield i++;
      }

      function *limit(l, iter) {
          for (const a of iter) {
            yield a;
            if (a === l) return;
          }
      }

      function *combine(value) {
          for (const a of limit(value, infinity(1))) {
            if (a % 2) yield a;
          }
      }

      for (const a of combine(10)) {
        console.log('->', a); // 1 3 5 7 9
      }

      console.log([...combine(10), ...combine(20)]); // [1, 3, 5, 7, 9, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    })();
  }
}

export default Iterator;