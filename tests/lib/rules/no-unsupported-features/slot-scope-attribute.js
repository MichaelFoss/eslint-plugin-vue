'use strict'

module.exports = {
  options: [{ version: '<2.5.0' }],
  valid: [
    {
      code: `
      <template>
        <LinkList>
          <a slot-scope="{a}" />
        </LinkList>
      </template>`,
      options: [{ version: '^2.5.0' }]
    },
    `<template>
      <LinkList>
        <a slot=name />
      </LinkList>
    </template>`,
    `<template>
      <LinkList>
        <a v-slot="{a}" />
      </LinkList>
    </template>`,
    {
      code: `
      <template>
        <LinkList>
          <a slot-scope="{a}" />
        </LinkList>
      </template>`,
      options: [{ version: '<2.5.0', ignores: ['slot-scope-attribute'] }]
    }
  ],
  invalid: [
    {
      code: `
      <template>
        <LinkList>
          <a slot-scope />
        </LinkList>
      </template>`,
      output: null,
      errors: [
        {
          message: '`slot-scope` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a slot-scope="{a}" />
        </LinkList>
      </template>`,
      output: null,
      errors: [
        {
          message: '`slot-scope` are forbidden.',
          line: 4
        }
      ]
    }
  ]
}
