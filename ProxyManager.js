const fs = require('fs');

// Proxy Class represents an individual proxy configuration
class Proxy {
    constructor(proxyString = null) {
        this.proxyString = null;

        // If a proxy string is provided, parse it
        if (proxyString) {
            this.parseProxyString(proxyString);
        }
    }

    // Parses the proxy string into its constituent parts
    parseProxyString(proxyString) {
        const splitString = proxyString.trim().split(':');

        this.ip = splitString[0];
        this.port = splitString[1];
        this.proxyString = `${this.ip}:${this.port}`;

        // Check if the proxy string contains authentication details
        this.authenticated = splitString.length === 4;
        if (this.authenticated) {
            this.username = splitString[2];
            this.password = splitString[3];
            this.proxyString = `${this.username}:${this.password}@${this.proxyString}`;
        }
    }

    // Convert the proxy details to a dictionary format
    getDict() {
        if (!this.proxyString) return {};
        if (!this.authenticated) return { protocol: 'http', host: this.ip, port: parseInt(this.port) };
        return {
            protocol: 'http',
            host: this.ip,
            port: this.port,
            auth: {
                username: this.username,
                password: this.password
            }
        };
    }
}

// ProxyManager class manages multiple proxy configurations
class ProxyManager {
    constructor(proxyFilePath = null) {
        // Load proxies from file or default to a single unconfigured proxy
        this.proxies = proxyFilePath ? this.loadProxiesFromFile(proxyFilePath) : [new Proxy()];
        this.lock = false;
        this.currentProxy = 0;
    }

    // Load proxies from a newline-delimited file
    loadProxiesFromFile(proxyFilePath) {
        const proxies = [];
        const fileContent = fs.readFileSync(proxyFilePath, 'utf8');
        const proxyStrings = fileContent.split('\n');

        for (let proxyString of proxyStrings) {
            proxies.push(new Proxy(proxyString));
        }

        return proxies;
    }

    // Get a random proxy from the list
    randomProxy() {
        return this.proxies[Math.floor(Math.random() * this.proxies.length)];
    }

    // Get the next proxy in sequence
    nextProxy() {
        if (this.currentProxy >= this.proxies.length) {
            this.currentProxy = 0;
        }

        // Simple locking mechanism to avoid concurrent usage
        // NOTE: For high concurrency, consider using a more robust locking mechanism
        while (this.lock) { }

        this.lock = true;
        const proxy = this.proxies[this.currentProxy];
        this.currentProxy++;
        this.lock = false;

        return proxy;
    }
}

module.exports = ProxyManager;
