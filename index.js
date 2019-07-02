exports.calculateHosts = (serviceList, host) => {
    if(serviceList.length <= 0) {
        return 0;
    }

    const hostPool = new HostPool(1);
    serviceList.forEach(service => {
        hostPool.supply(service);
    });

    return hostPool.size();
}

exports.createHost = (cpu, ram, storage, id) => {
    return new Host(cpu, ram, storage, id);
}

exports.createService = (cpu, ram, storage, id) => {
    return new Service(cpu, ram, storage, id);
}

exports.getPool = () => {
    return new HostPool(1);
}


class HostPool {
    constructor(qtyHosts) {
        this.listOfHosts = []
        this.initHosts(qtyHosts);
    }

    initHosts(qtyHosts) {
        for (let i = 1; i < qtyHosts; i++) {
            this.createHost(i);
        }
    }

    createHost(id) {
        this.listOfHosts.push(new Host(8, 16, 100, id));
    }

    supply(service) {
        let hostAvailable = this.getHostAbleToSuply(service);
        if (!hostAvailable){
            this.createHost(this.listOfHosts.length + 1);
            this.supply(service);
        }
    }

    clean() {
        this.listOfHosts = [];
    }

    getHostAbleToSuply(service) {
        let hasAvailableResource = false;
        let hostAvailable;
        this.listOfHosts.every((host, index) => {
            if(host.hasResourcesAvailable(service)) {
                hasAvailableResource = true;
                hostAvailable = host;
                hostAvailable.cpu -= service.cpu;
                hostAvailable.ram -= service.ram;
                hostAvailable.storage -= service.storage;
                hostAvailable.services.push(service.id);
                return false;
            }
            return true;
        });
        if (hasAvailableResource) {
            return hostAvailable;
        } else {
            return false;
        }
    }

    size() {
        return this.listOfHosts.length;
    }
}

class Host {
    constructor(cpu, ram, storage, id) {
        this.cpu = cpu;
        this.ram = ram;
        this.storage = storage;
        this.id = id;
        this.services = [];
    }

    setService() {
        this.services.push(serviceId);
    }

    hasResourcesAvailable(service) {
        if (this.cpu >= service.cpu && this.ram >= service.ram && this.storage >= service.storage) {
            return true;
        } 
        return false;
    }
}

class Service {
    constructor(cpu, ram, storage, id) {
        this.cpu = cpu;
        this.ram = ram;
        this.storage = storage;
        this.id = id;
    }
}
