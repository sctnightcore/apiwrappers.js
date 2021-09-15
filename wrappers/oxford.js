import fetch from 'node-fetch'

if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}

export const Oxford = class Oxford {
    constructor(appId, appKey, language = "en-gb") {
        if (appId === null) throw new Error('You must provide a appID');
        if (appKey === null) throw new Error('You must provide a appKey');
        this.appId = appId;
        this.appKey = appKey;
        this.language = language;
    }

    /**
     * 
     * @param {string} word 
     * @returns json
     */
    baseRequest = async (word) => {
        try {
            const data = await fetch(`https://od-api.oxforddictionaries.com/api/v2/entries/${this.language}/${word.toLowerCase()}`, {
                method: "GET",
                headers: {
                    'app_id': this.appId,
                    'app_key': this.appKey
                },
            })
            const response = await data.json()
            return response
        } catch (err) {
            return err
        }
    }

    /**
     * 
     * @param {string} word 
     * @returns string
     */
    async getWordDefination(word) {
        const data = await this.baseRequest(word)
        return data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
    }
    /**
     * 
     * @param {string} word 
     * @returns string
     */
    async getWordgrammaticalFeature(word) {
        const data = await this.baseRequest(word)
        return data.results[0].lexicalEntries[0].entries[0].grammaticalFeatures[0].text
    }
    /**
     * 
     * @param {string} word 
     * @returns string[]
     */
    async getWordExamples(word) {
        let em = []
        const data = await this.baseRequest(word)
        const response = data.results[0].lexicalEntries[0].entries[0].senses
        response.forEach((value) => {
            value.examples.forEach((value) => {
                em.push(value.text)
            })
        })
        return em
    }

    /**
     * 
     * @param {string} word 
     * @returns string[]
     */
    async getWordSynonyms(word) {
        const data = await this.baseRequest(word)
        const res = data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].synonyms
        let em = []
        res.forEach((value, index) => em.push(value.text))
        return em
    }


    /**
     * 
     * @param {string} word 
     * @returns string[]
     */
    async getWordLexicalCategory(word) {
        let em = [];
        const data = await this.baseRequest(word)
        const res = data.results[0].lexicalEntries
        res.forEach(value => em.push(value.lexicalCategory.text))
        return em
    }
}