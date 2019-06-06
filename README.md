# simple-benchmarking

A module for executing simple banchmarks for synchronous and asynchronous functions (a.k.a. promises). Please note
that this should not be used for benchmarking production code. It is rather a good indicator how long certain
functions take in order to improve them in terms of execution time.

## Installation

    npm i simple-benchmarking

## Usage

```javascript
const benchmark = require('simple-benchmarking');
const database = require('...');

const execute = async () => {
  await benchmark.executeSuite({
    'no arguments': {
      method: database.methodToTest()
    },

    'string argument': {
      method: database.methodToTest('random string')
    },

    'async method': {
      method: database.asyncMethodToTest()
    }
  }, {
    sort: true,
    rounds: 10000,
    name: 'Test Suite 01'
  });
};

execute();
```

This produces the following output:

     Executing test suite 'Test Suite 01'
     Total execution time of test suite: 2s 173.722738ms
     
     1.
     
     Executed test case: 'Test Suite 01: no arguments' in 10000 rounds
     Total execution time: 0s 569.54721ms
     Average execution time: 0s 0.0222592254ms
     
     2.
     
     Executed test case: 'Test Suite 01: string argument' in 10000 rounds
     Total execution time: 0s 464.078701ms
     Average execution time: 0s 0.0180299286ms
     
     3.
     
     Executed test case: 'Test Suite 01: async method' in 10000 rounds
     Total execution time: 0s 576.484552ms
     Average execution time: 0s 0.014925605299999999ms


## License

Copyright 2019 appcom interactive GmbH

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
