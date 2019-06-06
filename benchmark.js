/**
 * Created by appcom interactive GmbH on 03.06.2019
 * Copyright © 2019 appcom interactive GmbH. All rights reserved.
 */

const lodash = require('lodash');
const asyncQ = require('async-q');

class Benchmark {
  static async executeSuite(testCases, args) {
    console.info(`Executing test suite '${args.name}'`);

    const testCaseNames = lodash.keys(testCases);
    const startTime = process.hrtime();

    let processes = await asyncQ.eachSeries(testCaseNames.map(name => ({
      method: testCases[name].method,
      rounds: testCases[name].rounds || args.rounds,
      name: `${args.name || 'Unamed suite'}: ${name}`
    })), Benchmark.execute);

    const endTime = process.hrtime(startTime);
    Benchmark.displayExecutionTime(endTime, 'Total execution time of test suite');
    console.info('');

    if (args.sort) {
      processes = lodash.sortBy(processes, ['average', 'total', 'name']).reverse();
    }

    Benchmark.displayExecutionTimeObjects(processes);
  }

  static displayExecutionTimeObjects(processes) {
    processes.forEach((proc, index) => {
      console.info(`${index + 1}.\n`);
      console.info(`Executed test case: '${proc.name}' in ${proc.rounds} rounds`);
      Benchmark.displayExecutionTime(proc.total, 'Total execution time');
      Benchmark.displayExecutionTime(proc.average, 'Average execution time');
      console.info('');
    });
  }

  static async execute({ method, name = '', rounds = 100000 } = {}) { // eslint-disable-line
    const startTime = process.hrtime();

    const array = lodash.times(rounds, () => method);
    const executionTimes = await asyncQ.eachSeries(array, Benchmark.measureExecution);

    const endTime = process.hrtime(startTime);

    return {
      name,
      rounds,
      total: endTime,
      average: Benchmark.calculateAverageExecutionTime(executionTimes)
    };
  }

  static async measureExecution(method) {
    const startTime = process.hrtime();
    try {
      (await method);
    } catch (error) { // eslint-disable-line
    }
    return process.hrtime(startTime);
  }

  static displayExecutionTime(time, title = 'Execution time:') {
    console.info(`${title}: ${time[0]}s ${(time[1] / 1000000)}ms`);
  }

  static calculateAverageExecutionTime(executionTimesArray) {
    if (executionTimesArray.length === 0) {
      return 0;
    }

    const result = executionTimesArray.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]);
    const totalElapsedTime = result[0] + (result[1] / 1000000000);
    const averageElapsedTime = totalElapsedTime / executionTimesArray.length;

    return [Math.trunc(averageElapsedTime), (averageElapsedTime - Math.floor(averageElapsedTime)) * 1000000000];
  }
}

module.exports = Benchmark;
