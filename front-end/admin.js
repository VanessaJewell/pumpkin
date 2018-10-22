'use strict'

let app = new Vue({
  el: '#app',
  data: {
    pageTitle: 'Admin Only',
    suggestions: []
  },
  methods: {
    addColor: function(suggestion) {
      let _this = this;
      axios.post('http://127.0.0.1:3000/newColor', suggestion)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function() {
          axios.get('http://127.0.0.1:3000/admin')
          .then((response) => {
            _this.suggestions = response.data;
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })
        })
    },
    deleteSuggestion: function(id) {
      let _this = this;
      axios.delete('http://127.0.0.1:3000/removeSuggestion/' + id)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function() {
          axios.get('http://127.0.0.1:3000/admin')
          .then((response) => {
            _this.suggestions = response.data;
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })
        })
    }
  },
  created: function() {
    let _this = this;
    axios.get('http://127.0.0.1:3000/admin')
    .then((response) => {
      _this.suggestions = response.data;
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
   }
});
