---
pageClass: rule-details
sidebarDepth: 0
title: vue/no-unsupported-features
description: disallow unsupported Vue.js syntax on the specified version
---
# vue/no-unsupported-features
> disallow unsupported Vue.js syntax on the specified version

- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports unsupported Vue.js syntax on the specified version.


## :wrench: Options

```json
{
  "vue/no-unsupported-features": ["error", {
    "version": "^2.6.0",
    "ignores": []
  }]
}
```


- `version` ... The `version` option accepts [the valid version range of `node-semver`](https://github.com/npm/node-semver#range-grammar). This option is required.
- `ignores` ... You can use this `ignores` option to ignore the given features.
The `"ignores"` option accepts an array of the following strings.

<details>

- `"slot-scope-attribute"` ... [slot-scope](https://vuejs.org/v2/api/#slot-scope-deprecated)
- `"v-slot"` ... [v-slot](https://vuejs.org/v2/api/#v-slot)

</details>

### `{"version": "~2.5.0"}`

<eslint-code-block fix :rules="{'vue/no-unsupported-features': ['error', {'version': '~2.5.0'}]}">

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
  </ListComponent>
</template>
```

</eslint-code-block>

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/no-unsupported-features.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/no-unsupported-features.js)
