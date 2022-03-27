console.log("hello, im import");

// import { mul } from "./test";

document.getElementById("box1").onclick(() => {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */ "./test").then(
    ({ mul }) => {
      mul(1, 4);
    }
  );
});
