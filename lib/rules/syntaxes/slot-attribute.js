/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'
module.exports = {
  deprecated: '2.6.0',
  // eslint-disable-next-line eslint-plugin/require-meta-fixable
  create (context, fixToUp) {
    const sourceCode = context.getSourceCode()
    /**
     * Convert to `v-slot`.
     * @param {object} fixer fixer
     * @param {VAttribute | null} slotAttr node of `slot`
     * @param {VAttribute | null} scopeAttr node of `scope`
     * @returns {string | null} converted text or null
     */
    function fixSlotToVSlot (fixer, slotAttr, scopeAttr) {
      const nameArgument = slotAttr && slotAttr.value && slotAttr && slotAttr.value.value
        ? `:${slotAttr.value.value}`
        : ''
      const scopeValue = scopeAttr && scopeAttr.value
        ? `=${sourceCode.getText(scopeAttr.value)}`
        : ''

      const replaceText = `v-slot${nameArgument}${scopeValue}`
      const fixers = [
        fixer.replaceText(slotAttr || scopeAttr, replaceText)
      ]
      if (slotAttr && scopeAttr) {
        fixers.push(fixer.remove(scopeAttr))
      }
      return fixers
    }
    /**
     * Reports `slot` node
     * @param {VAttribute} slotAttr node of `slot`
     * @returns {void}
     */
    function reportSlot (slotAttr) {
      context.report({
        node: slotAttr,
        message: '`slot` are forbidden.',
        fix: fixToUp ? fixer => {
          const element = slotAttr.parent
          const scopeAttr = element.attributes
            .find(attr => attr.directive === true && (attr.key.name === 'slot-scope' || attr.key.name === 'scope'))
          return fixSlotToVSlot(fixer, slotAttr, scopeAttr)
        } : null
      })
    }

    return {
      templateBodyVisitor: {
        "VAttribute[directive=false][key.name='slot']": reportSlot
      }
    }
  }
}
