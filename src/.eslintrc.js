module.exports = {
  extends: [
    'angular'
  ],
  rules: {
    'angular/no-service-method': 0,
    'no-unused-vars' : 1,
    'angular/log' :1,
    'angular/document-service':1,
    'angular/window-service':1,
    'no-loop-func' : 0,
  },
  globals: { 
    "ENV": true,
    "Highcharts" :true
  }
}
