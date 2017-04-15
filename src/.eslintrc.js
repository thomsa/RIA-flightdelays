module.exports = {
  extends: [
    'angular'
  ],
  rules: {
    'no-unused-vars': 1,
    'angular/window-service': 2,
    'no-loop-func': 0,
    'max-params': 0
  },
  globals: {
    "ENV": true,
    "Highcharts": true
  }
}
