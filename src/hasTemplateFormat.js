export default function(templateFormats = ["*"], format = false) {
  if(!Array.isArray(templateFormats)) {
    templateFormats = [templateFormats];
  }

  if( Array.isArray(templateFormats) ) {
    if(templateFormats.includes("*") || format && templateFormats.includes(format)) {
      return true;
    }
  }

  return false;
};
