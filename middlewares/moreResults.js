const moreResults = (modelName, ...populateFields) => async (req, res, next) => {
    let currentQuery;

    // Copy the req.query
    const reqQuery = {...req.query};
    console.log(reqQuery);
    // Fields To Exclude From Query
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(p => delete reqQuery[p]);

    // Create a query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    console.log(queryStr);

    // Find the resource from database
    currentQuery = modelName.find(JSON.parse(queryStr));


    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        currentQuery = currentQuery.select(fields);
    }

    // sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        currentQuery = currentQuery.sort(sortBy);
    } else {
        currentQuery = currentQuery.sort('title');
    }



    // pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limitPerPage = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limitPerPage;   // 0, 10, 20, 30 ....
    const endIndex = page * limitPerPage; // 10, 20, 30, 40 ....
    const total = await modelName.countDocuments(); // 30

    currentQuery = currentQuery.skip(startIndex).limit(limitPerPage);


    // populate
   if (populateFields) {
        populateFields.map(p => currentQuery = currentQuery.populate(p));
    }


    // Execute Query
    const result = await currentQuery;


    // Pagination Results
    const paginationResults = {};

    if (endIndex < total) {
        paginationResults.next = {
            page: page + 1,
            limit: limitPerPage
        };
    }

    if (startIndex > 0) {
        paginationResults.prev = {
            page: page - 1,
            limit: limitPerPage
        }
    }

    res.moreResults = {
        success: true,
        count: result.length,
        paginationResults,
        data: result
    };
    next();

};


module.exports = moreResults;
