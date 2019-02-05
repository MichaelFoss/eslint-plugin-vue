'use strict'

const utils = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow deprecated slot syntaxes',
      category: undefined,
      url: 'https://eslint.vuejs.org/rules/slot-syntax.html'
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          'v-slot': {
            type: 'boolean'
          },
          slot: {
            type: 'boolean'
          },
          'slot-scope': {
            type: 'boolean'
          },
          scope: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      forbiddenVSlot: '`v-slot` are forbidden.',
      forbiddenSlot: '`slot` are forbidden.',
      forbiddenSlotScope: '`slot-scope` are forbidden.',
      forbiddenScope: '`scope` are forbidden.'
    }
  },
  create (context) {
    const option = Object.assign(
      {
        'v-slot': true,
        slot: true,
        'slot-scope': true,
        scope: false
      },
      context.options[0] || {}
    )
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

      const canfix = (option.slot && option['slot-scope']) ||
        (option.slot && !scopedValueNode) ||
        (option['slot-scope'] && !name)

      if (canfix) {
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

      // cannot fix
      return null
    }

    /**
     * Convert to `v-slot`.
     * @param {object} fixer fixer
     * @param {VAttribute | null} slotAttr node of `slot`
     * @param {VAttribute | null} scopeAttr node of `slot-scope`
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
     * Reports `v-slot` node
     * @param {VAttribute} vSlotAttr node of `v-slot`
     * @returns {void}
     */
    function reportVSlot (vSlotAttr) {
      context.report({
        node: vSlotAttr,
        messageId: 'forbiddenVSlot',
        fix: option.slot || option['slot-scope']
          ? fixer => fixVSlotToSlot(fixer, vSlotAttr)
          : null
      })
    }

    /**
     * Reports `slot` node
     * @param {VAttribute} slotAttr node of `slot`
     * @returns {void}
     */
    function reportSlot (slotAttr) {
      context.report({
        node: slotAttr,
        messageId: 'forbiddenSlot',
        fix: option['v-slot']
          ? fixer => {
            const element = slotAttr.parent
            const scopeAttr = element.attributes
              .find(attr => attr.directive === true && (attr.key.name === 'slot-scope' || attr.key.name === 'scope'))
            return fixSlotToVSlot(fixer, slotAttr, scopeAttr)
          }
          : null
      })
    }

    /**
     * Reports `slot-scope` node
     * @param {VAttribute} scopeAttr node of `slot-scope` or `scope`
     * @returns {void}
     */
    function reportSlotScope (scopeAttr) {
      context.report({
        node: scopeAttr,
        messageId: scopeAttr.key.name !== 'scope'
          ? 'forbiddenSlotScope'
          : 'forbiddenScope',
        fix: option['v-slot']
          ? fixer => {
            const element = scopeAttr.parent
            const slotAttr = element.attributes
              .find(attr => attr.directive === false && attr.key.name === 'slot')
            return fixSlotToVSlot(fixer, slotAttr, scopeAttr)
          }
          : option['slot-scope']
            ? fixer => fixer.replaceText(scopeAttr.key, 'slot-scope')
            : null
      })
    }

    const visitor = {}

    if (!option['v-slot']) {
      visitor["VAttribute[directive=true][key.name='slot']"] = reportVSlot
      // for old perser
      visitor['VAttribute[directive=false][key.name=/^#/]'] = node => {
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

    if (!option.slot) {
      visitor["VAttribute[directive=false][key.name='slot']"] = reportSlot
    }

    if (!option['slot-scope']) {
      visitor[
        "VAttribute[directive=true][key.name='slot-scope']"
      ] = reportSlotScope
    }

    if (!option.scope) {
      visitor[
        "VAttribute[directive=true][key.name='scope']"
      ] = reportSlotScope
    }
    return utils.defineTemplateBodyVisitor(context, visitor)
  }
}
