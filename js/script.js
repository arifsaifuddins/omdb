$( document ).ready( function () {

  function search() {

    $( '.movie' ).html( '' );

    $.ajax( {
      type: "get",
      url: "https://www.omdbapi.com",
      dataType: "json",
      data: {
        "apikey": "412e58d4",
        "s": $( '.input-search' ).val(),
      },
      success: data => {

        if ( data.Response == 'True' ) {

          $( 'h1.label' ).html( $( '.input-search' ).val().toUpperCase() + ' MOVIES' );

          let movie = data.Search;

          $.each( movie, function ( i, m ) {

            let poster = ( m.Poster == "N/A" ) ? 'default.jpg' : m.Poster;

            $( '.movie' ).append( /*html*/ `
              <div class="col-lg-3 mr-3 mb-3">
                <div class="card text-white">
                  <img src="${ poster }" class="card-img">
                  <div class="card-img-overlay text-center  deskripsi">
                    <h5 class="card-title ">${ m.Title }</h5>
                    <p class="card-text">${ m.Year }</p>
                    <a href="#" class="btn btn-search detail" data-id="${ m.imdbID }" data-bs-toggle="modal" data-bs-target="#exampleModal">See Detail</a>
                  </div>
                </div>
              </div>
             `);

            $( '.input-search' ).val( '' );

          } );
        } else {
          $( '.movie' ).html( /*html*/ `
            <div class="col">
              <h1 class="text-center">${ data.Error }</h1>
            </div>
          `);
        }
      }
    } );
  }

  $( '.btn-search' ).click( function () {
    search();
  } );

  $( '.input-search' ).keyup( function ( e ) {
    if ( e.which == 13 ) {
      search();
    }
  } );

  $( '.movie' ).on( 'click', '.detail', function () {

    $.ajax( {
      type: "get",
      url: "https://www.omdbapi.com",
      dataType: "json",
      data: {
        "apikey": "412e58d4",
        "i": $( this ).data( 'id' ),
      },
      success: data => {

        let poster = ( data.Poster == "N/A" ) ? 'default.jpg' : data.Poster;

        $( '.modal-body' ).html( /*html*/ `
          <div class="container-fluid">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-lg-4">
                <img width="100%" class="img-fluid my-3" src="${ poster }" >
              </div>
              <div class="col-lg-8">
                <ul class="list-group">
                  <li class="list-group-item list-group-item-secondary"><h2>${ data.Title }</h2></li>
                  <li class="list-group-item list-group-item-dark">Year : ${ data.Year }</li>
                  <li class="list-group-item list-group-item-dark">Country : ${ data.Country }</li>
                  <li class="list-group-item list-group-item-dark">Actors : ${ data.Actors }</li>
                  <li class="list-group-item list-group-item-dark">Genre : ${ data.Genre }</li>
                  <li class="list-group-item list-group-item-dark">Released : ${ data.Released }</li>
                  <li class="list-group-item list-group-item-dark">Awards : ${ data.Awards }</li>
                </ul>
              </div>
            </div>
          </div>
        `);
      }
    } );
  } );
} );
