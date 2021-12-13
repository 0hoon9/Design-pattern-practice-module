class Decorator {
  constructor() {
    this.init();
  }

  init() {
    (function () {
      // 생성자, 프로토타입 메서드
      function Car(name) {
          this.name = name;
          this.price = 0;
          this.parts = [];
      }
  
      Car.prototype = {
          showPrice: function () {
              console.log(this.name + ' $' + this.price);
          },
          showParts: function () {
              let string = `=== Parts of ${this.name} === \n`,
                  length = this.parts.length;
              for (let i = 0; i < length; i++) {
                  string += this.parts[i].name + ': $' + this.parts[i].price + '\n';
              }
              console.log(string + '\n> Total: $' + this.price);
          },
          decorate: function (part) {
              this.price += part.price;
              this.parts.push(part);
          }
      };
  
      // Deco class 생성
      function CarDecorator() {
          this.decorateParts = {};
      }
  
      CarDecorator.prototype.decorateCar = function (car, partName) {
          if (this.decorateParts.hasOwnProperty(partName)) {
              car.decorate(this.decorateParts[partName]);
              console.log('Add option ' + partName + ' to ' + car.name);
          }
          return car;
      }
  
      CarDecorator.prototype.addOption = function (partName, price) {
          this.decorateParts[partName] = {
              name: partName,
              price: price
          }
      }
  
      let carDecorator = new CarDecorator();
      carDecorator.addOption('Normal engine', 300);
      carDecorator.addOption('Booster engine', 2000);
      carDecorator.addOption('Normal wheel', 100);
      carDecorator.addOption('Fast wheel', 500);
  
      console.log('My car');
      let myCar = new Car('My car');
      myCar = carDecorator.decorateCar(myCar, 'Normal engine');
      myCar = carDecorator.decorateCar(myCar, 'Normal wheel');
      myCar.showPrice();
      myCar.showParts();
  
      console.log('Super car');
      let superCar = new Car('Super car');
      carDecorator.decorateCar(superCar, 'Booster engine');
      carDecorator.decorateCar(superCar, 'Fast wheel');
      superCar.showPrice();
      superCar.showParts();
    })();
  }
}

export default Decorator;