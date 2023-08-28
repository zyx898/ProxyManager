# ProxyManager

-------------------------------------------------------

This repository contains a straightforward and effective solution for managing multiple proxy configurations in Node.js applications.

Features
Parse proxy strings from file or directly.
Support for both authenticated and non-authenticated proxies.
Fetch a random proxy or iterate through them in a controlled manner.
Simple locking mechanism for concurrency control.

-------------------------------------------------------

# How to Use
1. Installation
Clone the repository:
```
bash
Copy code
git clone https://github.com/zyx898/ProxyManager.git
cd ProxyManager
```

2. Utilizing ProxyManager
First, ensure your proxy file is structured correctly, with each proxy on a new line:
```
makefile
Copy code
ip1:port1
ip2:port2:username2:password2
```
-------------------------------------------------------
# Use the ProxyManager in your project:

```
const ProxyManager = require('./path-to-proxymanager-file');

const manager = new ProxyManager('./path-to-proxy-file.txt');

// To get a random proxy:
const randomProxy = manager.randomProxy();

// To get the next proxy in the list:
const nextProxy = manager.nextProxy();
```
`Replace path-to-proxymanager-file and path-to-proxy-file.txt with the appropriate paths in your project.`

Class Details
Proxy: Represents a single proxy configuration. Can parse proxy strings and provide a dictionary format suitable for libraries like Axios.
ProxyManager: Manages multiple Proxy instances. Can read from a file and provide random or sequential proxies.

# Contribute
Feel free to open issues for bug reports, feature requests, or questions. 

*Pull requests are welcome!*
