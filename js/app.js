const artistasApi = "https://artista-server.herokuapp.com";
const entity= "artista";


function getAll() {
  fetch(artistasApi + '/' + entity)
  .then(response => response.json())
  .then((data) => {
    fetch('../templates/list.html')
    .then((response) => response.text())
    .then((template) => {
      var rendered = Mustache.render(template, data);
      document.getElementById('content').innerHTML = rendered;    
   });
  })
}

function checkId(item) {
	return item._id==this
}

function getById(query) {
  fetch(artistasApi + '/' + entity +'/' + query.id)
    .then(response => response.json())
    .then((data) => {
      fetch('/template/detail.html')
        .then((response) => response.text())
        .then((template) => {
          let rendered = Mustache.render(template, data);
          document.getElementById('content').innerHTML = rendered;
        });
    })
}

function init() {
  router = new Navigo(null, false, '#!');
	router.on({
	  '/get': function(_,query) {
		 getById(query);
	  }
	});
	router.on(() => getAll());
	router.resolve();
}
