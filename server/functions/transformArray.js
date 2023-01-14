function transformArray(arr) {
    var transformedArray = []
    for (var i = 0; i < arr.length; i++) {
      var obj = {}
      for (var key in arr[i]) {
        if (arr[i][key]['N']) {
          obj[key] = parseFloat(arr[i][key]['N'])
        } else {
          obj[key] = arr[i][key]['S']
        }
      }
      transformedArray.push(obj)
    }
    return transformedArray
  }

  module.exports = { transformArray }