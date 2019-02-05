'use strict'

const utils = require('../utils')
const slotAttribute = require('./syntaxes/slot-attribute')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow deprecated `slot` attribute',
      category: undefined,
      url: 'https://eslint.vuejs.org/rules/no-deprecated-slot-attribute.html'
    },
    fixable: 'code',
    schema: []
  },
  create (context) {
    const visitors = slotAttribute.create(context, true /* fixToUp */)
    return utils.defineTemplateBodyVisitor(context, visitors.templateBodyVisitor, visitors.scriptVisitor)
  }
}
