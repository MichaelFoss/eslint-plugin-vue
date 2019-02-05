'use strict'

module.exports = {
  options: [{ version: '~2.5.0' }],
  valid: [
    {
      code: `
      <template>
        <LinkList>
          <a v-slot:name />
        </LinkList>
      </template>`,
      options: [{ version: '^2.6.0' }]
    },
    `<template>
      <LinkList>
        <a slot=name />
      </LinkList>
    </template>`,
    `<template>
      <LinkList>
        <a slot-scope="{a}" />
      </LinkList>
    </template>`,
    {
      code: `
      <template>
        <LinkList>
          <a v-slot:name />
        </LinkList>
      </template>`,
      options: [{ version: '~2.5.0', ignores: ['v-slot'] }]
    },
    {
      code: `
      <template>
        <LinkList>
          <a />
        </LinkList>
      </template>`,
      options: [{ version: '*' }]
    }
  ],
  invalid: [
    {
      code: `
      <template>
        <LinkList>
          <a v-slot />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a slot />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a #default />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a slot="default" />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a v-slot:name />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a slot="name" />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a #name />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a slot="name" />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a v-slot="{a}" />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a slot-scope="{a}" />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a #default="{a}" />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a slot="default" slot-scope="{a}" />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a v-slot:name="{a}" />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a slot="name" slot-scope="{a}" />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a #name="{a}" />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a slot="name" slot-scope="{a}" />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a v-slot:name />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a slot="name" />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <a v-slot="{a}" />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a slot-scope="{a}" />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },
    // syntax error
    {
      code: `
      <template>
        <LinkList>
          <a v-slot:name="{" />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a slot="name" slot-scope="{" />
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },

    // unknown modifiers
    {
      code: `
      <template>
        <LinkList>
          <a v-slot.mod="{a}" />
        </LinkList>
      </template>`,
      output: null,
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    }
  ]
}
