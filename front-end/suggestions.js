'use strict'

let app = new Vue({
  el: '#app',
  data: {
    pageTitle: 'Suggestions',
    suggestion: {
        colorName: '',
        hexCode: '',
        rgb: '',
        url: ''
    }
  },
  methods: {
    addSuggestion: function(suggestion) {
      let _this = this
      axios.post('http://127.0.0.1:3000/suggestion', suggestion)
        .then(function (response) {
          console.log(response);
          _this.suggestion.colorName = '';
          _this.suggestion.hexCode = '';
          _this.suggestion.rgb = '';
          _this.suggestion.url = '';
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
});
