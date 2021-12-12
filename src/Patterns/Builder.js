class Builder {
  constructor() {
    this.init();
  }

  init() {
     // Before
    (function () {
      class Request{
        constructor(url, method, data) {
          this.url = url;
          this.method = method;
          this.data = data;
        }
      }

      let getRequest = new Request('https://sample.com', 'GET', null);
      let postRequest = new Request('https://sample.com', 'POST', {
          id: 'rosenari',
          password: '1234'
      });
    })();

    // 위와 같은 경우 생성자 인자로 어떤 데이터를 전달해야 할지 명시적이지 않다.
    // data가 없을 때에도 null을 명시적으로 넘겨줘야 한다.


    // After
    (function () {
      class Request {
        constructor() {
            this.url = '';
            this.method = '';
            this.data = null;
        }
      }

      class Builder {
        constructor() {
            this.request = new Request();
        }
        // this를 리턴해 체이닝이 가능하도록 한다.
        // this는 builder 객체를 가르켜 리턴된 this를 통해 메서드 호출이 가능하다.
        setUrl(url) {
            this.request.url = url;
            return this;
        }

        setMethod(func) {
            this.request.method = func;
            return this;
        }

        setData(data) {
            this.request.data = data;
            return this;
        }

        // 마지막 build 메서드를 호출하여 초기화가 완료된 request 객체를 리턴한다. 
        build() {
            return this.request;
        }
      }

      let getRequest = new Builder()
          .setUrl('https://sample.com')
          .setMethod('GET')
          .build();

      let postRequest = new Builder()
          .setUrl('https://sample.com')
          .setMethod('POST')
          .setData({
              id: 'user',
              password: '1234'
          })
          .build();

      console.log(getRequest);
      console.log(postRequest);
    })();
  }
}

export default Builder;