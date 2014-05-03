"use strict";
describe("vendors tests", function () {
  describe("V8 es6 test", function () {
    let vm = require('vm');
    let fs = require('fs');
    let Path = require('path');
    it("V8 promise tests", function (done) {
      function assertAsync(b, s) {
        if (b) {
          console.log(s, "SUCCESS");
        } else {
          var e = new Error(s);
          done(e);
          throw e;
        }
        ctx.asyncAssertsExpected--;
      }
      function assertAsyncRan() {
        ctx.asyncAssertsExpected++;
      }
      let ctx = vm.createContext({
        Promise: require('../lib'),
        assertAsync: assertAsync,
        assertAsyncRan: assertAsyncRan
      });

      /* some mocks */
      function assertAsyncRanMock() {
        ctx.assertAsyncRan = assertAsyncRan;
      }
      ctx.Promise.prototype.chain = function mock_chain() { ctx.assertAsyncRan = assertAsyncRanMock; return this; };
      ctx.Promise.race = function mock_race() { ctx.assertAsyncRan = assertAsyncRanMock; return new ctx.Promise; };
      /* end mocks */

      let msjFilename = Path.join(__dirname, 'fromv8', 'mjsunit.js');
      vm.runInContext(fs.readFileSync(msjFilename), ctx, {filename: msjFilename});
      let prmsFilename = Path.join(__dirname, 'fromv8', 'promises.js');
      vm.runInContext(fs.readFileSync(prmsFilename), ctx, {filename: prmsFilename});
    });
  });


//  describe.skip("run A+ suite", function () {
//    let aplus = require('promises-aplus-tests');
//    let Promise = require('../lib');
//    aplus.mocha({
//      fulfilled: Promise.fulfilled.bind(Promise),
//      resolved: Promise.fulfilled.bind(Promise),
//      rejected: Promise.rejected.bind(Promise),
//      deferred: Promise.deferred.bind(Promise)
//    });
//  });
});
