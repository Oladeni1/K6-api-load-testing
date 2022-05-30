## K6-api-load-testing

# K6 Documentation: 

https://k6.io/docs/

# Running Test:

k6 run script.js

# Running Test to generate result in csv:

k6 run --out csv=my_test_result.csv script.js

## Installation:

# For Mac
Install with Homebrew by running: 
brew install k6

# For Windows
If you use the Chocolatey package manager you can install the unofficial k6 package with:

choco install k6
Otherwise you can manually download and install the latest official .msi package.

# For Linux
For Debian-based Linux distributions like Ubuntu, you can install k6 from the private deb repo like this:

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6

# K6 Cloud token:

k6 login cloud -t 0d4c1bc996822a1047859d88f3d4ae20db5148d0eafd444f2f649a5981629bfd

# Running test with k6 cloud:

k6 run --out cloud script.js

# Running test and upload test results on k6 cloud:

K6_CLOUD_TOKEN=<0d4c1bc996822a1047859d88f3d4ae20db5148d0eafd444f2f649a5981629bfd> k6 run --out cloud script.js

