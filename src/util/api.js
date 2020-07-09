const PAGE_SIZE = 10

async function getAPI(page) {
    try {
        //mimicing an actual api call
        let response = await fetch('/colleges.json');
        let data = await response.json()
        let {colleges} = data

        //the backend in a real scenario shall worry about returning the appropriate records based on 'page' parameter
        let end = page*PAGE_SIZE
        let start = end-PAGE_SIZE
        if(start >= colleges.length) {
            return []
        }
        colleges = colleges.slice(start, end)
        console.log('returning record for page : ', page)
        return colleges
    } catch (error) {
        console.error('error in getAPI : ', error)
    }
}

module.exports = getAPI