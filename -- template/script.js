      const imageContainer = document.getElementById('image-container');
      const loader = document.getElementById('loader');

      let ready = false;
      let imagesloaded = 0;
      let totalImages = 0;
      let photosArray = [];
      let initialLoad = true;
      
      //unsplash api
      const count = 5;
      const apiKey = 'wrCOTfH2puNRJIx29PjnhOMGn7ojmj9rAdlgoiQtEKs';
      const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; 

      // check if all the images are loaded or not
      function imageloaded(){
        console.log('image loaded')
        imagesloaded++;
        if(imagesloaded === totalImages){
          ready = true; 
          // loader.hidd en = true
          // console.log(`ready = ${ready}`);
          initialLoad= false;
          count = 30;
        }
      }

      // helper function to set attributes on dom elements
      function setAttributes(elements, attributes){
        for(const key in attributes){
           elements.setAttribute(key,attributes[key]);
        }
      }


      // create elements for links and photos ,Add to Dom
      function displayPhotos(){
        imagesloaded = 0;
        totalImages = photosArray.length;
        console.log(`total-images ${totalImages}`);
        // run function for each object in photosArray  
        photosArray.forEach((photo) => {
          // create <a> to link to Unsplash
          const item = document.createElement('a');
          // item.setAttribute('href', photo.links.html);
          // item.setAttribute('target','_blank');
          setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
          });
          // create image for photo
          const img = document.createElement('img');
          img.setAttribute('src', photo.urls.regular);
          img.setAttribute('alt', photo.description);
          if(!photo.description){
            img.setAttribute('title', `url - ${photo.urls['thumb']}`);
          }else{
            img.setAttribute('title',photo.description );
          }

          // Event Listener check when each has finished loading 
          img.addEventListener('load', imageloaded);
          
          // put <img> inside <a>, then put both inside image container element
          item.appendChild(img);
          imageContainer.appendChild(item);
        });
      }

      // get photos from api

    async function getPhotos(){
      try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
      } catch (error) {
        // catch error here
      }
    }

    //  Check to see if scrolling near bottom of page, Load more photos
    window.addEventListener('scroll', () =>{
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        // this is triggered only once the left side is bigger than the right side
        ready = false;
        getPhotos();  
      

      }
    });

    // onload
    getPhotos();