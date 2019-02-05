'use strict'

const utils = require('../utils')
const scopeAttribute = require('./syntaxes/scope-attribute')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow deprecated `scope` attribute',
      category: undefined,
      url: 'https://eslint.vuejs.org/rules/no-deprecated-scope-attribute.html'
    },
    fixable: 'code',
    schema: []
  },
  create (context) {
    const visitors = scopeAttribute.create(context, true /* fixToUp */)
    return utils.defineTemplateBodyVisitor(context, visitors.templateBodyVisitor, visitors.scriptVisitor)
  }
}
