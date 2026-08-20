export const siteInfo = {
  email: "ceylonvantage@gmail.com",
  phoneDisplay: "+94 76 611 0172",
  address: {
    line1: "159/2E/1-1, Thalawathugoda Rd,",
    line2: "Pitakotte, Sri Jayewardenepura Kotte",
  },
  // Used for the embedded map on /contact. Google's free-text "q=<address>"
  // embed was geocoding this address inaccurately (Thalawathugoda Road
  // runs a long way, and this exact house number doesn't reliably resolve
  // from text alone). Instead this pins the map to verified coordinates
  // for the correct stretch of the road in Pitakotte -- the same stretch
  // as the well-known Hotel Sanira landmark, a couple of doors from this
  // address -- which lands accurately every time.
  mapEmbedSrc: "https://www.google.com/maps?q=6.88439,79.90880&z=17&output=embed",
  social: {
    instagram: "https://www.instagram.com/ceylon_vantage/",
    instagramHandle: "@ceylon_vantage",
    facebook: "https://web.facebook.com/profile.php?id=61592832817349",
    googleReviewUrl: "https://g.page/r/CbSbOUKriJezEBM/review",
    tripadvisor:
      "https://www.tripadvisor.com/Attraction_Review-g665217-d34554874-Reviews-Ceylon_Vantage-Sri_Jayawardenepura_Western_Province.html",
  },
};