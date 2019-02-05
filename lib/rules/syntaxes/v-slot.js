/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'
module.exports = {
  supported: '2.6.0',
  // eslint-disable-next-line eslint-plugin/require-meta-fixable
  create (context, fixToUp) {
    const sourceCode = context.getSourceCode()
    /**
     * Convert to `slot` and `slot-scope`.
     * @param {object} fixer fixer
     * @param {VAttribute} vSlotAttr node of `v-slot`
     * @returns {string | null} converted text or null
     */
    function fixVSlotToSlot (fixer, vSlotAttr) {
      const key = vSlotAttr.key
      if (key.modifiers.length) {
        // unknown modifiers
        return null
      }
      const name = key.argument
      const scopedValueNode = vSlotAttr.value

      const attrs = []
      if (name) {
        attrs.push(`slot="${name}"`)
      } else if (!scopedValueNode) {
        attrs.push('slot')
      }
      if (scopedValueNode) {
        attrs.push(
          `slot-scope=${sourceCode.getText(scopedValueNode)}`
        )
      }
      return fixer.replaceText(vSlotAttr, attrs.join(' '))
    }
    /**
     * Reports `v-slot` node
     * @param {VAttribute} vSlotAttr node of `v-slot`
     * @returns {void}
     */
    function reportVSlot (vSlotAttr) {
      context.report({
        node: vSlotAttr,
        message: '`v-slot` are forbidden.',
        fix: fixToUp ? null : fixer => fixVSlotToSlot(fixer, vSlotAttr)
      })
    }

    return {
      templateBodyVisitor: {
        "VAttribute[directive=true][key.name='slot']": reportVSlot,

        // for old perser
        'VAttribute[directive=false][key.name=/^#/]': node => {
          reportVSlot({
            range: node.range,
            loc: node.loc,
            key: {
              modifiers: [],
              argument: node.key.name.slice(1)
            },
            value: node.value
          })
        }
      }
    }
  }
}
