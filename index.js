import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */
const fetchColors = ({ name, hex, compName, compHex }) => {
  console.log(compName);
  //Fetches the Color Object from the API defined above.
  return fetch(COLORS)
    // The promise is returned and converted to json.
    .then(res => res.json())
    // The Json result is filtered by the parameters that are passed in the function. Then helps to ensure the promise is completed before the filtering code is applied. 
    .then(colorObj => {
      const filteredColor = colorObj.filter(color =>
        (name === undefined || (color.name.toLowerCase().includes(name.toLowerCase()))) &&
        (hex === undefined || (color.hex === hex)) &&
        (compName === undefined ||
          (color.comp.some(comp => comp.name && comp.name.toLowerCase().includes(compName.toLowerCase())))) &&
        (compHex === undefined || (color.comp.some(comp => comp.hex === compHex)))
      );
      // returns the filtered color objects
      return filteredColor;
    });
};

// Leave this here
export default fetchColors;


