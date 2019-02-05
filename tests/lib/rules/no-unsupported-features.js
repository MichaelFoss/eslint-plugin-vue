'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-unsupported-features')

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2019
  }
})

const testcases = [require('./no-unsupported-features/v-slot')]

for (const testcase of testcases) {
  testcase.valid = testcase.valid.map(t => Object.assign({ options: testcase.options }, typeof t === 'string' ? { code: t } : t))
  testcase.invalid = testcase.invalid.map(t => Object.assign({ options: testcase.options }, typeof t === 'string' ? { code: t } : t))
}

const valid = testcases.reduce((r, testcase) => [...r, ...testcase.valid], [])
const invalid = testcases.reduce((r, testcase) => [...r, ...testcase.invalid], [])

tester.run('no-unsupported-features', rule, {
  valid,
  invalid
})
