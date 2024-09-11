
function getCookieValue(name:string) {
  const cookieString = document.cookie; // Get the entire cookie string
  const cookies = cookieString.split('; '); // Split it into individual cookies
  for (let cookie of cookies) {
    const [key, value] = cookie.split('='); // Split each cookie into a key-value pair
    if (key === name) {
      return decodeURIComponent(value); // Return the decoded value if the key matches
    }
  }
  return null; // Return null if the cookie is not found
}

export default getCookieValue;