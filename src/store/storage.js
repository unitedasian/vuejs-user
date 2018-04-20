const itemKeyPrefix = 'uam_user_'

export default {

  /**
   * Clear storage
   */
  clear () {
    if (localStorage.length === 0) {
      return
    }

    const removedKeys = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const regexp = new RegExp(`^${itemKeyPrefix}.+`, 'i')

      if (regexp.test(key) === false) {
        continue
      }

      removedKeys.push(key)
    }

    for (const key in removedKeys) {
      localStorage.removeItem(removedKeys[key])
    }
  },

  /**
   * Get item
   *
   * @param {string} name
   * @param {*} defaultValue - default value
   * @returns {*}
   */
  get (name, defaultValue = null) {
    const item = localStorage.getItem(itemKeyPrefix + name)

    if (item !== null) {
      try {
        const data = JSON.parse(item)

        if (data.expire === null) {
          return data.value
        }

        if (data.expire >= new Date().getTime()) {
          return data.value
        }

        this.remove(name)
      } catch (err) {
        return defaultValue
      }
    }

    return defaultValue
  },

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @param {number} expire - milliseconds
   */
  set (name, value, expire = null) {
    const stringifyValue = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire : null
    })

    localStorage.setItem(itemKeyPrefix + name, stringifyValue)
  }
}
