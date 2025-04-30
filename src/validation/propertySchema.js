// Validation for the main property form
export const validationSchema = {
  title(value) {
    if (value?.length >= 6) return true;
    return 'The property title is required and must be at least 6 characters long';
  },
  price(value) {
    /*
        ^  - Start of the string
        [0-9]+ - One or more digits (0-9)
        $  - End of the string
    */
    if (/^[0-9]+$/.test(value)) return true;
    return 'Price must contain numbers only';
  },
  bedrooms(value) {
    if (value) return true;
    return 'Please select a quantity';
  },
  wc(value) {
    if (value) return true;
    return 'Please select a quantity';
  },
  parkingSpots(value) {
    if (value) return true;
    return 'Please select a quantity';
  },
  description(value) {
    if (value) return true;
    return 'Please add a description';
  }
};

// Validation for the image upload form
export const imageSchema = {
  image(value) {
    if (value) return true;
    return 'An image is required';
  }
};
