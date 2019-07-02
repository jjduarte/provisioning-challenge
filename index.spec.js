const chai = require('chai');

const {expect} = chai;

describe('Check24 interview ', () => {
    context('Calculate Hosts for Services', () => {

        it('If services are empty', () => {
            const listofServices = [];
            const { calculateHosts } =  require('./index');
            const response = calculateHosts(listofServices);
            expect(response).to.be.equal(0);
        })

        it('Should return 3 host for services with high consumption', ()=> {
            const { createService } = require('./index');
            const service1 = createService(8, 16, 100, 1);
            const service2 = createService(8, 16, 100, 2);
            const service3 = createService(8, 16, 100, 3);
            const listofServices = [service1, service2, service3];
            const { calculateHosts } =  require('./index');
            const response = calculateHosts(listofServices);
            expect(response).to.be.equal(3);
        })

        it('Should return 1 host for services with low consumption', ()=> {
            const { createService } = require('./index');
            const service1 = createService(1, 1, 1, 1);
            const service2 = createService(1, 1, 1, 2);
            const service3 = createService(1, 1, 1, 3);
            const listofServices = [service1, service2, service3];
            const { calculateHosts } =  require('./index');
            const response = calculateHosts(listofServices);
            expect(response).to.be.equal(1);
        })

        it('Should return 0 host for empty services', ()=> {
            const listofServices = [];
            const { calculateHosts } =  require('./index');
            const response = calculateHosts(listofServices);
            expect(response).to.be.equal(0);
        })

        it('Clean pull of hosts', () => {
            const { getPool } = require('./index');
            let response = getPool(1);
            response.clean();
            expect(response.size()).to.be.equal(0);
        })

        it('Create Hosts', () => {
            const { createHost } = require('./index');
            const host1 = createHost(8, 16, 100, 99);
            expect(host1.cpu).to.be.equal(8);
            expect(host1.ram).to.be.equal(16);
            expect(host1.storage).to.be.equal(100);
            expect(host1.id).to.be.equal(99);
        })

        it('Create Services', () => {
            const { createService } = require('./index');
            const service1 = createService(4, 6, 10, 1);
            expect(service1.cpu).to.be.equal(4);
            expect(service1.ram).to.be.equal(6);
            expect(service1.storage).to.be.equal(10);
        })

    });
});
