'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/slot-syntax.js')

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2015
  }
})

tester.run('slot-syntax', rule, {
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
        <a slot="name" />
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
          <template scope="{a}">
            <a />
          </template>
        </LinkList>
      </template>`,
      options: [
        {
          'v-slot': false,
          slot: true,
          'slot-scope': false,
          scope: true
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template v-slot="{a}">
            <a />
          </template>
        </LinkList>
      </template>`,
      options: [
        {
          'v-slot': true,
          slot: false,
          'slot-scope': false,
          scope: false
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template slot="name">
            <a />
          </template>
        </LinkList>
      </template>`,
      options: [
        {
          'v-slot': false,
          slot: true,
          'slot-scope': false,
          scope: false
        }
      ]
    },
    {
      code: `
      <template>
        <LinkList>
          <template slot-scope="{a}">
            <a />
          </template>
        </LinkList>
      </template>`,
      options: [
        {
          'v-slot': false,
          slot: false,
          'slot-scope': true,
          scope: false
        }
      ]
    },
    `<template>
      <LinkList>
        <a />
      </LinkList>
    </template>`
  ],
  invalid: [
    // disallow v-slot
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
      options: [{ 'v-slot': false }],
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
      options: [{ 'v-slot': false }],
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
      options: [{ 'v-slot': false }],
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
      options: [{ 'v-slot': false }],
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
      options: [{ 'v-slot': false }],
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
      options: [{ 'v-slot': false }],
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
      options: [{ 'v-slot': false }],
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
      options: [{ 'v-slot': false }],
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
      options: [{ 'v-slot': false, 'slot-scope': false }],
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
      options: [{ 'v-slot': false, slot: false }],
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
      options: [{ 'v-slot': false }],
      errors: [
        {
          message: '`v-slot` are forbidden.',
          line: 4
        }
      ]
    },
    // disallow slot
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
      options: [{ slot: false }],
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
      options: [{ slot: false }],
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
      options: [{ slot: false }],
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
      options: [{ slot: false, scope: true }],
      errors: [
        {
          message: '`slot` are forbidden.',
          line: 4
        }
      ]
    },
    // disallow slot-scope
    {
      code: `
      <template>
        <LinkList>
          <a slot-scope />
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a v-slot />
        </LinkList>
      </template>`,
      options: [{ 'slot-scope': false }],
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
      output: `
      <template>
        <LinkList>
          <a v-slot="{a}" />
        </LinkList>
      </template>`,
      options: [{ 'slot-scope': false }],
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
          <a slot-scope="{a}" slot="name"/>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a  v-slot:name="{a}"/>
        </LinkList>
      </template>`,
      options: [{ 'slot-scope': false }],
      errors: [
        {
          message: '`slot-scope` are forbidden.',
          line: 4
        }
      ]
    },
    // disallow scope
    {
      code: `
      <template>
        <LinkList>
          <template scope="{a}">
            <a />
          </template>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template v-slot="{a}">
            <a />
          </template>
        </LinkList>
      </template>`,
      errors: [
        {
          message: '`scope` are forbidden.',
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
          message: '`scope` are forbidden.',
          line: 4
        }
      ]
    },
    // scope to slot-scope
    {
      code: `
      <template>
        <LinkList>
          <template scope="{a}">
            <a />
          </template>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <template slot-scope="{a}">
            <a />
          </template>
        </LinkList>
      </template>`,
      options: [{ 'v-slot': false, scope: false }],
      errors: [
        {
          message: '`scope` are forbidden.',
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
          <template slot="name" slot-scope="{a}">
            <a />
          </template>
        </LinkList>
      </template>`,
      options: [{ 'v-slot': false, scope: false }],
      errors: [
        {
          message: '`scope` are forbidden.',
          line: 4
        }
      ]
    },
    // 2 error
    {
      code: `
      <template>
        <LinkList>
          <a slot="name" slot-scope="{a}"/>
        </LinkList>
      </template>`,
      output: `
      <template>
        <LinkList>
          <a v-slot:name="{a}" />
        </LinkList>
      </template>`,
      options: [{ slot: false, 'slot-scope': false }],
      errors: [
        {
          message: '`slot` are forbidden.',
          line: 4
        },
        {
          message: '`slot-scope` are forbidden.',
          line: 4
        }
      ]
    },
    // can not fix
    // unknown modifiers
    {
      code: `
      <template>
        <LinkList>
          <a v-slot.mod="{a}" />
        </LinkList>
      </template>`,
      output: null,
      options: [{ 'v-slot': false }],
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
      output: null,
      options: [{ 'v-slot': false, 'slot-scope': false }],
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
      output: null,
      options: [{ 'v-slot': false, slot: false }],
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
      output: null,
      options: [
        {
          'v-slot': false,
          slot: false,
          'slot-scope': false,
          scope: true
        }
      ],
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
          <a slot=name />
        </LinkList>
      </template>`,
      output: null,
      options: [
        {
          'v-slot': false,
          slot: false,
          'slot-scope': false,
          scope: true
        }
      ],
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
          <a slot-scope="{a}" />
        </LinkList>
      </template>`,
      output: null,
      options: [
        {
          'v-slot': false,
          slot: false,
          'slot-scope': false,
          scope: true
        }
      ],
      errors: [
        {
          message: '`slot-scope` are forbidden.',
          line: 4
        }
      ]
    }
  ]
})
