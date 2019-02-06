/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'

const utils = require('../utils')
const slotAttribute = require('./syntaxes/slot-attribute')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow deprecated `slot` attribute (in Vue.js 2.6.0+)',
      category: undefined,
      url: 'https://eslint.vuejs.org/rules/no-deprecated-slot-attribute.html'
    },
    fixable: 'code',
    schema: []
  },
  create (context) {
    const templateBodyVisitor = slotAttribute.createTemplateBodyVisitor(context, true /* fixToUp */)
    return utils.defineTemplateBodyVisitor(context, templateBodyVisitor)
  }
}
