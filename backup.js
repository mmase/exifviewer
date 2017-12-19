import { EXIF } from 'exif-js';

setTimeout(function() {
  imgs.forEach(img => {
    EXIF.getData(img, function() {
      const tags = EXIF.getAllTags(this);

      console.log(tags);
    });
  });
}, 1000);
