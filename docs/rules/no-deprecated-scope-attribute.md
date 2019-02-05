---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-deprecated-scope-attribute
description: disallow deprecated `scope` attribute
---
# vue/no-deprecated-scope-attribute
> disallow deprecated `scope` attribute

- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports deprecated in Vue.js v2.5.0+ `scope` attribute.

<eslint-code-block fix :rules="{'vue/no-deprecated-scope-attribute': ['error']}">

```vue
<template>
  <ListComponent>
    <!-- ✓ GOOD -->
    <template v-slot:name="props">
      {{ props.title }}
    </template>
    <template slot="name" slot-scope="props">
      {{ props.title }}
    </template>
  </ListComponent>
  <ListComponent>
    <!-- ✗ BAD -->
    <template slot="name" scope="props">
      {{ props.title }}
    </template>
  </ListComponent>
</template>
```

</eslint-code-block>

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/no-deprecated-scope-attribute.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/no-deprecated-scope-attribute.js)
