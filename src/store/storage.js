export default {

  /**
   * Clear storage
   */
  clear () {
    if (this.length === 0) {
      return
    }

    const removedKeys = []

    for (let i = 0; i < this.length; i++) {
      const key = this.storage.key(i)
      const regexp = new RegExp(`^${'uam_user_'}.+`, 'i')

      if (regexp.test(key) === false) {
        continue
      }

      removedKeys.push(key)
    }

    for (const key in removedKeys) {
      localStorage.removeItem(removedKeys[key])
    }
  },

  get (name, def = null) {
    const item = localStorage.getItem('uam_user_' + name)

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
        return def
      }
    }

    return def
  },

  set (name, value, expire = null) {
    const stringifyValue = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire : null
    })

    localStorage.setItem('uam_user_' + name, stringifyValue)

    console.log(localStorage.getItem('uam_user_' + name))
  }
}
