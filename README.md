# Social Octopus
##### UW Madison CS506 - Software Engineering Spring 2018 Project
##### Brad Rogers, Ruite Guo, Jess Liu, Joey Kraker, Rob Johnson, Julian Pakdel

### Build Instructions

Building the project is relatively simple; you must have ionic installed on the computer you are using and then check out the tagged 'iteration_2' code.  Once this has been done, cd into the ionic directory and run 'ionic lab' to start a local server to test the code in a local browser.  'ionic lab' allows you to see the application in a prepackaged iOS, Android, or Windows emulator.  If you wish to view the application natively in the browser, run 'ionic serve'.  

```sh
$ mkdir socialOctopus
$ git clone 
$ cd socialOctopus/ionic
$ ionic lab
```
ionic lab might ask you whether to update something, click y
if it throws error
do 
```
rm package-lock.json
npm install
```

All individual testing page should only serves as a demonstration, please do not enter any fields which might interrupt backend database.

Do normal walk through log in and the app should work correctly.

To test it, do test all. It might crush at some page but the test will continue. Check console for specifics.

Testing already registered accounts;
```
username:bradrogers
password:brad
```

Once open, you can register for an account, and login and play around with the features


If you would prefer to skip this step and use a test account we have created, you can login with the following credentials: 

    Username: test
    Password: test

This account already has all supported accounts linked and has been the account used to test all functionality.
