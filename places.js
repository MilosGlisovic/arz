
window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: 'Zlatiborski Andjeo Komforna, moderna vila na odličnoj lokaciji sa 18 kompletno opremljenih apartmana u kojima ćete se osećati kao kod kuće.',
           location: {
               lat: 43.73358,
               lng: 19.70329,
           }
       },
       {
           name: 'Restoran kod Milunke',
           location: {
               lat: 43.72468,
               lng: 19.69199,
           }
       },
   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;
       let name2 = place.name;

       const model = document.createElement('a-link');
                   model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                   model.setAttribute('name', name2);
                   model.setAttribute('src', 'map-marker.png');

                   // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                   model.setAttribute('scale', '20, 20');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       const clickListener = function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        const name = ev.target.getAttribute('name');

        const el = ev.detail.intersection && ev.detail.intersection.object.el;

        if (el && el === ev.target) {
            const label = document.createElement('span');
            const btn = document.createElement('button');
            const container = document.createElement('div');
            container.setAttribute('id', 'place-label');
            label.innerText = name;
            btn.innerText = 'Close';
            container.appendChild(label);
            container.appendChild(btn);
            document.body.appendChild(container);

            btn.addEventListener("click", function() {
                container.parentElement.removeChild(container);
              });

            //setTimeout(() => {
                //container.parentElement.removeChild(container);
            //}, 1500);
        }
    };

    model.addEventListener('click', clickListener);
       scene.appendChild(model);
   });
}