'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-deprecated-slot-attribute.js')

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2015
  }
})

tester.run('no-deprecated-slot-attribute', rule, {
  valid: [
    `<template>
      <LinkList>
        <a v-slot:name />
      </LinkList>
    </template>`,
    `<template>
      <LinkList>
        <a #name />
      </LinkList>
    </template>`,
    `<template>
      <LinkList>
        <a v-slot="{a}" />
      </LinkList>
    </template>`,
    `<template>
      <LinkList>
        <a #default="{a}" />
      </LinkList>
    </template>`,
    `<template>
      <LinkList>
        <a />
      </LinkList>
    </template>`
  ],
  invalid: [
    {
      code: `
      <template>
        <LinkList>
          <a slot />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a v-slot />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a slot="name" />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a v-slot:name />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a slot="name" disabled slot-scope="{a}"/>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a v-slot:name="{a}" disabled />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template slot="name" scope="{a}">
            <a />
          </template>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot:name="{a}" >
            <a />
          </template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`slot` are forbidden.',
          line: 4
        }
      ]
    }
  ]
})
