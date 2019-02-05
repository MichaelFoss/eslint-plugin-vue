'use strict'

const utils = require('../utils')
const slotScopeAttribute = require('./syntaxes/slot-scope-attribute')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow deprecated `slot-scope` attribute',
      category: undefined,
      url: 'https://eslint.vuejs.org/rules/no-deprecated-slot-scope-attribute.html'
    },
    fixable: 'code',
    schema: []
  },
  create (context) {
    const visitors = slotScopeAttribute.create(context, true /* fixToUp */)
    return utils.defineTemplateBodyVisitor(context, visitors.templateBodyVisitor, visitors.scriptVisitor)
  }
}
