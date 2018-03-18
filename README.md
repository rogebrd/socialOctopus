18Mar2018:
- updated base app UI colors
- updated post page
- updated home page
- added Twitter Posting Provider

Home Page:
- adjusted header items alignment

Post Page:
- must have text and toggle enabled to be able to post

Twitter Post Provider:
- created
- will perform the posting to twitter function using user token (NOT TESTED)
- user must be authorized (!)
- currently only posting text is implemented

6Mar2018:
- base app UI style created
- from home page: swipe to left to go to post page
- from post page: swipe to right to return to home page, or tap back button (upper left)

Home Page Header:
- top left button is for expanding feed
- top right button is for filtering feed
- top middle is the search bar which can be implemented to filter and display results as the user types
  currently it only displays an alert
  
Post Page:
- text field for user entry
- toggle to select social media platform
- button to post

To implement: 
- toggle disabled on default, enabled once text field contains some text
- post button disabled on default, enabled once toggle is activated
- take text field contents and post as tweet
