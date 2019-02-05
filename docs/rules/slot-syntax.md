---
pageClass: rule-details
sidebarDepth: 0
title: vue/slot-syntax
description: disallow deprecated slot syntaxes
---
# vue/slot-syntax
> disallow deprecated slot syntaxes

- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports deprecated slot syntax.

<eslint-code-block fix :rules="{'vue/slot-syntax': ['error']}">

```vue
<template>
  <ListComponent>
    <!-- ✓ GOOD -->
    <template v-slot="props">
      {{ props.title }}
    </template>
  </ListComponent>
  <ListComponent>
    <!-- ✗ BAD -->
    <template scope="props">
      {{ props.title }}
    </template>
  </ListComponent>
</template>
```

</eslint-code-block>

## :wrench: Options

```json
{
  "vue/slot-syntax": ["error", {
    "v-slot": true,
    "slot": true,
    "slot-scope": true,
    "scope": false
  }]
}
```

- `v-slot` ... If `false`, disallow `v-slot`. default `true`
- `slot` ... If `false`, disallow `slot`. default `true`
- `slot-scope` ... If `false`, disallow `slot-scope`. default `true`
- `scope` ... If `false`, disallow `scope`. default `false`

### `{"v-slot": true, "slot": false, "slot-scope": false, "scope": false}`

> You are using Vue.js v2.6.0+ and you want to use only `v-slot`

<eslint-code-block fix :rules="{'vue/slot-syntax': ['error', {'v-slot': true, 'slot': false, 'slot-scope': false, 'scope': false}]}">

```vue
<template>
  <ListComponent>
    <!-- ✓ GOOD -->
    <template v-slot:name="props">
      {{ props.title }}
    </template>
  </ListComponent>
  <ListComponent>
    <!-- ✗ BAD -->
    <template slot="name" slot-scope="props">
      {{ props.title }}
    </template>
    <template slot="name" scope="props">
      {{ props.title }}
    </template>
  </ListComponent>
</template>
```

</eslint-code-block>

### `{"v-slot": false, "slot": true, "slot-scope": true, "scope": false}`

> You are using Vue.js v2.5.x

<eslint-code-block fix :rules="{'vue/slot-syntax': ['error', {'v-slot': false, 'slot': true, 'slot-scope': true, 'scope': false}]}">

```vue
<template>
  <ListComponent>
    <!-- ✓ GOOD -->
    <template slot="name" slot-scope="props">
      {{ props.title }}
    </template>
  </ListComponent>
  <ListComponent>
    <!-- ✗ BAD -->
    <template v-slot:name="props">
      {{ props.title }}
    </template>
    <template slot="name" scope="props">
      {{ props.title }}
    </template>
  </ListComponent>
</template>
```

</eslint-code-block>

### `{"v-slot": false, "slot": true, "slot-scope": false, "scope": true}`

> You are using Vue.js less than v2.5.0

<eslint-code-block fix :rules="{'vue/slot-syntax': ['error', {'v-slot': false, 'slot': true, 'slot-scope': false, 'scope': true}]}">

```vue
<template>
  <ListComponent>
    <!-- ✓ GOOD -->
    <template slot="name" scope="props">
      {{ props.title }}
    </template>
  </ListComponent>
  <ListComponent>
    <!-- ✗ BAD -->
    <template v-slot:name="props">
      {{ props.title }}
    </template>
    <template slot="name" slot-scope="props">
      {{ props.title }}
    </template>
  </ListComponent>
</template>
```

</eslint-code-block>

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/slot-syntax.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/slot-syntax.js)
