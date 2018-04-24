# Social Octopus
##### UW Madison CS506 - Software Engineering Spring 2018 Project
##### Brad Rogers, Ruite Guo, Jess Liu, Joey Kraker, Rob Johnson, Julian Pakdel, Agrim Pandey

### Build Instructions

Building the project is relatively simple; you must have ionic installed on the computer you are using and then check out the tagged 'Iteration2' code.  Once this has been done, cd into the ionic directory and run 'ionic lab' to start a local server to test the code in a local browser.  'ionic lab' allows you to see the application in a prepackaged iOS, Android, or Windows emulator.  If you wish to view the application natively in the browser, run 'ionic serve'.  

```sh
$ mkdir socialOctopus
$ git clone 
$ cd socialOctopus/ionic
$ ionic lab
```
Notice: when you do ionic lab , it might ask you install node dependencies, please click y.

Once open, you can register for an account, and login and play around with the features

Note: You must manually add an account from the edit user page (Swipe Right)

If you would prefer to skip this step and use a test account we have created, you can login with the following credentials: 

    Username1: bradrogers 
    Password1: brad
    Username2: hey  
    Password2: hey

This account already has all supported accounts linked and has been the account used to test all functionality.

Notice: The create account funcationality has been disabled due to backend issues temporarily. Please don't test create accounts




To test our twitter account association functions in our app, we provide several testing twitter accounts:


Instruction of Using Settings Page to associate your own twitter account to our App:
```
Username: robtesteremail1@gmail.com
Passwords:robtest1
Username: robtesteremail2@gmail.com
Passwords:robtest2
Username: robtesteremail3@gmail.com
Passwords:robtest3
```




Click the gear Symbol in the homepage to go to settings page
![alt text](https://78.media.tumblr.com/f293693addcbb934bb157c0dec43c2c9/tumblr_p7o9zfYAxH1xqybloo3_1280.jpg)

Click the add twitter to generate an authorization links, 
![alt text](https://78.media.tumblr.com/0bcf6976e50e42d72cf89ed362ecadf7/tumblr_p7o9zfYAxH1xqybloo2_1280.jpg)

After clicking add twitter button, you will see a field with a link. That's the authorization links, copy link into browser.
![alt text](https://78.media.tumblr.com/58ab8a813b7ecb2ccbc63ee4e5471513/tumblr_p7o9zfYAxH1xqybloo1_1280.jpg)

After copy the links into browser, you will be able to see the following images. Type your username and password and click authorize
![alt text](https://78.media.tumblr.com/aa048b4629dbb5b9c10fcf12327bd641/tumblr_p7o9zfYAxH1xqybloo6_1280.jpg)

Then an authorization pin will pop up, copy the authorization pin 
![alt text](https://78.media.tumblr.com/87dcb1d72024e69fc65fa30044994a98/tumblr_p7o9zfYAxH1xqybloo4_1280.jpg)

Copy the authorization pin to the twitter pin area 
![alt text](https://78.media.tumblr.com/07a20cbb6441c65b051d6ffa47ceb977/tumblr_p7o9zfYAxH1xqybloo5_1280.jpg)

and then click submit pin. And wait for a few seconds, and click save. 
You should be good to go. 

To reload the twitter, you must log out first. Which means clicking the back button on home page 
![alt text](https://78.media.tumblr.com/f293693addcbb934bb157c0dec43c2c9/tumblr_p7o9zfYAxH1xqybloo3_1280.jpg)

And then you will be directed to log in page, re login and you will be able to see your twitter feed.



