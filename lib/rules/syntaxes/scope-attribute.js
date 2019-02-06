/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'
module.exports = {
  deprecated: '2.5.0',
  createTemplateBodyVisitor (context, fixToUp) {
    /**
     * Reports `scope` node
     * @param {VAttribute} scopeAttr node of `scope`
     * @returns {void}
     */
    function reportScope (scopeAttr) {
      context.report({
        node: scopeAttr,
        message: '`scope` are forbidden.',
        fix: fixToUp ? fixer => fixer.replaceText(scopeAttr.key, 'slot-scope') : null
      })
    }

    return {
      "VAttribute[directive=true][key.name='scope']": reportScope
    }
  }
}
