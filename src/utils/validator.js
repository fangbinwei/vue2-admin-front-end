let strategies = {
  isNoEmpty (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  maxLength (value, length, errorMsg) {
    if (value.length > length) { return errorMsg }
  }
}

let Validator = function () {
  this.cache = []
}
Validator.prototype.add = function (value, rule, errorMsg) {
  let ary = rule.split(':')
  this.cache.push(function () {
    let strategy = ary.shift()
    ary.unshift(value)
    ary.push(errorMsg) // value, length, errorMsg || value, errorMsg
    return strategies[strategy].apply(value, ary)
  })
}
Validator.prototype.start = function () {
  for (let i = 0, length = this.cache.length; i < length; i++) {
    let msg = this.cache[i]()
    if (msg) return msg
  }
}

export {Validator}
