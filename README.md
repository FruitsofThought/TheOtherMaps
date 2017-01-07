# TheOtherMaps
Non Standard OpenStreetMap Maps web client. Based on the incredible Tangram Library.

Very scarce code documentation is rendered on http://fruitsofthought.github.io/TheOtherMaps/

## Setup

To prepare your Ubuntu system (without nodejs installed):

-  curl -sL https://deb.nodesource.com/setup_4.x | sudo bash -
-  sudo apt-get install -y nodejs
-  sudo npm install -g grunt-cli
-  sudo npm install -g bower
then

- bower install
- npm install
- grunt
- npm run builddocs

You will now find the full application in the dist folder and the documentation in the docs folder.
