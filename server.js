const express = require('express');
const app = express();
const contactRoute = require('./routes/contactRouter.js');
const port = 5432;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use('/add',contactRoute);

app.listen(port,() => {
    console.log(`Server Is Running On ${port}`);
});