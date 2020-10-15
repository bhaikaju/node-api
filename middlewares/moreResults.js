const moreResults = (modelName, ...populateFields) => async (req, res, next) => {
    let currentQuery;

    // Copy the req.query
    const reqQuery = {...req.query};

    // Fields To Exclude From Query
    const removeFields = ['select', 'sort', 'page', 'limit', 'price'];
     removeFields.forEach(p => delete reqQuery[p]);


    // Create a query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);


    // Find the resource from database
    currentQuery = modelName.find(JSON.parse(queryStr));

    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        currentQuery = currentQuery.select(fields);
    }





    const result = await currentQuery;

    res.moreResults = {
        success: true,
        count: result.length,
        message: 'Working',
        data: result
    };
    next();

};


module.exports = moreResults;
