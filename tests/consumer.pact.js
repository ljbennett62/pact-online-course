const path = require("path")
const chai = require("chai")
const { Pact, Matchers } = require("@pact-foundation/pact")
const chaiAsPromised = require("chai-as-promised")
const expect = chai.expect
chai.use(chaiAsPromised)
const { string } = Matchers
const get = require('../src/get')

describe('Consumer Test', () => {

    it('OK response', async () => {
        await get()
        .then((response) => {
            //console.log(response)
            expect(response.statusText).to.be.equal('OK ')
        })
    })

    let provider = Pact;
    before(() => {
        provider = new Pact({
            consumer: "React",
            provider: "token",
            port: 1235,
            log: path.resolve(process.cwd(), 'logs', 'pact.log'),
            dir: path.resolve(process.cwd(), 'pacts'),
            logLevel: "INFO"
         });

         return provider.setup()

    }, 30000);

    //after(() => provider.finalize());

    after(async () => {
        await provider.finalize();
    })


    beforeEach(() => {
        return provider.addInteraction({
            state: "user token",
            uponReceiving: "GET user token",
            withRequest: {
                method: "GET",
                path: "/token/1235",
                headers: { Accept: "application/json, text/plain, */*" }
            },
            willRespondWith: {
                headers: { "content-type": "application/json" },
                status: 200,
                body: { "token": string("bearer") }
            }
       })
    })

    //afterEach(() => provider.verify());

    afterEach(async () => {
        await provider.verify();
    })

  

})