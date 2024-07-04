export const encodeUrls = (urlList) => {
    return urlList?.map((url) => url).join("||");
  };


export const decodeUrls = (encodedString)=> {
    if (typeof encodedString !== 'string') {
        // Handle the case where encodedString is not a string
        return [];
      }
    return encodedString?.split('||').map(url => url);
}