import * as fs from 'fs';

export interface TestFailure {
  testName: string;
  errorMessage: string;
  filePath: string;
}

export function parseFailures(): TestFailure[] {
  const raw = fs.readFileSync('test-results/results.json', 'utf-8');
  const results = JSON.parse(raw);
  const failures: TestFailure[] = [];

  for (const suite of results.suites) {
    for (const spec of suite.specs) {
      for (const test of spec.tests) {
        for (const result of test.results) {
          if (result.status === 'failed') {
            failures.push({
              testName: spec.title,
              errorMessage: result.error?.message || 'Unknown error',
              filePath: suite.file,
            });
          }
        }
      }
    }
  }

  return failures;
}